export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Remove the sidebar completely */}
      <main className="p-8 bg-orange-50">
        {children}
      </main>
    </div>
  );
}