import { cssBundleHref } from "@remix-run/css-bundle";

import {
  Form,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { getSession } from "./utils/session.server";
import { db } from "./utils/db.server";

export const links = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (userId) {
    const user = await db.userAccount.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  return null;
}

export default function App() {
  const userData = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav>
          <h1>User Auth Project</h1>
          {userData ? (
            <>
              <p>Currently signed in as : {userData.username} </p>
              <Form action="/logout" method="POST">
                <input type="submit" value="Logout" />
              </Form>
            </>
          ) : (
            <>
              <a href="/login">
                <button>Login</button>
              </a>
              <a href="/signup">
                <button>Sign up</button>
              </a>
            </>
          )}
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
