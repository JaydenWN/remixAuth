import { Form } from "@remix-run/react";

export default function Signup() {
  return (
    <>
      <h1>Sign Up: </h1>
      <Form>
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
