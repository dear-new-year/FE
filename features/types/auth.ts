export interface KakaoSignInResponse {
  data: {
    aceessToken: string;
    refreshToken: string;
    isExistedUser: boolean;
  };
}
