import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRoutes from "@/app-routes";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AppRoutes />
      </GoogleOAuthProvider>
      <Toaster richColors />
    </ThemeProvider>
  );
};
