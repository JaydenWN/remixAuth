import { createCookieSessionStorage } from "@remix-run/node";

const {getSession,  commitSession,  destroySession } = createCookieSessionStorage({
    cookie:{
        name: 'authSession',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, //Seconds, Minutes, Hours, Days. (Will stay logged in for 7 days)
        secrets: [process.env.AUTH_SESSION_SECRET]
    }
})

export {getSession, commitSession, destroySession}