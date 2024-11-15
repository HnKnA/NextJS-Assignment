// src/app/admin/layout.tsx

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: "20px", backgroundColor: "red" }}>
      <h1>Admin Panel</h1>
      {children}
    </div>
  );
}
