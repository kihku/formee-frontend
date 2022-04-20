import { lazy } from "react";

// lazy loading
const ComponentsPage = lazy(() => import("pages/components"));
const SettingsPage = lazy(() => import("pages/settings"));
const GeneralErrorPage = lazy(() => import("pages/generalError"));

export interface RouteProps {
  title: string;
  component: any;
  path: string;
}

export const PRIVATE_ROUTES: RouteProps[] = [];

export const PUBLIC_ROUTES: RouteProps[] = [
  { title: "Components", component: <ComponentsPage />, path: "/components" },
  { title: "Settings", component: <SettingsPage />, path: "/settings" },
  { title: "404 Not Found", component: <GeneralErrorPage />, path: "/error" },
];