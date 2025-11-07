/* eslint-disable react-refresh/only-export-components */
import { Route } from 'react-router';
import UserLayout from '@/layouts/user/UserLayout';
import UserProtected from '@/auth/UserProtected';
import { USER_ROUTES, PUBLIC_ROUTES } from '@/constants/routes';

import Home from '@/features/user/home/pages/Home';
import Products from '@/features/user/products/pages/Products';
import CategoriesPage from '@/features/user/categories/pages/categoriesPage';
import CategoryDetailsPage from '@/features/user/categories/pages/CategoryDetailsPage';
import BrandsPage from '@/features/user/brands/pages/BrandsPage';
import BrandDetailsPage from '@/features/user/brands/pages/BrandDetailsPage';

import ProductDetailsPage from '@/features/user/products/pages/ProductDetailsPage';
import Cart from '@/features/user/cart/pages/Cart';
import Profile from '@/features/user/profile/pages/Profile';
import Register from '@/features/user/auth/pages/Register';
import Login from '@/features/user/auth/pages/Login';
import ForgotPassword from '@/features/user/auth/pages/ForgotPassword';
import GuestOnly from '@/auth/GuestOnly';
import VerifyResetCode from '@/features/user/auth/pages/VerifyResetCode';
import ResetPassword from '@/features/user/auth/pages/ResetPassword';
import NotAdmin from '@/auth/NotAdmin';

// === Placeholder components (replace later) ===
// const Cart = () => <div>Cart</div>;

export const userRoutes = (
  <>
    {/* User layout routes */}
    <Route
      path={USER_ROUTES.ROOT}
      element={
        <NotAdmin>
          <UserLayout />
        </NotAdmin>
      }
    >
      <Route index element={<Home />} />
      <Route path={USER_ROUTES.PRODUCTS.replace('/', '')} element={<Products />} />
      <Route path={USER_ROUTES.PRODUCT()} element={<ProductDetailsPage />} />
      <Route path={USER_ROUTES.CATEGORIES.replace('/', '')} element={<CategoriesPage />} />
      <Route path={USER_ROUTES.CATEGORY()} element={<CategoryDetailsPage />} />
      <Route path={USER_ROUTES.BRANDS.replace('/', '')} element={<BrandsPage />} />
      <Route path={USER_ROUTES.BRAND()} element={<BrandDetailsPage />} />
      {/* <Route path={USER_ROUTES.CART()} element = {<Cart/>} /> */}

      <Route
        path={USER_ROUTES.CART.replace('/', '')}
        element={
          <UserProtected>
            <Cart />
          </UserProtected>
        }
      />
      {/* <Route
        path={USER_ROUTES.CART.replace('/', '')}
        element={
          <UserProtected>
            <Cart />
          </UserProtected>
        }
      /> */}

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

    <Route
      path={PUBLIC_ROUTES.LOGIN.replace('/', '')}
      element={
        <GuestOnly>
          <Login />
        </GuestOnly>
      }
    />
    <Route
      path={PUBLIC_ROUTES.FORGOT_PASSWORD.replace('/', '')}
      element={
        <GuestOnly>
          <ForgotPassword />
        </GuestOnly>
      }
    />
    <Route
      path={PUBLIC_ROUTES.FORGOT_PASSWORD.replace('/', '')}
      element={
        <GuestOnly>
          <ForgotPassword />
        </GuestOnly>
      }
    />
    <Route
      path={PUBLIC_ROUTES.VERIFY_RESET_CODE.replace('/', '')}
      element={
        <GuestOnly>
          <VerifyResetCode />
        </GuestOnly>
      }
    />
    <Route
      path={PUBLIC_ROUTES.VERIFY_RESET_CODE.replace('/', '')}
      element={
        <GuestOnly>
          <ResetPassword />
        </GuestOnly>
      }
    />
    <Route
      path={PUBLIC_ROUTES.REGISTER.replace('/', '')}
      element={
        <GuestOnly>
          <Register />
        </GuestOnly>
      }
    />
  </>
);
