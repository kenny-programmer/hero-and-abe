
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'sonner';

// Mock data - in a real app, this would come from your backend
const mockRSVPs = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-1234',
    attending: 'yes',
    mealPreference: 'Vegetarian',
    specialRequirements: 'None',
    date: '2025-05-10T14:30:00'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-5678',
    attending: 'no',
    mealPreference: '',
    specialRequirements: '',
    date: '2025-05-11T09:15:00'
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '555-9012',
    attending: 'maybe',
    mealPreference: 'Vegan',
    specialRequirements: 'Allergic to nuts',
    date: '2025-05-12T16:45:00'
  }
];

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [rsvps, setRsvps] = useState(mockRSVPs);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Use the requested admin password
    if (username === 'admin' && password === 'weddingAdmin4321') {
      setIsAuthenticated(true);
      toast.success('Login successful');
    } else {
      toast.error('Invalid credentials');
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };
  
  const filteredRSVPs = rsvps.filter(rsvp => 
    rsvp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rsvp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const attendingCount = rsvps.filter(rsvp => rsvp.attending === 'yes').length;
  const notAttendingCount = rsvps.filter(rsvp => rsvp.attending === 'no').length;
  const maybeAttendingCount = rsvps.filter(rsvp => rsvp.attending === 'maybe').length;
  
  const handleRSVPDelete = (id: string) => {
    setRsvps(prevRsvps => prevRsvps.filter(rsvp => rsvp.id !== id));
    toast.success('RSVP deleted successfully');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {!isAuthenticated ? (
        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Please login to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full bg-wedding-primary text-white hover:bg-wedding-accent">Login</Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-wedding-primary">RSVP Admin Panel</h2>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Attending</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">{attendingCount}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Not Attending</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-red-600">{notAttendingCount}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Maybe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-amber-600">{maybeAttendingCount}</p>
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
                <RSVPList 
                  rsvps={filteredRSVPs} 
                  onDelete={handleRSVPDelete} 
                />
              </TabsContent>
              
              <TabsContent value="attending" className="mt-4">
                <RSVPList 
                  rsvps={filteredRSVPs.filter(rsvp => rsvp.attending === 'yes')} 
                  onDelete={handleRSVPDelete} 
                />
              </TabsContent>
              
              <TabsContent value="not-attending" className="mt-4">
                <RSVPList 
                  rsvps={filteredRSVPs.filter(rsvp => rsvp.attending === 'no')} 
                  onDelete={handleRSVPDelete} 
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

interface RSVPListProps {
  rsvps: typeof mockRSVPs;
  onDelete: (id: string) => void;
}

const RSVPList = ({ rsvps, onDelete }: RSVPListProps) => {
  return (
    <div className="space-y-4">
      {rsvps.length === 0 ? (
        <p className="text-center py-4 text-muted-foreground">No RSVPs found</p>
      ) : (
        rsvps.map(rsvp => (
          <Card key={rsvp.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{rsvp.name}</CardTitle>
                  <CardDescription>
                    <span className={`font-medium ${
                      rsvp.attending === 'yes' ? 'text-green-600' : 
                      rsvp.attending === 'no' ? 'text-red-600' : 
                      'text-amber-600'
                    }`}>
                      {rsvp.attending === 'yes' ? 'Attending' : 
                       rsvp.attending === 'no' ? 'Not Attending' : 
                       'Maybe Attending'}
                    </span>
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>RSVP Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 py-4">
                      <div>
                        <h4 className="font-medium text-sm">Name</h4>
                        <p>{rsvp.name}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Email</h4>
                        <p>{rsvp.email}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Phone</h4>
                        <p>{rsvp.phone}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Attending</h4>
                        <p>{rsvp.attending === 'yes' ? 'Yes' : rsvp.attending === 'no' ? 'No' : 'Maybe'}</p>
                      </div>
                      {rsvp.attending !== 'no' && (
                        <>
                          <div>
                            <h4 className="font-medium text-sm">Meal Preference</h4>
                            <p>{rsvp.mealPreference || 'None specified'}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Special Requirements</h4>
                            <p>{rsvp.specialRequirements || 'None specified'}</p>
                          </div>
                        </>
                      )}
                      <div>
                        <h4 className="font-medium text-sm">Submitted On</h4>
                        <p>{new Date(rsvp.date).toLocaleString()}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm">{rsvp.email} • {rsvp.phone}</p>
              {rsvp.attending !== 'no' && rsvp.mealPreference && (
                <p className="text-sm mt-1">Meal: {rsvp.mealPreference}</p>
              )}
            </CardContent>
            <CardFooter className="pt-2">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => onDelete(rsvp.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default AdminPanel;
