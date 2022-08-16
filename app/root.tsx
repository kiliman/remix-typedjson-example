import { useMemo } from 'react';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useMatches, type MetaFunction } from '~/remix';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Remix TypedJSON Example',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  const matchingRoutes = useMatches();

  const route = useMemo(() => matchingRoutes.find((route) => route.id === 'routes/test'), [matchingRoutes]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <p>useMatches Greeting: {route?.data?.greeting}</p>
        <p>useMatches Today: {route?.data?.today.toString()}</p>
        <p>useMatches Today's type: {Object.prototype.toString.call(route?.data?.today)}</p>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
