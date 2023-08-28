import { Form } from "@remix-run/react";

export async function action({ request }) {
  const formdata = await request.formData();

  const email = formdata.get("email");
  const username = formdata.get("username");
  const password = formdata.get("password");

  console.log(email + username + password);
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
