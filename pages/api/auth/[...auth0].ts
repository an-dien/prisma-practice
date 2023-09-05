import {
  Session,
  handleAuth,
  handleCallback,
} from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "../../../lib/prisma";

export default handleAuth({
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error: any) {
      res.status(error.status || 500).end(error.message);
    }
  },
});

async function afterCallback(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
  state?: { [key: string]: any }
): Promise<Session | undefined> {
  const user = session.user;
  if (user) {
    // const role = await prisma.role.findFirstOrThrow({
    //   where: { code: "USER" },
    // });
    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      create: {
        email: user.email,
        role: 'USER',
        image: user.picture,
      },
      update: {
        image: user.picture,
      },
    });
  }
  return session;
}