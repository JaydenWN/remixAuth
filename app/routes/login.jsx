import { Form } from "@remix-run/react";
import { db } from "../utils/db.server";
import bcrypt from "bcryptjs";
import { redirect } from "@remix-run/node";
import { getSession, commitSession } from "../utils/session.server";

export async function loader({ request }) {
  // const session = await getSession(
  //     request.headers.get('Cookie')
  // )

  return null;
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

  isCorrectPassword = bcrypt.compareSync(password, foundUser.passwordHash);

  if (foundUser && isCorrectPassword) {
    console.log(`Logged in as : ${foundUser.username}`);
    session.set("userId", foundUser.id);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return null;
}

export default function Login() {
  return (
    <>
      <h1>Login</h1>
      <Form method="POST">
        <label htmlFor="email">Email :</label>
        <input type="text" id="email" name="email" />

        <label htmlFor="password">Password :</label>
        <input type="password" id="password" name="password" />

        <input type="submit" value="Login" />
      </Form>
    </>
  );
}
