import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const examples = async (_request: NextApiRequest, result: NextApiResponse) => {
  const data = await prisma.example.findMany();
  result.status(200).json(data);
};

export default examples;
