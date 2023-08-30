import { redirect } from "@remix-run/node";
import { destroySession, getSession } from "../utils/session.server";

export async function action({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export async function loader({ request }) {
  return null;
}
