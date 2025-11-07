import { Outlet } from 'react-router';

export default function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Admin Sidebar */}
      <aside
        style={{
          width: '240px',
          background: '#f5f5f5',
          padding: '1rem',
          borderRight: '1px solid #ddd',
        }}
      >
        Admin Sidebar
      </aside>

      <main style={{ flex: 1, padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
