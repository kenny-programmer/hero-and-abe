
import { Card, CardContent } from "@/components/ui/card";
import { Share2, Camera } from "lucide-react";

const CustomSocialHashtags = () => {
  return (
    <section className="py-16 bg-wedding-secondary text-center">
      <div className="wedding-container">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
          <div className="flex justify-center mb-4">
            <Camera className="h-10 w-10 text-wedding-primary" />
          </div>
          <h2 className="text-2xl font-bold font-cursive text-wedding-primary mb-4">Capture the Love</h2>
          <p className="mb-6 text-wedding-text">
            Capture the love on our special day. Use our official hashtags for photos and videos you want to share.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Card className="border-2 border-wedding-primary/30">
              <CardContent className="p-4 flex items-center">
                <span className="text-wedding-primary font-medium">#ABElessingGivenGenHEROuslyByGod</span>
              </CardContent>
            </Card>
            <Card className="border-2 border-wedding-primary/30">
              <CardContent className="p-4 flex items-center">
                <span className="text-wedding-primary font-medium">#ABEnigaySaAmingPaHEROngMaykapal</span>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center">
            <Share2 className="h-6 w-6 text-wedding-accent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomSocialHashtags;
