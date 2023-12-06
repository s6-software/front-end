import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const AuthOptions = {
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
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        const res = await fetch(
          "https://jsonplaceholder.typicode.com/todos/1",
          {
            method: "GET",
            // body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );

        let user = await res.json();
        user = {
          id: 1,
          name: "J Smith",
          email: "jsmith@example.com",
        };
        // If no error and we have user data, return it
        if (user) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
};

export const handler = NextAuth(AuthOptions);

export { handler as POST };
