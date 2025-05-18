import { useState, useEffect } from "react";
import AdminPanel from "@/components/AdminPanel";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom"; // Add this import

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate(); // Add this hook

  // Check for stored authentication
  useEffect(() => {
    const storedAuth = localStorage.getItem("adminAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === "weddingAdmin4321") {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel",
      });
    } else {
      toast({
        title: "Invalid password",
        description: "Please try again with the correct password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
    setPassword("");
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin panel",
    });
  };

  // Add this function to handle going back
  const handleBack = () => {
    navigate("/"); // This will navigate back to the home page
  };

  return (
    <div className="min-h-screen bg-wedding-secondary py-10">
      <div className="container mx-auto px-4">
        {/* Add Back button at the top */}
        <div className="flex justify-start mb-4">
          <Button
            variant="outline"
            onClick={handleBack}
            className="text-wedding-primary"
          >
            ← Back to Home
          </Button>
        </div>

        <h1 className="text-3xl font-cursive text-wedding-primary text-center mb-8">
          Wedding Admin Panel
        </h1>

        {isAuthenticated ? (
          <>
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-wedding-primary"
              >
                Logout
              </Button>
            </div>
            <AdminPanel /> {/* This component should display your RSVP list */}
          </>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <h2 className="text-xl font-medium mb-4">Admin Login</h2>
              <div className="space-y-4">
                <div>
                  <Input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLogin();
                      }
                    }}
                  />
                </div>
                <Button
                  className="w-full bg-wedding-primary hover:bg-wedding-accent text-white"
                  onClick={handleLogin}
                >
                  Log In
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
