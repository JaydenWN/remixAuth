import { cssBundleHref } from "@remix-run/css-bundle";
import styles from "./styles/root.css";

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
  ...(cssBundleHref
    ? [{ rel: "stylesheet", href: cssBundleHref }]
    : [
        { rel: "stylesheet", href: styles },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "true",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;600&display=swap",
          rel: "stylesheet",
        },
      ]),
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
          <a href="/">
            <h1>User Auth Project</h1>
          </a>
          <div className="userInfo">
            {userData ? (
              <>
                <p>{userData.username}</p>
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
          </div>
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
