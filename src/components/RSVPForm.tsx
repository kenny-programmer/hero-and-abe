import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { X, Plus } from "lucide-react";
import { Guest, submitRSVP, checkEmailExists } from "@/lib/supabase";
import { useInviteType, INVITE_TYPES } from "@/hooks/useInviteType";

const emptyGuest = (): Guest => ({
  id: crypto.randomUUID(),
  name: "",
  email: "",
  phone: "",
  attending: "yes",
  mealPreference: "",
  specialRequirements: "",
});

const RSVPForm = () => {
  const { maxInvites, isValidInvite, inviteType } = useInviteType();
  const [isMultiGuest, setIsMultiGuest] = useState(false);
  const [singleGuest, setSingleGuest] = useState<Guest>(emptyGuest());
  const [multiGuests, setMultiGuests] = useState<Guest[]>([emptyGuest()]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (inviteType === INVITE_TYPES.GROUP) {
      setIsMultiGuest(true);
    } else if (inviteType === INVITE_TYPES.SINGLE) {
      setIsMultiGuest(false);
    }
  }, [inviteType]);

  const handleRSVPClick = () => {
    if (!isValidInvite) {
      toast.error("Invalid invitation link");
      return;
    }
    setOpenDialog(true);
  };

  const handleSingleGuestChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSingleGuest((prev) => ({ ...prev, [name]: value }));
  };

  const handleSingleGuestRadioChange = (value: "yes" | "no") => {
    setSingleGuest((prev) => ({ ...prev, attending: value }));
  };

  const handleMultiGuestChange = (
    id: string,
    field: keyof Guest,
    value: string
  ) => {
    setMultiGuests((prev) =>
      prev.map((guest) =>
        guest.id === id ? { ...guest, [field]: value } : guest
      )
    );
  };

  const handleAddGuest = () => {
    if (multiGuests.length < maxInvites) {
      setMultiGuests((prev) => [...prev, emptyGuest()]);
    } else {
      toast.error(`Maximum of ${maxInvites} guests allowed`);
    }
  };

  const handleRemoveGuest = (id: string) => {
    if (multiGuests.length > 1) {
      setMultiGuests((prev) => prev.filter((guest) => guest.id !== id));
    } else {
      toast.error("At least one guest is required");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const guestsToSubmit = isMultiGuest ? multiGuests : [singleGuest];

      // Check if any email already exists
      for (const guest of guestsToSubmit) {
        if (await checkEmailExists(guest.email)) {
          toast.error(`${guest.email} is already registered`);
          setIsSubmitting(false);
          return;
        }
      }

      await submitRSVP(guestsToSubmit);
      toast.success("Thank you for your RSVP!");
      setOpenDialog(false);

      // Reset form
      if (isMultiGuest) {
        setMultiGuests([emptyGuest()]);
      } else {
        setSingleGuest(emptyGuest());
      }
    } catch (error) {
      console.error("RSVP submission error:", error);
      toast.error("There was an error submitting your RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main RSVP Button */}
      <div className="flex justify-center mb-8">
        <Button
          onClick={handleRSVPClick}
          className="bg-wedding-primary hover:bg-wedding-accent text-white px-8 py-4 text-lg"
        >
          RSVP Now
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          className={
            (isMultiGuest ? "sm:max-w-[600px]" : "sm:max-w-[500px]") +
            " bg-white p-8 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto"
          }
        >
          <DialogHeader>
            <DialogTitle>
              {isMultiGuest ? `Guest Registration` : "Guest Registration"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            {isMultiGuest ? (
              <>
                {multiGuests.map((guest, index) => (
                  <div
                    key={guest.id}
                    className="p-4 border rounded-md relative"
                  >
                    <div className="absolute top-2 right-2">
                      {multiGuests.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveGuest(guest.id)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <h3 className="font-medium mb-3">Guest {index + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`name-${guest.id}`}>Full Name</Label>
                        <Input
                          id={`name-${guest.id}`}
                          value={guest.name}
                          onChange={(e) =>
                            handleMultiGuestChange(
                              guest.id,
                              "name",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`email-${guest.id}`}>Email</Label>
                        <Input
                          id={`email-${guest.id}`}
                          type="email"
                          value={guest.email}
                          onChange={(e) =>
                            handleMultiGuestChange(
                              guest.id,
                              "email",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`phone-${guest.id}`}>
                          Phone Number
                        </Label>
                        <Input
                          id={`phone-${guest.id}`}
                          value={guest.phone}
                          onChange={(e) =>
                            handleMultiGuestChange(
                              guest.id,
                              "phone",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label>Will you attend?</Label>
                        <RadioGroup
                          value={guest.attending}
                          onValueChange={(value) =>
                            handleMultiGuestChange(guest.id, "attending", value)
                          }
                          className="flex space-x-4 mt-2"
                        >
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem
                              value="yes"
                              id={`attending-yes-${guest.id}`}
                            />
                            <Label htmlFor={`attending-yes-${guest.id}`}>
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem
                              value="no"
                              id={`attending-no-${guest.id}`}
                            />
                            <Label htmlFor={`attending-no-${guest.id}`}>
                              No
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label htmlFor={`mealPreference-${guest.id}`}>
                          Meal Preference
                        </Label>
                        <Input
                          id={`mealPreference-${guest.id}`}
                          value={guest.mealPreference}
                          onChange={(e) =>
                            handleMultiGuestChange(
                              guest.id,
                              "mealPreference",
                              e.target.value
                            )
                          }
                          placeholder="Vegetarian, Vegan, etc."
                        />
                      </div>
                      <div>
                        <Label htmlFor={`specialRequirements-${guest.id}`}>
                          Special Requirements
                        </Label>
                        <Input
                          id={`specialRequirements-${guest.id}`}
                          value={guest.specialRequirements}
                          onChange={(e) =>
                            handleMultiGuestChange(
                              guest.id,
                              "specialRequirements",
                              e.target.value
                            )
                          }
                          placeholder="Allergies, accessibility needs, etc."
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {multiGuests.length < maxInvites && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddGuest}
                    className="w-full border-dashed"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Guest
                  </Button>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={singleGuest.name}
                    onChange={handleSingleGuestChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={singleGuest.email}
                    onChange={handleSingleGuestChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={singleGuest.phone}
                    onChange={handleSingleGuestChange}
                    required
                  />
                </div>
                <div>
                  <Label>Will you attend?</Label>
                  <RadioGroup
                    value={singleGuest.attending}
                    onValueChange={handleSingleGuestRadioChange}
                    className="flex space-x-4 mt-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="attending-yes" />
                      <Label htmlFor="attending-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="attending-no" />
                      <Label htmlFor="attending-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="mealPreference">Meal Preference</Label>
                  <Input
                    id="mealPreference"
                    name="mealPreference"
                    value={singleGuest.mealPreference}
                    onChange={handleSingleGuestChange}
                    placeholder="Vegetarian, Vegan, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="specialRequirements">
                    Special Requirements
                  </Label>
                  <Input
                    id="specialRequirements"
                    name="specialRequirements"
                    value={singleGuest.specialRequirements}
                    onChange={handleSingleGuestChange}
                    placeholder="Allergies, accessibility needs, etc."
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-wedding-primary hover:bg-wedding-accent text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit RSVP"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RSVPForm;
