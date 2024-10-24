import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from "fastify";

export const verifySessionId = (
  req: FastifyRequest,
  res: FastifyReply,
  done: DoneFuncWithErrOrRes
) => {
  const sessionId = req.cookies.session_id;

  if (!sessionId) return res.status(401).send({ message: "Unauthorized" });

  done();
};
