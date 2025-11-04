// routes/user.routes.tsx
import { Route } from 'react-router-dom';
import UserLayout from '@/layouts/user/UserLayout';
import UserProtected from '@/auth/UserProtected';
import { USER_ROUTES, PUBLIC_ROUTES } from '@/constants/routes';
import Home from '@/features/user/home/pages/Home';
import Login from '@/features/user/auth/pages/Login';
import Register from '@/features/user/auth/pages/Register';
import ForgotPassword from '@/features/user/auth/pages/ForgotPassword';
import Profile from '@/features/user/profile/pages/Profile';
import ResetPassword from '@/features/user/auth/pages/ResetPassword';
import GoogleCallback from '@/features/user/auth/pages/GoogleCallback';
import AuthSuccess from '@/features/user/auth/pages/AuthSuccess';

export const userRoutes = (
  <>
    <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />} />
    <Route path={PUBLIC_ROUTES.REGISTER} element={<Register />} />
    <Route path={PUBLIC_ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/auth/google/callback" element={<GoogleCallback />} />
    <Route path="/auth/success" element={<AuthSuccess />} />
    <Route path={USER_ROUTES.ROOT} element={<UserLayout />}>
      <Route index element={<Home />} />
      {/* 
      <Route
        path={USER_ROUTES.CART}
        element={
          <UserProtected>
            <Cart />
          </UserProtected>
        }
      /> */}

      <Route
        path={USER_ROUTES.PROFILE}
        element={
          <UserProtected>
            <Profile />
          </UserProtected>
        }
      />
    </Route>
  </>
);
