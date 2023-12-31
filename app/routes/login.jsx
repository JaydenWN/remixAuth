import { Form, useActionData } from "@remix-run/react";
import { db } from "../utils/db.server";
import bcrypt from "bcryptjs";
import { redirect } from "@remix-run/node";
import { getSession, commitSession } from "../utils/session.server";
import styles from "../styles/login.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function action({ request }) {
  const formdata = await request.formData();
  const email = formdata.get("email");
  const password = formdata.get("password");

  const session = await getSession(request.headers.get("Cookie"));

  const foundUser = await db.userAccount.findUnique({
    where: {
      email: email,
    },
  });
  let isCorrectPassword = false;

  if (foundUser) {
    isCorrectPassword = bcrypt.compareSync(password, foundUser.passwordHash);
  }

  if (foundUser && isCorrectPassword) {
    console.log(`Logged in as : ${foundUser.username}`);
    session.set("userId", foundUser.id);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else if (!foundUser || !isCorrectPassword) {
    const signInError = "Incorrect email or password please try again.";
    return signInError;
  }

  return null;
}

export default function Login() {
  const actionData = useActionData();

  return (
    <div className="pageContent">
      <h2>Please enter your details</h2>
      <Form method="POST">
        <label htmlFor="email">Email </label>
        <input type="text" id="email" name="email" />

        <label htmlFor="password">Password </label>
        <input type="password" id="password" name="password" />

        <input type="submit" value="Login" />
        <p>{actionData ? actionData : ""}</p>
      </Form>
    </div>
  );
}
