import { Form, useActionData } from "@remix-run/react";
import bcrypt from "bcryptjs";
import { db } from "../utils/db.server";
import validator from "validator";
import { redirect } from "@remix-run/node";
import { getSession, commitSession } from "../utils/session.server";
import styles from "../styles/signup.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function action({ request }) {
  const formdata = await request.formData();

  const email = formdata.get("email");
  const username = formdata.get("username");
  const password = formdata.get("password");

  const isUserCreated = await db.userAccount.findUnique({
    where: {
      email: email,
    },
  });

  if (
    validator.isEmail(email) &&
    validator.isStrongPassword(password) &&
    !isUserCreated
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await db.userAccount.create({
      data: {
        email: email,
        username: username,
        passwordHash: hashedPassword,
      },
    });

    console.log(
      `Created a user ${createdUser.username} with the email ${createdUser.email}`
    );
    // Logs in the newly created user
    const foundUser = await db.userAccount.findUnique({
      where: {
        email: email,
      },
    });

    const session = await getSession(request.headers.get("Cookie"));
    session.set("userId", foundUser.id);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else if (!validator.isEmail(email)) {
    return "Malformed email address try again.";
  } else if (!validator.isStrongPassword(password)) {
    return "Password must contain at least 8 characters long, contain 1 uppercase and lowercase letter, contain at least 1 digit and one special character (e.g., !, @, #, $, %, etc.)";
  } else if (isUserCreated) {
    return `Sorry someone has already signed up with the email: ${isUserCreated.email}`;
  } else return "Try again";
}

export default function Signup() {
  const actionData = useActionData();

  return (
    <div className="pageContent">
      <h2>Sign Up </h2>
      <Form method="POST">
        <label htmlFor="email">Email </label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="username">Username </label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Password </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength="8"
        />

        <input type="submit" value="Sign Up" />
        <p>{actionData ? actionData : ""}</p>
      </Form>
    </div>
  );
}
