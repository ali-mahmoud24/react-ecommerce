import { Outlet } from 'react-router';
import Navbar from './components/UserNavbar';
import Footer from './components/UserFooter';

export default function UserLayout() {

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
