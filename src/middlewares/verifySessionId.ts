import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from "fastify";

export const verifySessionId = (
  req: FastifyRequest,
  res: FastifyReply,
  done: DoneFuncWithErrOrRes
) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) return res.status(401).send({ message: "Unauthorized" });

  done();
};
