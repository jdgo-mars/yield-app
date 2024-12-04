import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "./ui/button";

export const LoginButton = () => {
  const handleLogin = useGoogleLogin({
    scope: "email profile",
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      try {
        localStorage.setItem("accessToken", tokenResponse.access_token);
        localStorage.setItem(
          "tokenExpiresIn",
          String(tokenResponse.expires_in)
        );
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    onError: () => console.error("Login failed"),
  });

  return <Button onClick={() => handleLogin()}>Login</Button>;
};
