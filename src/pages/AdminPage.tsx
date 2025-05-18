
import AdminPanel from "@/components/AdminPanel";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-wedding-secondary py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-cursive text-wedding-primary text-center mb-8">Wedding Admin Panel</h1>
        <AdminPanel />
      </div>
    </div>
  );
};

export default AdminPage;
