import { Form } from "@remix-run/react";

export default function Login() {
  return (
    <>
      <h1>Login</h1>
      <Form>
        <label htmlFor="username">Username :</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="password">Password :</label>
        <input type="password" id="password" name="password" />

        <input type="submit" value="Login" />
      </Form>
    </>
  );
}
