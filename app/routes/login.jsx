import { Form } from "@remix-run/react";

export function action({ request }) {
  const formdata = await request.formData();
  const email = formdata.get("email");
  const password = formdata.get("password");


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
