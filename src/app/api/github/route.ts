import { NextResponse } from "next/server";
import { fetchGitHubStats } from "../../_lib/github";

export const revalidate = 3600; // ISR: revalidate every hour

export async function GET() {
  try {
    const stats = await fetchGitHubStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("GitHub API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 },
    );
  }
}
