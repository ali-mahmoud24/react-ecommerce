// routes/user.routes.tsx
import { Route } from 'react-router-dom';
import UserLayout from '@/layouts/user/UserLayout';
import UserProtected from '@/auth/UserProtected';
import { USER_ROUTES, PUBLIC_ROUTES } from '@/constants/routes';
import Home from '@/features/user/home/pages/Home';
import Login from '@/features/user/auth/pages/Login';
import Register from '@/features/user/auth/pages/Register';
import Profile from '@/features/user/profile/pages/Profile';
import ForgotPassword from '@/features/user/auth/pages/ForgotPassword';
import VerifyResetCode from '@/features/user/auth/pages/VerifyResetCode';
import ResetPassword from '@/features/user/auth/pages/ResetPassword';
import GuestOnly from '@/auth/GuestOnly';

export const userRoutes = (
  <>
    <>
      <Route
        path={PUBLIC_ROUTES.LOGIN}
        element={
          <GuestOnly>
            <Login />
          </GuestOnly>
        }
      />
      <Route
        path={PUBLIC_ROUTES.REGISTER}
        element={
          <GuestOnly>
            <Register />
          </GuestOnly>
        }
      />
      <Route
        path={PUBLIC_ROUTES.FORGOT_PASSWORD}
        element={
          <GuestOnly>
            <ForgotPassword />
          </GuestOnly>
        }
      />
      <Route
        path={PUBLIC_ROUTES.VERIFY_RESET_CODE}
        element={
          <GuestOnly>
            <VerifyResetCode />
          </GuestOnly>
        }
      />
      <Route
        path={PUBLIC_ROUTES.RESET_PASSWORD}
        element={
          <GuestOnly>
            <ResetPassword />
          </GuestOnly>
        }
      />
    </>

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
