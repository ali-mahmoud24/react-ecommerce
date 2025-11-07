// =====================
// Public Routes
// =====================
export const PUBLIC_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_RESET_CODE: '/verifyResetCode',
  RESET_PASSWORD: '/resetPassword',
} as const;

// =====================
// User Routes
// =====================
export const USER_ROUTES = {
  ROOT: '/',
  // SHOP: '/shop',
  CART: '/cart',
  PROFILE: '/profile',
  PRODUCTS: '/products',
  PRODUCT: (id = ':id') => `/product/${id}`,
  CATEGORIES: '/categories',
  CATEGORY: (id: string = ':id') => `/categories/${id}`,
  BRANDS: '/brands',
  BRAND: (id: string = ':id') => `/brands/${id}`,
  // CART: "/cart",
  WISHLIST: '/wishlist',
  // PROFILE: "/profile",
} as const;

// =====================
// Admin Routes
// =====================
export const ADMIN_ROUTES = {
  ROOT: '/admin',
  PRODUCTS: '/admin/products',
  PRODUCTS_NEW: '/admin/products/new',

  CATEGORIES: '/admin/categories',
  CATEGORY_NEW: '/admin/categories/new',
  CATEGORY: (id: string = ':id') => `admin/categories/${id}`,
  CATEGORY_EDIT: (id: string = ':id') => `admin/categories/${id}/edit`,

  BRANDS: '/admin/brands',
  BRAND_NEW: '/admin/brands/new',
  BRAND: (id: string = ':id') => `/admin/brands/${id}`,
  BRAND_EDIT: (id: string = ':id') => `/admin/brands/${id}/edit`,

  ORDERS: '/admin/orders',
  USERS: '/admin/users',
  USERS_NEW: '/admin/users/new',
  UNAUTHORIZED: '/unauthorized',
} as const;
