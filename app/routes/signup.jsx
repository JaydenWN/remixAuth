import { Form } from "@remix-run/react";
import bcrypt from "bcryptjs";
import { db } from "../utils/db.server";

export async function action({ request }) {
  const formdata = await request.formData();

  const email = formdata.get("email");
  const username = formdata.get("username");
  const password = formdata.get("password");

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(email + username + hashedPassword);
  return null;
}

export default function Signup() {
  return (
    <>
      <h1>Sign Up: </h1>
      <Form method="POST">
        <label htmlFor="email">Email :</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="username">Username :</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="password">Password :</label>
        <input type="password" id="password" name="password" />

        <input type="submit" value="Sign Up" />
      </Form>
    </>
  );
}
