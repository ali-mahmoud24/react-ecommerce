/* eslint-disable react-refresh/only-export-components */
import { Navigate, Route } from 'react-router';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { ADMIN_ROUTES } from '@/constants/routes';

import UsersPage from '@/features/admin/users/pages/UsersPage';
import UserCreate from '@/features/admin/users/components/UserCreate';
import UserDetail from '@/features/admin/users/components/UserDetail';
import AdminOnly from '@/features/admin/users/pages/adminOnly';
import AdminProtected from '@/auth/AdminProtected';
import ProductsPage from '@/features/admin/products/pages/ProductsPage';
import ProductDetail from '@/features/admin/products/components/ProductDetail';
import ProductForm from '@/features/admin/products/components/ProductForm';
import ProductEdit from '@/features/admin/products/components/ProductEdit';

// === Placeholder components ===
const Orders = () => <div>Admin Orders</div>;

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
      <Route
        path={ADMIN_ROUTES.PRODUCTS.replace('/admin/', '')}
        element={
          <AdminProtected>
            <ProductsPage />
          </AdminProtected>
        }
      />
      <Route
        path={ADMIN_ROUTES.USERS.replace('/admin/', '') + '/:id'}
        element={
          <AdminProtected>
            <UserDetail />
          </AdminProtected>
        }
      />
      <Route
        path={ADMIN_ROUTES.ORDERS.replace('/admin/', '')}
        element={
          <AdminProtected>
            <Orders />
          </AdminProtected>
        }
      />
      <Route
        path={ADMIN_ROUTES.USERS.replace('/admin/', '')}
        element={
          <AdminProtected>
            <UsersPage />
          </AdminProtected>
        }
      />
      <Route
        path={ADMIN_ROUTES.USERS_NEW.replace('/admin/', '')}
        element={
          <AdminProtected>
            <UserCreate />
          </AdminProtected>
        }
      />
      <Route
        path={ADMIN_ROUTES.PRODUCTS.replace('/admin/', '')}
        element={
          <AdminProtected>
            <ProductsPage />
          </AdminProtected>
        }
      />
      <Route
        path={ADMIN_ROUTES.PRODUCTS.replace('/admin/', '') + '/:id'}
        element={
          <AdminProtected>
            <ProductDetail />
          </AdminProtected>
        }
      />
      <Route
        path={ADMIN_ROUTES.PRODUCTS.replace('/admin/', '') + '/:id/edit'}
        element={
          <AdminProtected>
            <ProductEdit  />
          </AdminProtected>
        }
      />
      <Route
        path={ADMIN_ROUTES.PRODUCTS_NEW.replace('/admin/', '')}
        element={
          <AdminProtected>
            <ProductForm />
          </AdminProtected>
        }
      />
    </Route>
    <Route path={ADMIN_ROUTES.UNAUTHORIZED.replace('/', '')} element={<AdminOnly />} />

    {/* Login outside layout */}
    {/* <Route path={ADMIN_ROUTES.LOGIN} element={<AdminLogin />} /> */}
  </>
);
