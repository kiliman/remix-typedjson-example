import { type ActionArgs } from "@remix-run/node";
import { typedjson } from "remix-typedjson";
export type ActionData = typeof action;

export const action = async ({ request }: ActionArgs) => {
  return typedjson({
    greeting: "hello from resource route",
    nested: {
      date: new Date(),
      big: BigInt("34567890123456789012345678901234567890"),
    },
  });
};
