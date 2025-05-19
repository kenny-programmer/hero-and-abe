import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Guest, fetchRSVPs, deleteRSVP } from "@/lib/supabase";
import { Loader2, Trash2 } from "lucide-react";

const RSVPList: React.FC<{
  rsvps: Guest[];
  onDelete: (id: string) => void;
}> = ({ rsvps, onDelete }) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  if (rsvps.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No RSVPs found matching your criteria.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rsvps.map((rsvp) => (
        <Card key={rsvp.id} className="relative">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{rsvp.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{rsvp.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{rsvp.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Attending</p>
                <p
                  className={`font-medium ${
                    rsvp.attending === "yes" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {rsvp.attending === "yes" ? "Yes" : "No"}
                </p>
              </div>
              {rsvp.mealPreference && (
                <div>
                  <p className="text-sm text-gray-500">Meal Preference</p>
                  <p className="font-medium">{rsvp.mealPreference}</p>
                </div>
              )}
              {rsvp.specialRequirements && (
                <div>
                  <p className="text-sm text-gray-500">Special Requirements</p>
                  <p className="font-medium">{rsvp.specialRequirements}</p>
                </div>
              )}
            </div>
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleDelete(rsvp.id)}
                disabled={deletingId === rsvp.id}
              >
                {deletingId === rsvp.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rsvps, setRsvps] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRSVPs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRSVPs();
      setRsvps(data);
    } catch (error) {
      console.error("Error loading RSVPs:", error);
      setError("Failed to load RSVPs. Please refresh the page.");
      toast.error("Failed to load RSVPs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRSVPs();
  }, []);

  const filteredRSVPs = rsvps.filter(
    (rsvp) =>
      rsvp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rsvp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const attendingCount = rsvps.filter(
    (rsvp) => rsvp.attending === "yes"
  ).length;
  const notAttendingCount = rsvps.filter(
    (rsvp) => rsvp.attending === "no"
  ).length;
  const totalCount = rsvps.length;

  const handleRSVPDelete = async (id: string) => {
    try {
      await deleteRSVP(id);
      setRsvps((prevRsvps) => prevRsvps.filter((rsvp) => rsvp.id !== id));
      toast.success("RSVP deleted successfully");
    } catch (error) {
      console.error("Error deleting RSVP:", error);
      toast.error("Failed to delete RSVP");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-wedding-primary">
            RSVP Admin Panel
          </h2>
          <Button onClick={loadRSVPs} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
              </>
            ) : (
              "Refresh"
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Attending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {attendingCount}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Not Attending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">
                {notAttendingCount}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{totalCount}</p>
            </CardContent>
          </Card>
        </div>

        {error && (
          <div className="bg-red-50 text-red-800 p-4 rounded-md">{error}</div>
        )}

        <div>
          <div className="mb-4">
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="attending">Attending</TabsTrigger>
              <TabsTrigger value="not-attending">Not Attending</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-wedding-primary" />
                </div>
              ) : (
                <RSVPList rsvps={filteredRSVPs} onDelete={handleRSVPDelete} />
              )}
            </TabsContent>

            <TabsContent value="attending" className="mt-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-wedding-primary" />
                </div>
              ) : (
                <RSVPList
                  rsvps={filteredRSVPs.filter(
                    (rsvp) => rsvp.attending === "yes"
                  )}
                  onDelete={handleRSVPDelete}
                />
              )}
            </TabsContent>

            <TabsContent value="not-attending" className="mt-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-wedding-primary" />
                </div>
              ) : (
                <RSVPList
                  rsvps={filteredRSVPs.filter(
                    (rsvp) => rsvp.attending === "no"
                  )}
                  onDelete={handleRSVPDelete}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
