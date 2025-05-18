
import { Share2 } from "lucide-react";

const SocialHashtags = () => {
  return (
    <div className="py-12 bg-wedding-primary/10 rounded-lg my-12">
      <div className="wedding-container">
        <div className="text-center">
          <Share2 className="w-10 h-10 mx-auto mb-4 text-wedding-primary" />
          <h2 className="text-2xl md:text-3xl font-cursive font-bold text-wedding-text mb-4">
            Capture the love on our special day
          </h2>
          <p className="text-wedding-text mb-6">
            Use our official hashtags for photos and videos you want to share.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div className="bg-white px-6 py-4 rounded-lg shadow-md">
              <p className="font-medium text-wedding-primary text-lg md:text-xl">
                #ABElessingGivenGenHEROuslyByGod
              </p>
            </div>
            
            <div className="bg-white px-6 py-4 rounded-lg shadow-md">
              <p className="font-medium text-wedding-primary text-lg md:text-xl">
                #ABEnigaySaAmingPaHEROngMaykapal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialHashtags;
