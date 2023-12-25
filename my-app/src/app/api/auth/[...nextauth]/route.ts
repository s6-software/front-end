import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
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
          const res = await fetch(process.env.NEXT_PUBLIC_USERSERVICE_URL + "/api/User/Login", {
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

export {handler as POST, handler as GET };
