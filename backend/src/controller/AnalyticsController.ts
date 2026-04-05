import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { PageView } from "../database/PageViewModel";

const pageViewRepo = AppDataSource.getRepository(PageView);

function parseUserAgent(ua: string): { browser: string; os: string; device: string } {
  let browser = "Other";
  if (ua.includes("Edg/") || ua.includes("Edge/")) browser = "Edge";
  else if (ua.includes("OPR/") || ua.includes("Opera/")) browser = "Opera";
  else if (ua.includes("Chrome/") && !ua.includes("Chromium/")) browser = "Chrome";
  else if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("Safari/") && !ua.includes("Chrome/")) browser = "Safari";

  let os = "Other";
  if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS X")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";

  let device = "desktop";
  if (/iPad|Tablet/i.test(ua)) device = "tablet";
  else if (/Mobile|Android|iPhone/i.test(ua)) device = "mobile";

  return { browser, os, device };
}

export const trackPageView = async (req: Request, res: Response) => {
  try {
    const { page, referrer, sessionId } = req.body;

    if (!page || !sessionId) {
      return res.status(400).json({ success: false, message: "page and sessionId are required" });
    }

    const userAgent = (req.headers["user-agent"] || "").substring(0, 512);
    const rawIp =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ||
      req.socket.remoteAddress ||
      "unknown";
    const ip = rawIp.substring(0, 64);
    const { browser, os, device } = parseUserAgent(userAgent);

    // Extract hostname from referrer for cleaner aggregation
    let cleanReferrer: string | undefined;
    if (referrer) {
      try {
        cleanReferrer = new URL(referrer).hostname;
      } catch {
        cleanReferrer = String(referrer).substring(0, 255);
      }
    }

    const view = pageViewRepo.create({
      page: String(page).substring(0, 255),
      referrer: cleanReferrer,
      userAgent,
      ip,
      sessionId: String(sessionId).substring(0, 64),
      browser,
      os,
      device,
    });

    await pageViewRepo.save(view);
    res.status(201).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAnalyticsSummary = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalViews,
      uniqueResult,
      todayViews,
      weekViews,
      monthViews,
      topPages,
      deviceBreakdown,
      browserBreakdown,
      osBreakdown,
      topReferrers,
      dailyViews,
      recentViews,
    ] = await Promise.all([
      // Total page views
      pageViewRepo.count(),

      // Unique sessions
      AppDataSource.query(
        `SELECT COUNT(DISTINCT "sessionId") as count FROM page_views`
      ),

      // Today's views
      pageViewRepo
        .createQueryBuilder("pv")
        .where("pv.createdAt >= :todayStart", { todayStart })
        .getCount(),

      // This week's views
      pageViewRepo
        .createQueryBuilder("pv")
        .where("pv.createdAt >= :weekStart", { weekStart })
        .getCount(),

      // This month's views
      pageViewRepo
        .createQueryBuilder("pv")
        .where("pv.createdAt >= :monthStart", { monthStart })
        .getCount(),

      // Top pages
      AppDataSource.query(
        `SELECT page, COUNT(*) as views FROM page_views GROUP BY page ORDER BY views DESC LIMIT 10`
      ),

      // Device breakdown
      AppDataSource.query(
        `SELECT device, COUNT(*) as count FROM page_views WHERE device IS NOT NULL GROUP BY device ORDER BY count DESC`
      ),

      // Browser breakdown
      AppDataSource.query(
        `SELECT browser, COUNT(*) as count FROM page_views WHERE browser IS NOT NULL GROUP BY browser ORDER BY count DESC`
      ),

      // OS breakdown
      AppDataSource.query(
        `SELECT os, COUNT(*) as count FROM page_views WHERE os IS NOT NULL GROUP BY os ORDER BY count DESC`
      ),

      // Top referrers
      AppDataSource.query(
        `SELECT referrer, COUNT(*) as count FROM page_views WHERE referrer IS NOT NULL AND referrer != '' GROUP BY referrer ORDER BY count DESC LIMIT 10`
      ),

      // Daily views last 30 days
      AppDataSource.query(
        `SELECT DATE("createdAt") as date, COUNT(*) as count FROM page_views WHERE "createdAt" >= $1 GROUP BY DATE("createdAt") ORDER BY date ASC`,
        [monthStart]
      ),

      // Recent page views
      pageViewRepo.find({ order: { createdAt: "DESC" }, take: 15 }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalViews,
        uniqueSessions: parseInt(uniqueResult[0]?.count || "0"),
        todayViews,
        weekViews,
        monthViews,
        topPages: topPages.map((p: any) => ({ page: p.page, views: parseInt(p.views) })),
        deviceBreakdown: deviceBreakdown.map((d: any) => ({ device: d.device, count: parseInt(d.count) })),
        browserBreakdown: browserBreakdown.map((b: any) => ({ browser: b.browser, count: parseInt(b.count) })),
        osBreakdown: osBreakdown.map((o: any) => ({ os: o.os, count: parseInt(o.count) })),
        topReferrers: topReferrers.map((r: any) => ({ referrer: r.referrer, count: parseInt(r.count) })),
        dailyViews: dailyViews.map((d: any) => ({
          date: typeof d.date === "string" ? d.date.split("T")[0] : new Date(d.date).toISOString().split("T")[0],
          count: parseInt(d.count),
        })),
        recentViews,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
