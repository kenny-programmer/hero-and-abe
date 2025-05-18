
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode } from 'lucide-react';

interface PaymentMethod {
  name: string;
  logoUrl?: string;
  qrCode: string;
  accountName?: string;
  accountNumber?: string;
}

const paymentMethods: Record<string, PaymentMethod[]> = {
  bdo: [
    {
      name: "BDO",
      logoUrl: "/lovable-uploads/2dae8477-0604-4d1c-90d7-fc4e3c356bb1.png",
      qrCode: "/lovable-uploads/2dae8477-0604-4d1c-90d7-fc4e3c356bb1.png",
      accountName: "HERO",
      accountNumber: "•••••••5908"
    }
  ],
  bpi: [
    {
      name: "BPI",
      logoUrl: "/lovable-uploads/20d3c7ff-fd26-4cb8-bdd2-88b00a7e4424.png",
      qrCode: "/lovable-uploads/20d3c7ff-fd26-4cb8-bdd2-88b00a7e4424.png",
      accountName: "AbeHero",
      accountNumber: "xxxxxxxxxxx159"
    }
  ],
  gcash: [
    {
      name: "GCash",
      logoUrl: "/lovable-uploads/1d48a335-37ce-4a06-9875-a79204715dc2.png",
      qrCode: "/lovable-uploads/1d48a335-37ce-4a06-9875-a79204715dc2.png",
      accountName: "AB****L R.",
      accountNumber: "091• ••••790"
    }
  ],
  maya: [
    {
      name: "Maya",
      logoUrl: "/lovable-uploads/be80ab0b-ec46-4e75-9cff-16e659aa41d4.png",
      qrCode: "/lovable-uploads/be80ab0b-ec46-4e75-9cff-16e659aa41d4.png",
      accountName: "Jerrold Goguanco",
      accountNumber: "+63 *** *** 2528"
    }
  ]
};

const GiftRegistry = () => {
  const [activeTab, setActiveTab] = useState("bdo");
  
  return (
    <div className="wedding-container">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="section-title">Gift Registry</h2>
        
        <p className="text-wedding-text mb-8">
          Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we've included some options below.
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-cursive text-wedding-text mb-6">Monetary Gifts</h3>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="bdo">BDO</TabsTrigger>
              <TabsTrigger value="bpi">BPI</TabsTrigger>
              <TabsTrigger value="gcash">GCash</TabsTrigger>
              <TabsTrigger value="maya">Maya</TabsTrigger>
            </TabsList>
            
            {Object.entries(paymentMethods).map(([key, methods]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div className="grid grid-cols-1 gap-6">
                  {methods.map((method, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center">
                          {method.logoUrl && (
                            <div className="mb-4 w-24 h-24 flex items-center justify-center">
                              <img 
                                src={method.logoUrl} 
                                alt={method.name} 
                                className="max-w-full max-h-full object-contain" 
                              />
                            </div>
                          )}
                          
                          {method.accountName && (
                            <p className="font-medium text-lg mb-1">{method.accountName}</p>
                          )}
                          
                          {method.accountNumber && (
                            <p className="text-muted-foreground mb-4">{method.accountNumber}</p>
                          )}
                          
                          <div className="p-4 bg-white rounded-lg border w-full max-w-[240px] mx-auto">
                            <img 
                              src={method.qrCode} 
                              alt={`${method.name} QR Code`} 
                              className="w-full h-auto" 
                            />
                          </div>
                          
                          <p className="mt-4 text-sm text-muted-foreground">
                            Scan the QR code to send a gift
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-cursive text-wedding-text mb-6">Registry Items</h3>
          
          <p className="text-wedding-text">
            For those who prefer to give physical gifts, we've set up a registry at the following stores:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <h4 className="font-medium text-lg mb-4">Home Essentials</h4>
                <a href="#" className="text-wedding-primary hover:underline">
                  View Our Registry →
                </a>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <h4 className="font-medium text-lg mb-4">Honeymoon Fund</h4>
                <a href="#" className="text-wedding-primary hover:underline">
                  Contribute →
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftRegistry;
