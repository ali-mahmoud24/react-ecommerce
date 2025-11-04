/* eslint-disable react-refresh/only-export-components */
import { Route } from 'react-router';
import UserLayout from '@/layouts/user/UserLayout';
import UserProtected from '@/auth/UserProtected';
import { USER_ROUTES, PUBLIC_ROUTES } from '@/constants/routes';
import Home from '@/features/user/home/pages/Home';

import Home from '@/features/user/home/pages/Home';
import Products from '@/features/user/products/pages/Products';
import ProductDetailsPage from '@/features/user/products/pages/ProductDetailsPage';

// === Placeholder components (replace later) ===
const Cart = () => <div>Cart</div>;
const Profile = () => <div>User Profile</div>;
const Login = () => <div>User Login</div>;
const Register = () => <div>User Register</div>;

export const userRoutes = (
  <>
    {/* User layout routes */}
    <Route path={USER_ROUTES.ROOT} element={<UserLayout />}>
      <Route index element={<Home />} />
      <Route path={USER_ROUTES.PRODUCTS.replace('/', '')} element={<Products />} />
      <Route path={USER_ROUTES.PRODUCT()} element={<ProductDetailsPage />} />

      <Route
        path={USER_ROUTES.CART.replace('/', '')}
        element={
          <UserProtected>
            <Cart />
          </UserProtected>
        }
      />

      <Route
        path={USER_ROUTES.PROFILE.replace('/', '')}
        element={
          <UserProtected>
            <Profile />
          </UserProtected>
        }
      />
    </Route>

    {/* Auth pages without layout */}
    <Route path={PUBLIC_ROUTES.LOGIN.replace('/', '')} element={<Login />} />
    <Route path={PUBLIC_ROUTES.REGISTER.replace('/', '')} element={<Register />} />
  </>
);
