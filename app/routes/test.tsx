import type { LoaderArgs } from "@remix-run/node";
import {
  redirect,
  typedjson,
  useTypedActionData,
  useTypedFetcher,
  useTypedLoaderData,
} from "remix-typedjson";

import { type ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { type ActionData as FetcherDataType } from "./resource";

export async function loader({ request }: LoaderArgs) {
  var url = new URL(request.url);
  if (url.searchParams.has("redirect")) {
    return redirect("/", { headers: { "set-cookie": "typedjson=true" } });
  }
  return typedjson(
    { greeting: "hello", today: new Date() },
    // headers work too! just like 'json' and is optional
    { headers: { "set-cookie": "headerswork=true" } }
  );
}

export const action = async ({ request }: ActionArgs) => {
  return typedjson([
    {
      greeting: "hello",
      date: new Date(),
      big: BigInt("1234567890123456789012345678901234567890"),
    },
    {
      greeting: "world",
      date: new Date(),
      big: BigInt("234567890234567890123456789012345678901"),
    },
  ]);
};

export default function Index() {
  const loaderData = useTypedLoaderData<typeof loader>();
  const actionData = useTypedActionData<typeof action>();
  const fetcher = useTypedFetcher<FetcherDataType>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Remix TypedJSON</h1>
      <p>
        <a href="https://github.com/kiliman/remix-typedjson-example">
          GitHub Example
        </a>
      </p>
      <p>
        <a href="https://github.com/kiliman/remix-typedjson">
          GitHub <code>remix-typed-json</code>
        </a>
      </p>
      <p>
        Open DevTools and click on the form buttons to see how{" "}
        <code>remix-typedjson</code> serializes the data. Note how objects and
        arrays are NOT double-JSON stringified.
      </p>

      <h2>Loader Data</h2>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
      <p>Today is {loaderData.today.toLocaleDateString()}</p>

      <h2>Action Data</h2>
      <Form method="post" replace>
        <button>Submit Form</button>
      </Form>
      {actionData &&
        actionData.map(({ greeting, date, big }, i) => (
          <p key={i}>
            {greeting} {date.toLocaleString()} {big.toString()}
          </p>
        ))}

      <h2>Fetcher Data</h2>
      <fetcher.Form method="post" action="/resource">
        <button>Submit Fetcher</button>
      </fetcher.Form>
      {fetcher.data &&
        [fetcher.data].map(({ greeting, nested: { date, big } }, i) => (
          <p key={i}>
            {greeting} {date.toLocaleString()} {big.toString()}
          </p>
        ))}
    </div>
  );
}
