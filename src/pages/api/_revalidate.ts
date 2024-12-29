import type { NextApiRequest, NextApiResponse } from "next";

/**
 * @description 临时方案
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "PUT": {
      const key = req.query.key as string;
      if (key !== process.env.SECRET) {
        return res.status(401).json(false);
      }
      const path = req.query.path as string;
      await res.revalidate(path);
      return res.json({
        revalidated: true,
        now: Date.now(),
        cache: "no-store",
      });
    }
    default: {
      return res.status(404).json(false);
    }
  }
}
