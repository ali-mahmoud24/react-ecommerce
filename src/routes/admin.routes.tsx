import { Navigate, Route } from 'react-router';

import AdminLayout from '@/layouts/admin/AdminLayout';
import { ADMIN_ROUTES } from '@/constants/routes';

import AdminProtected from '@/auth/AdminProtected';

import UsersPage from '@/features/admin/users/pages/UsersPage';

import CategoriesPage from '@/features/admin/categories/pages/CategoriesPage';
import NewCategoryPage from '@/features/admin/categories/pages/NewCategoryPage';
import CategoryDetailsPage from '@/features/admin/categories/pages/CategoryDetailsPage';
import EditCategoryPage from '@/features/admin/categories/pages/EditCategoryPage';

import BrandsPage from '@/features/admin/brands/pages/BrandsPage';
import NewBrandPage from '@/features/admin/brands/pages/NewBrandPage';
import BrandDetailsPage from '@/features/admin/brands/pages/BrandDetailsPage';
import EditBrandPage from '@/features/admin/brands/pages/EditBrandPage';

import UserDetailsPage from '@/features/admin/users/pages/UserDetailsPage';
import NewUserPage from '@/features/admin/users/pages/NewUserPage';

import ProductsPage from '@/features/admin/products/pages/ProductsPage';
import NewProductPage from '@/features/admin/products/pages/NewProductPage';
import ProductDetailsPage from '@/features/admin/products/pages/ProductDetailsPage';
import EditProductPage from '@/features/admin/products/pages/EditProductPage';

export const adminRoutes = (
  <>
    {/* Protected admin layout */}
    <Route
      path={ADMIN_ROUTES.ROOT}
      element={
        <AdminProtected>
          <AdminLayout />
        </AdminProtected>
      }
    >
      <Route index element={<Navigate to={ADMIN_ROUTES.USERS.replace('/admin/', '')} replace />} />

      {/* PRODUCTS */}
      <Route path={ADMIN_ROUTES.PRODUCTS.replace('/admin/', '')} element={<ProductsPage />} />
      <Route path={ADMIN_ROUTES.PRODUCTS_NEW.replace('/admin/', '')} element={<NewProductPage />} />
      <Route
        path={ADMIN_ROUTES.PRODUCT().replace('/admin/', '')}
        element={<ProductDetailsPage />}
      />
      <Route
        path={ADMIN_ROUTES.PRODUCT_EDIT().replace('/admin/', '')}
        element={<EditProductPage />}
      />

      {/* PRODUCTS */}

      {/* USERS */}
      <Route path={ADMIN_ROUTES.USERS.replace('/admin/', '')} element={<UsersPage />} />
      <Route
        path={ADMIN_ROUTES.USERS.replace('/admin/', '') + '/:id'}
        element={<UserDetailsPage />}
      />
      <Route path={ADMIN_ROUTES.USERS_NEW.replace('/admin/', '')} element={<NewUserPage />} />
      {/* USERS */}

      {/* CATEGORIES */}
      <Route path={ADMIN_ROUTES.CATEGORIES.replace('/admin/', '')} element={<CategoriesPage />} />
      <Route
        path={ADMIN_ROUTES.CATEGORY_NEW.replace('/admin/', '')}
        element={<NewCategoryPage />}
      />
      <Route
        path={ADMIN_ROUTES.CATEGORY().replace('/admin/', '')}
        element={<CategoryDetailsPage />}
      />
      <Route
        path={ADMIN_ROUTES.CATEGORY_EDIT().replace('/admin/', '')}
        element={<EditCategoryPage />}
      />
      {/* CATEGORIES */}

      {/* BRANDS */}
      <Route path={ADMIN_ROUTES.BRANDS.replace('/admin/', '')} element={<BrandsPage />} />
      <Route path={ADMIN_ROUTES.BRAND_NEW.replace('/admin/', '')} element={<NewBrandPage />} />
      <Route path={ADMIN_ROUTES.BRAND().replace('/admin/', '')} element={<BrandDetailsPage />} />
      <Route path={ADMIN_ROUTES.BRAND_EDIT().replace('/admin/', '')} element={<EditBrandPage />} />
      {/* BRANDS */}
    </Route>
  </>
);
