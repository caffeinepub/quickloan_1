import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { ApplyPage } from "./pages/ApplyPage";
import { HomePage } from "./pages/HomePage";

const queryClient = new QueryClient();

function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster richColors />
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster richColors />
    </>
  );
}

const rootRoute = createRootRoute();

const publicLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: RootLayout,
});

const adminLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin-layout",
  component: AdminLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/",
  component: HomePage,
});

const applyRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/apply",
  component: ApplyPage,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin",
  component: AdminLoginPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin/dashboard",
  component: AdminDashboardPage,
});

const routeTree = rootRoute.addChildren([
  publicLayout.addChildren([homeRoute, applyRoute]),
  adminLayout.addChildren([adminLoginRoute, adminDashboardRoute]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
