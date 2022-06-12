import { lazy } from "react";

// lazy loading
const ComponentsPage = lazy(() => import("pages/components"));
const SettingsPage = lazy(() => import("pages/settings"));
const GeneralErrorPage = lazy(() => import("pages/generalError"));
const HomePage = lazy(() => import("pages/home"));
const OrdersPage = lazy(() => import("pages/orders"));
const CreateFormPage = lazy(() => import("pages/createForm"));
const CreateOrderPage = lazy(() => import("pages/createOrder"));
const ViewOrderPage = lazy(() => import("pages/viewOrder"));
const EditOrderPage = lazy(() => import("pages/editOrder"));
const InventoryPage = lazy(() => import("pages/inventory"));

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
  { title: "Home", component: <HomePage />, path: "/home" },
  { title: "Orders", component: <OrdersPage />, path: "/orders" },
  { title: "Create new form", component: <CreateFormPage />, path: "/form/create" },
  { title: "Create new order", component: <CreateOrderPage />, path: "/order/create" },
  { title: "View order", component: <ViewOrderPage />, path: "/order/view" },
  { title: "Edit order", component: <EditOrderPage />, path: "/order/edit" },
  { title: "Products", component: <InventoryPage />, path: "/products" },
];
