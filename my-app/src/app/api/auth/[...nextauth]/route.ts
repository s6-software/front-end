import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials, req) {
        try {
          console.log(process.env.USERSERVICE_URL + "/api/User/login");
          const res = await fetch(process.env.USERSERVICE_URL + "/api/User/Login", {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });
          const user = await res.json();
          console.log(user);
          if (res.ok && user) {
            return user;
          }
          return null;
        } catch (error) {
          console.error("Error occurred during fetch:", error);
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
