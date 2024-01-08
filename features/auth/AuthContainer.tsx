import { useRouter } from "next/router";
import { AuthInfo } from "../../pages/_app";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Loading from "@/components/units/Loading";

interface Props {
  children: any;
  authInfo: AuthInfo;
}

const AuthContainer = ({ children, authInfo }: Props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  const accessToken = session?.accessToken;

  const redirect = authInfo?.redirect || "/";
  const loading = authInfo?.loading || <Loading />;

  useEffect(() => {
    if (status === "loading") return;

    if (!isUser) {
      router.replace("/login");
    }
  }, [isUser, status]);

  if (isUser && accessToken) {
    return <>{children}</>;
  }

  return loading;
};

export default AuthContainer;
