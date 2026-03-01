// Server-side GitHub data fetching utilities

const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const GITHUB_REST = "https://api.github.com";

export interface GitHubStats {
  totalContributions: number;
  yearlyContributions: { year: number; total: number }[];
  monthlyActivity: { month: string; commits: number }[];
  yearlyMonthlyActivity: Record<number, { month: string; commits: number }[]>;
  publicRepos: number;
  totalStars: number;
  followers: number;
}

/* ─── GraphQL: Contribution Data ─── */

const CONTRIBUTIONS_QUERY = `
query($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}`;

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface GraphQLContributionsResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: ContributionDay[];
          }[];
        };
      };
    };
  };
}

async function fetchContributions(
  username: string,
  token: string,
  from: string,
  to: string,
): Promise<{ total: number; days: ContributionDay[] }> {
  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { username, from, to },
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error("GitHub GraphQL error:", res.status, await res.text());
    return { total: 0, days: [] };
  }

  const json: GraphQLContributionsResponse = await res.json();
  const calendar =
    json.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) return { total: 0, days: [] };

  const days = calendar.weeks.flatMap((w) => w.contributionDays);
  return { total: calendar.totalContributions, days };
}

/* ─── REST: Repos, Stars, Followers ─── */

interface GitHubUser {
  public_repos: number;
  followers: number;
}

interface GitHubRepo {
  stargazers_count: number;
  fork: boolean;
}

async function fetchUserProfile(username: string): Promise<GitHubUser | null> {
  const res = await fetch(`${GITHUB_REST}/users/${username}`, {
    headers: { Accept: "application/vnd.github.v3+json" },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}

async function fetchTotalStars(username: string): Promise<number> {
  let page = 1;
  let total = 0;

  while (true) {
    const res = await fetch(
      `${GITHUB_REST}/users/${username}/repos?per_page=100&page=${page}&type=owner`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) break;

    const repos: GitHubRepo[] = await res.json();
    if (repos.length === 0) break;

    total += repos
      .filter((r) => !r.fork)
      .reduce((sum, r) => sum + r.stargazers_count, 0);

    if (repos.length < 100) break;
    page++;
  }

  return total;
}

/* ─── Aggregate Monthly Data ─── */

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function aggregateMonthly(
  days: ContributionDay[],
): { month: string; commits: number }[] {
  const buckets: Record<string, number> = {};

  for (const day of days) {
    const d = new Date(day.date);
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
    buckets[key] = (buckets[key] || 0) + day.contributionCount;
  }

  // Sort by key (chronological) and take last 12 months
  const sorted = Object.entries(buckets)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12);

  return sorted.map(([key, commits]) => {
    const monthIndex = parseInt(key.split("-")[1], 10);
    return { month: MONTH_NAMES[monthIndex], commits };
  });
}

/* ─── Main Fetch ─── */

const YEARS_TO_FETCH = 5;

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const username =
    process.env.NEXT_PUBLIC_GITHUB_USERNAME || "sahedulislamrony";
  const token = process.env.GITHUB_TOKEN || "";

  const now = new Date();
  const currentYear = now.getFullYear();

  // Build year ranges for the last 5 years
  const yearRanges = Array.from({ length: YEARS_TO_FETCH }, (_, i) => {
    const year = currentYear - i;
    const from = `${year}-01-01T00:00:00Z`;
    const to =
      year === currentYear ? now.toISOString() : `${year}-12-31T23:59:59Z`;
    return { year, from, to };
  });

  // Parallel fetch: all years + profile + stars
  const [profile, stars, ...yearResults] = await Promise.all([
    fetchUserProfile(username),
    fetchTotalStars(username),
    ...yearRanges.map((yr) =>
      token
        ? fetchContributions(username, token, yr.from, yr.to)
        : Promise.resolve({ total: 0, days: [] as ContributionDay[] }),
    ),
  ]);

  // Build yearly contributions (oldest → newest)
  const yearlyContributions = yearRanges
    .map((yr, i) => ({ year: yr.year, total: yearResults[i].total }))
    .filter((y) => y.total > 0)
    .reverse();

  const totalContributions = yearResults.reduce((sum, yr) => sum + yr.total, 0);

  // Combine all days for monthly activity (last 12 months)
  const allDays = yearResults.flatMap((yr) => yr.days);
  const twelveMonthsAgo = new Date(now);
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const recentDays = allDays.filter((d) => new Date(d.date) >= twelveMonthsAgo);
  const monthlyActivity = aggregateMonthly(recentDays);

  // Per-year monthly breakdown
  const yearlyMonthlyActivity: Record<
    number,
    { month: string; commits: number }[]
  > = {};
  for (let i = 0; i < yearRanges.length; i++) {
    const yr = yearRanges[i];
    yearlyMonthlyActivity[yr.year] = aggregateMonthly(yearResults[i].days);
  }

  return {
    totalContributions,
    yearlyContributions,
    monthlyActivity,
    yearlyMonthlyActivity,
    publicRepos: profile?.public_repos ?? 0,
    totalStars: stars,
    followers: profile?.followers ?? 0,
  };
}
