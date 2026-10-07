import { NextResponse } from "next/server";

export const revalidate = 1800; // 30 minutes ISR cache

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  created_at: string;
  payload?: {
    commits?: { message: string; sha: string }[];
    ref?: string;
  };
}

export async function GET() {
  const fallbackEvents = [
    {
      id: "fallback-1",
      repo: "Reyonl/portofolio-v2",
      type: "PushEvent",
      message: "feat: add command palette, dual CV selector and architecture diagrams",
      createdAt: new Date().toISOString(),
    },
    {
      id: "fallback-2",
      repo: "Reyonl/threads-it-carousel",
      type: "PushEvent",
      message: "refactor: optimize layout components and automated pipeline",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "fallback-3",
      repo: "Reyonl/rekapan_bukunota",
      type: "PushEvent",
      message: "perf: optimize daily bon ledger query and cigarette sales filter",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
  ];

  try {
    const res = await fetch("https://api.github.com/users/Reyonl/events/public?per_page=6", {
      headers: {
        "User-Agent": "Portfolio-App",
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      return NextResponse.json({
        success: true,
        isFallback: true,
        username: "Reyonl",
        publicRepos: 45,
        events: fallbackEvents,
      });
    }

    const data: GitHubEvent[] = await res.json();
    const pushEvents = data
      .filter((e) => e.type === "PushEvent")
      .slice(0, 4)
      .map((e) => {
        const commitMsg =
          e.payload?.commits?.[0]?.message ?? `Pushed to ${e.payload?.ref?.replace("refs/heads/", "") || "main"}`;
        return {
          id: e.id,
          repo: e.repo.name,
          type: e.type,
          message: commitMsg.split("\n")[0],
          createdAt: e.created_at,
        };
      });

    return NextResponse.json({
      success: true,
      isFallback: false,
      username: "Reyonl",
      publicRepos: 45,
      events: pushEvents.length > 0 ? pushEvents : fallbackEvents,
    });
  } catch {
    return NextResponse.json({
      success: true,
      isFallback: true,
      username: "Reyonl",
      publicRepos: 45,
      events: fallbackEvents,
    });
  }
}
