import { Routes, Route, Navigate } from 'react-router';

import { userRoutes } from '@/routes/user.routes';
import { adminRoutes } from '@/routes/admin.routes';
import { PUBLIC_ROUTES } from '@/constants/routes';

export default function App() {
  return (
    <Routes>
      {userRoutes}
      {adminRoutes}

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to={PUBLIC_ROUTES.HOME} replace />} />
    </Routes>
  );
}
