import {
  RouterProvider,
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from "@tanstack/react-router";
import { lazy } from "react";
import Layout from "./components/Layout";

const RootRoute = createRootRoute({
  component: Layout,
});

const Dashboard = lazy(() => import("./routes/Dashboard"));
const Chat = lazy(() => import("./routes/Chat"));

const dashboardRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: Dashboard,
});

const chatRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/chat",
  component: Chat,
});

const routeTree = RootRoute.addChildren([dashboardRoute, chatRoute]);
const router = createRouter({ routeTree });

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
