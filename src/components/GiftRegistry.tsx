import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, ChevronDown } from "lucide-react";

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
      qrCode: "/lovable-uploads/2dae8477-0604-4d1c-90d7-fc4e3c356bb1.png",
      accountName: "HERO",
      accountNumber: "•••••••5908",
    },
  ],
  bpi: [
    {
      name: "BPI",
      qrCode: "/lovable-uploads/20d3c7ff-fd26-4cb8-bdd2-88b00a7e4424.png",
      accountName: "AbeHero",
      accountNumber: "xxxxxxxxxxx159",
    },
  ],
  gcash: [
    {
      name: "GCash",
      qrCode: "/lovable-uploads/1d48a335-37ce-4a06-9875-a79204715dc2.png",
      accountName: "AB****L R.",
      accountNumber: "091• ••••790",
    },
  ],
  maya: [
    {
      name: "Maya",
      qrCode: "/lovable-uploads/be80ab0b-ec46-4e75-9cff-16e659aa41d4.png",
      accountName: "Jerrold Goguanco",
      accountNumber: "+63 *** *** 2528",
    },
  ],
};

const GiftRegistry = () => {
  const [activeTab, setActiveTab] = useState("bdo");

  return (
    <div className="wedding-container">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="section-title">Gift Registry</h2>

        <p className="text-wedding-text mb-8">
          Your presence and joy in celebrating with us on our special day would
          already warm our hearts. However, should you wish to honor us with a
          present, a monetary gift to start our married life would be greatly
          appreciated.
        </p>

        <div className="flex justify-center mb-8">
          <ChevronDown className="w-8 h-8 text-wedding-primary animate-bounce" />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 md:grid-cols-4 mb-6">
              <TabsTrigger value="bdo">BDO</TabsTrigger>
              <TabsTrigger value="bpi">BPI</TabsTrigger>
              <TabsTrigger value="gcash">GCash</TabsTrigger>
              <TabsTrigger value="maya">Maya</TabsTrigger>
            </TabsList>

            {Object.entries(paymentMethods).map(([key, methods]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div className="grid grid-cols-1 gap-6">
                  {methods.map((method, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden border-2 border-wedding-primary/10"
                    >
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
                            <p className="font-medium text-lg mb-1">
                              {method.accountName}
                            </p>
                          )}

                          {method.accountNumber && (
                            <p className="text-muted-foreground mb-4">
                              {method.accountNumber}
                            </p>
                          )}

                          <div className="p-4 bg-white rounded-lg border-2 border-wedding-primary/30 w-full max-w-[240px] mx-auto">
                            <img
                              src={method.qrCode}
                              alt={`${method.name} QR Code`}
                              className="w-full h-auto"
                            />
                          </div>

                          <p className="mt-4 text-sm text-muted-foreground">
                            Scan to transfer
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
      </div>
    </div>
  );
};

export default GiftRegistry;
