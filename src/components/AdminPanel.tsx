import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface RSVP {
  id: string;
  name: string;
  email: string;
  attending: "yes" | "no" | "maybe";
}

const mockRSVPs: RSVP[] = []; // Add your mock data here

const RSVPList: React.FC<{
  rsvps: RSVP[];
  onDelete: (id: string) => void;
}> = ({ rsvps, onDelete }) => {
  return <div>{/* Your RSVPList implementation */}</div>;
};

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rsvps, setRsvps] = useState(mockRSVPs);

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
  const maybeAttendingCount = rsvps.filter(
    (rsvp) => rsvp.attending === "maybe"
  ).length;

  const handleRSVPDelete = (id: string) => {
    setRsvps((prevRsvps) => prevRsvps.filter((rsvp) => rsvp.id !== id));
    toast.success("RSVP deleted successfully");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-wedding-primary">
            RSVP Admin Panel
          </h2>
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
              <CardTitle className="text-lg">Maybe</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-600">
                {maybeAttendingCount}
              </p>
            </CardContent>
          </Card>
        </div>

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
              <RSVPList rsvps={filteredRSVPs} onDelete={handleRSVPDelete} />
            </TabsContent>

            <TabsContent value="attending" className="mt-4">
              <RSVPList
                rsvps={filteredRSVPs.filter((rsvp) => rsvp.attending === "yes")}
                onDelete={handleRSVPDelete}
              />
            </TabsContent>

            <TabsContent value="not-attending" className="mt-4">
              <RSVPList
                rsvps={filteredRSVPs.filter((rsvp) => rsvp.attending === "no")}
                onDelete={handleRSVPDelete}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Keep the RSVPList component as is...

export default AdminPanel;
