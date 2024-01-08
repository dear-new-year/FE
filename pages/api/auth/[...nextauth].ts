import axios from "axios";
import { NextAuthOptions, User, Account, Profile } from "next-auth";

import NextAuth from "next-auth/next";
import { Provider } from "next-auth/providers/index";

import KakaoProvider from "next-auth/providers/kakao";

const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account) {
        token.accessToken = account.access_token;
        if (account.provider === "kakao") {
          token.provider = "kakao";
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.provider = token.provider;

      return session;
    },
  },
};

export default (req: any, res: any) => NextAuth(req, res, authOptions);

// const oAuthProviders: Provider[] = [
//   KakaoProvider({
//     clientId:process.env.KAKAO_CLIENT_ID!,
//     clientSecret: process.env.KAKAO_CLIENT_SECRET!,

//     profile(profile) {
//       return {
//         id: profile.id.toString(),
//         email: profile.kakao_account.email,
//         accessToken: profile.access_Token,
//       };
//     },
//   }),
// ];

// const nextAuthOptions: NextAuthOptions = {
//   providers: [...oAuthProviders],

//   callbacks: {
//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.accessToken = token.accessToken;
//       console.log(session);
//       console.log("세션-액세스토큰", session.accessToken);
//       return session;
//     },
//     async jwt({ token, user, account }) {
//       if (user) {
//         token.id = user.id;
//         token.accessToken = account?.access_token;
//         console.log("토큰-액세스토큰", token.accessToken);
//       }
//       return token;
//     },
//   },
// };
//   callbacks: {
//     async jwt({ token, account, user }) {
//       if (account) {
//         return {
//           accessToken: account.access_Token,
//           accessTokenExpires: account.expires_at,
//           refreshToken: account.refreshToken,
//           user,
//         };
//       }

//       const nowTime = Math.round(Date.now() / 1000);
//       const shouldRefreshTime =
//         (token.accessTokenExpires as number) - 10 * 60 - nowTime;
//       // 토큰이 만료되지 않았을때는 원래사용하던 토큰을 반환
//       if (shouldRefreshTime > 0) {
//         return token;
//       }
//       return refreshAccessToken(token);
//     },

//     async session({ session, token }) {
//       session.user = token.user as User;
//       session.accessToken = token.accessToken;
//       session.accessTokenExpires = token.accessTokenExpires;
//       session.error = token.error;
//       return session;
//     },
//   },
// };

// // AccessToken이 만료되면 refreshToken을 사용해서 다시 받아오는 함수
// async function refreshAccessToken(token: JWT) {
//   try {
//     const url = "https://kauth.kakao.com/oauth/token";

//     const params = {
//       grant_type: "refresh_token",
//       refresh_token: token.refreshToken,
//     };

//     const headers = {
//       "Content-Type": "application/x-www-form-urlencoded",
//     };

//     const res = await axios.post(url, null, {
//       headers,
//       params,
//       auth: {
//         username: process.env.CLIENT_ID as string,
//         password: process.env.CLIENT_SECRET as string,
//       },
//     });

//     const refreshedTokens = await res.data;

//     if (res.status !== 200) {
//       throw refreshedTokens;
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.access_token,
//       accessTokenExpires:
//         Math.round(Date.now() / 1000) + refreshedTokens.expires_in,
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
//     };
//   } catch (err) {
//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }
