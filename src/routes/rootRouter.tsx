export interface RouteProps {
  name: string;
  interface: any;
  path: string;
  key: string;
}

export const PRIVATE_ROUTES: RouteProps[] = [];
export const PUBLIC_ROUTES: RouteProps[] = [];
