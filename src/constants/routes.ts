// =====================
// Public Routes
// =====================
export const PUBLIC_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
} as const;

// =====================
// User Routes
// =====================
export const USER_ROUTES = {
  ROOT: '/',
  PRODUCTS: '/products',
  PRODUCT: (id = ':id') => `/product/${id}`,
  CART: '/cart',
  PROFILE: '/profile',
} as const;

// =====================
// Admin Routes
// =====================
export const ADMIN_ROUTES = {
  ROOT: '/admin',

  CATEGORIES: '/admin/categories',
  CATEGORY_NEW: '/admin/categories/new',
  CATEGORY: (id = ':id') => `/admin/categories/${id}`,
  CATEGORY_EDIT: (id = ':id') => `/admin/categories/${id}/edit`,


  BRANDS: '/admin/brands',
  BRAND_NEW: '/admin/brands/new',
  BRAND: (id = ':id') => `/admin/brands/${id}`,
  BRAND_EDIT: (id = ':id') => `/admin/brands/${id}/edit`,

  PRODUCTS: '/admin/products',
  ORDERS: '/admin/orders',
  USERS: '/admin/users',
  USERS_NEW: '/admin/users/new',
} as const;
