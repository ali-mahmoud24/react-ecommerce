// src/layouts/UserLayout.tsx
import { Outlet } from "react-router";

export default function UserLayout() {
  return (
    <div>
      {/* TODO: Add User Navbar */}
      <header style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
        User Navbar
      </header>

      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>

      {/* TODO: Add User Footer */}
      <footer style={{ padding: "1rem", borderTop: "1px solid #ddd" }}>
        User Footer
      </footer>
    </div>
  );
}
