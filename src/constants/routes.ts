// =====================
// Public Routes
// =====================
export const PUBLIC_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
} as const;

// =====================
// User Routes
// =====================
export const USER_ROUTES = {
  ROOT: "/",
  PRODUCTS: "/products",
  PRODUCT: (id = ":id") => `/product/${id}`,
  CART: "/cart",
  PROFILE: "/profile",
} as const;

// =====================
// Admin Routes
// =====================
export const ADMIN_ROUTES = {
  ROOT: "/admin",
  LOGIN: "/admin/login",
  DASHBOARD: "/admin",
  PRODUCTS: "/admin/products",
  ORDERS: "/admin/orders",
  USERS: "/admin/users",
  USERS_NEW: "/admin/users/new",
} as const;
