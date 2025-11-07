/* eslint-disable react-refresh/only-export-components */
import { Route } from 'react-router';
import UserLayout from '@/layouts/user/UserLayout';
import UserProtected from '@/auth/UserProtected';
import { USER_ROUTES, PUBLIC_ROUTES } from '@/constants/routes';

import Home from '@/features/user/home/pages/Home';
import Products from '@/features/user/products/pages/Products';
import ProductDetailsPage from "@/features/user/products/pages/ProductDetailsPage";
import CategoriesPage from "@/features/user/categories/pages/categoriesPage";
import CategoryDetailsPage from "@/features/user/categories/pages/CategoryDetailsPage";
import BrandsPage from "@/features/user/brands/pages/BrandsPage";
import BrandDetailsPage from "@/features/user/brands/pages/BrandDetailsPage";
import Cart from '@/features/user/cart/pages/Cart';
import Wishlist from '@/features/user/wishlist/pages/Wishlist';

// === Placeholder components (replace later) ===
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
      <Route path={USER_ROUTES.CATEGORIES.replace('/', '')} element={<CategoriesPage />} />
      <Route path={USER_ROUTES.CATEGORY()} element={<CategoryDetailsPage />} />
      <Route path={USER_ROUTES.BRANDS.replace("/", "")} element={<BrandsPage />} />
      <Route path={USER_ROUTES.BRAND()} element={<BrandDetailsPage />} />
      <Route path={USER_ROUTES.CART.replace('/', '')} element={<Cart/>} />
      <Route path={USER_ROUTES.WISHLIST.replace('/', '')} element={<Wishlist/>} />

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
    <Route path={PUBLIC_ROUTES.LOGIN.replace('/', '')} element={<Login />} />
    <Route path={PUBLIC_ROUTES.REGISTER.replace('/', '')} element={<Register />} />
  </>
);
