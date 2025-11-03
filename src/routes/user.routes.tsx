/* eslint-disable react-refresh/only-export-components */
import { Route } from 'react-router';
import UserLayout from '@/layouts/user/UserLayout';
import UserProtected from '@/auth/UserProtected';
import { USER_ROUTES, PUBLIC_ROUTES } from '@/constants/routes';
import Home from '@/features/user/home/pages/Home';
import Login from '@/features/user/auth/pages/Login';
import Register from '@/features/user/auth/pages/Register';
import ForgotPassword from '@/features/user/auth/pages/ForgotPassword';
import ProfileDashboard from '@/features/user/profile/pages/ProfileDashboard';

// === Placeholder components (replace later) ===
// const Home = () => <div>Home page</div>;
const Shop = () => <div>User Shop</div>;
const ProductDetails = () => <div>Product Details</div>;
const Cart = () => <div>Cart</div>;

export const userRoutes = (
  <>
    {/* User layout routes */}
    <Route path={USER_ROUTES.ROOT} element={<UserLayout />}>
      <Route index element={<Home />} />
      <Route path={USER_ROUTES.SHOP.replace('/', '')} element={<Shop />} />
      <Route path={USER_ROUTES.PRODUCT()} element={<ProductDetails />} />

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
            <ProfileDashboard />
          </UserProtected>
        }
      />
      {/* Auth pages without layout */}
      <Route path={PUBLIC_ROUTES.LOGIN.replace('/', '')} element={<Login />} />
      <Route path={PUBLIC_ROUTES.REGISTER.replace('/', '')} element={<Register />} />
      <Route path={PUBLIC_ROUTES.FORGOTPASS.replace('/', '')} element={<ForgotPassword />} />
    </Route>
  </>
);
