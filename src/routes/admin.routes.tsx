/* eslint-disable react-refresh/only-export-components */
import { Route } from 'react-router';
import AdminLayout from '@/layouts/admin/AdminLayout';
// import AdminProtected from "@/auth/AdminProtected";
import { ADMIN_ROUTES } from '@/constants/routes';

import UsersPage from '@/features/admin/users/pages/UsersPage';
import UserCreate from '@/features/admin/users/components/UserCreate';
import UserDetail from '@/features/admin/users/components/UserDetail';

// === Placeholder components ===
// const AdminLogin = () => <div>Admin Login</div>;
const Dashboard = () => <div>Admin Dashboard</div>;
const ManageProducts = () => <div>Admin Products</div>;
const Orders = () => <div>Admin Orders</div>;

export const adminRoutes = (
  <>
    {/* Protected admin layout */}
    <Route
      path={ADMIN_ROUTES.ROOT}
      element={
        // <AdminProtected>
        <AdminLayout />
        // </AdminProtected>
      }
    >
      <Route index element={<Dashboard />} />
      <Route path={ADMIN_ROUTES.PRODUCTS.replace('/admin/', '')} element={<ManageProducts />} />
      <Route path={ADMIN_ROUTES.USERS.replace('/admin/', '') + '/:id'} element={<UserDetail />} />
      <Route path={ADMIN_ROUTES.ORDERS.replace('/admin/', '')} element={<Orders />} />
      <Route path={ADMIN_ROUTES.USERS.replace('/admin/', '')} element={<UsersPage />} />
      <Route path={ADMIN_ROUTES.USERS_NEW.replace('/admin/', '')} element={<UserCreate />} />
    </Route>

    {/* Login outside layout */}
    {/* <Route path={ADMIN_ROUTES.LOGIN} element={<AdminLogin />} /> */}
  </>
);
