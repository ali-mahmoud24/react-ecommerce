// src/layouts/UserLayout.tsx
import { Outlet } from "react-router";
import Navbar from "./components/UserNavbar";
import Footer from "./components/UserFooter";

export default function UserLayout() {
  return (
    <div>
      {/* User Navbar */}
      <Navbar />

      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>

      {/* User Footer */}
      <Footer />
    </div>
  );
}
