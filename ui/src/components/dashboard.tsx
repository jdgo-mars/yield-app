import { DashboardLayout } from "@/app/dashboard-layout";
import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => !!localStorage.getItem("accessToken");

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export const Dashboard = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="w-full">
          <Outlet />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};
