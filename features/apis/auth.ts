import { KakaoSignInResponse } from "@/types/auth";
import { AxiosResponse } from "axios";
import { dearNewYearAxios, localAxios } from "./axios";

export const kakaoSignIn = async (
  accessToken: string
): Promise<KakaoSignInResponse | undefined> => {
  try {
    const response: AxiosResponse<KakaoSignInResponse> =
      await dearNewYearAxios.post(
        "/auth/login",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
