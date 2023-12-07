import type { NextApiRequest, NextApiResponse } from "next";

/**
 * @description 临时方案
 */
export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const path = req.query.path as string;
    await res.revalidate(path);
    return res.json({
      revalidated: true,
      now: Date.now(),
      cache: "no-store",
    });
  } else {
    res.status(404).json(false);
  }
}
