import { Link } from '~/remix';

export default function () {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Remix TypedJSON</h1>
      <p>
        <a href="https://github.com/kiliman/remix-typedjson-example">GitHub Example</a>
      </p>
      <p>
        <a href="https://github.com/kiliman/remix-typedjson">
          GitHub <code>remix-typed-json</code>
        </a>
      </p>
      <p>
        Open DevTools and click on the Test link belows to see how <code>remix-typedjson</code> serializes the data.
        Note how objects and arrays are NOT double-JSON stringified.
      </p>
      <Link to="/test">Test remix-typed-json</Link>
    </div>
  );
}
