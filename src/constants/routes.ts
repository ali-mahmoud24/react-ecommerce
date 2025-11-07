// =====================
// Public Routes
// =====================
export const PUBLIC_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_RESET_CODE:'/verifyResetCode',
  RESET_PASSWORD:'/resetPassword'
} as const;

// =====================
// User Routes
// =====================
export const USER_ROUTES = {
  ROOT: '/',
  SHOP: '/shop',
  CART: '/cart',
  PROFILE: '/profile',
  PRODUCTS: "/products",
  PRODUCT: (id = ":id") => `/product/${id}`,
  CATEGORIES: "/categories",
  CATEGORY: (id: string = ":id") => `/categories/${id}`,
  BRANDS: "/brands",
  BRAND: (id: string = ":id") => `/brands/${id}`,
} as const;

// =====================
// Admin Routes
// =====================
export const ADMIN_ROUTES = {
  ROOT: '/admin',
  LOGIN: '/admin/login',
  DASHBOARD: '/admin',
  PRODUCTS: '/admin/products',
  ORDERS: '/admin/orders',
  USERS: '/admin/users',
  USERS_NEW: "/admin/users/new",
  UNAUTHORIZED: "/unauthorized",
  
} as const;
