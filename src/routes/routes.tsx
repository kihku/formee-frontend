import { lazy } from "react";

// lazy loading
const SettingsPage = lazy(() => import("pages/settings"));
const GeneralErrorPage = lazy(() => import("pages/generalError"));
const HomePage = lazy(() => import("pages/home"));
const OrdersPage = lazy(() => import("pages/orders"));
const CreateOrderPage = lazy(() => import("pages/createOrder"));
const EditOrderPage = lazy(() => import("pages/editOrder"));
const InventoryPage = lazy(() => import("pages/inventory"));
const StatisticsPage = lazy(() => import("pages/statistics"));

export interface RouteProps {
  title: string;
  component: any;
  path: string;
}

export const PRIVATE_ROUTES: RouteProps[] = [];

export const PUBLIC_ROUTES: RouteProps[] = [
  { title: "Settings", component: <SettingsPage />, path: "/settings" },
  { title: "404 Not Found", component: <GeneralErrorPage />, path: "/error" },
  { title: "Home", component: <HomePage />, path: "/home" },
  { title: "Orders", component: <OrdersPage />, path: "/orders" },
  { title: "Create new order", component: <CreateOrderPage />, path: "/order/create" },
  { title: "Edit order", component: <EditOrderPage fromRequest={false} />, path: "/order/edit" },
  { title: "Edit order request", component: <EditOrderPage fromRequest={true} />, path: "/order/request" },
  { title: "Products", component: <InventoryPage />, path: "/products" },
  { title: "Report", component: <StatisticsPage />, path: "/report" },
];
