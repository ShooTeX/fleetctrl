import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import mbxDirections from "@mapbox/mapbox-sdk/services/directions";

import { prisma } from "../db/client";
import { env as environment } from "../../env/server.mjs";

const mbx = mbxDirections({ accessToken: environment.MAPBOX_TOKEN });

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = Record<string, never>;

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://beta.create.t3.gg/en/usage/trpc#-servertrpccontextts
 * */
export const createContextInner = async (_options: CreateContextOptions) => {
  return {
    prisma,
    mbx,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 * */
export const createContext = async (_options: CreateNextContextOptions) => {
  return createContextInner({});
};

export type Context = inferAsyncReturnType<typeof createContext>;
