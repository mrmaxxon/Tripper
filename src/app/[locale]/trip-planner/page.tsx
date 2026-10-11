"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { MapPin, Calculator, Plus, Trash2, Calendar, DollarSign, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActionModal } from "@/components/ActionModal";
import { useLocale } from "next-intl";

interface DayPlan {
  day: number;
  location: string;
  activity: string;
}

export default function TripPlannerPage() {
  const locale = useLocale();
  const [destination, setDestination] = useState("Cox's Bazar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [tier, setTier] = useState<"budget" | "standard" | "luxury">("standard");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const paramDest = new URLSearchParams(window.location.search).get("destination");
      if (paramDest) {
        setDestination(paramDest);
        setItinerary([
          { day: 1, location: `${paramDest} Arrival & Check-in`, activity: "Local landmark exploration and regional dining" },
          { day: 2, location: `${paramDest} Major Sightseeing`, activity: "Guided nature walk and photography tour" },
          { day: 3, location: `${paramDest} Culture & Departure`, activity: "Local markets, souvenir shopping and return transit" }
        ]);
      }
    }
  }, []);

  const [itinerary, setItinerary] = useState<DayPlan[]>([
    { day: 1, location: "Inani Beach & Marine Drive", activity: "Sunset view and local seafood dining" },
    { day: 2, location: "Himchari National Park", activity: "Waterfalls & hill climbing trail" },
    { day: 3, location: "Laboni Beach & Burmese Market", activity: "Shopping and souvenir collection" }
  ]);

  // Dynamic cost model (BDT)
  const baseRatePerDayPerPerson = {
    budget: 2500,
    standard: 5500,
    luxury: 12000
  };

  const estimatedHotel = days * (tier === "budget" ? 2000 : tier === "standard" ? 4500 : 11000);
  const estimatedFood = days * travelers * (tier === "budget" ? 800 : tier === "standard" ? 1800 : 4000);
  const estimatedTransport = travelers * (tier === "budget" ? 1500 : tier === "standard" ? 3500 : 8000);
  const totalEstimatedCost = estimatedHotel + estimatedFood + estimatedTransport;

  const handleDaysChange = (newDays: number) => {
    const val = Math.max(1, Math.min(14, newDays));
    setDays(val);
    
    // adjust day slots
    const current = [...itinerary];
    if (val > current.length) {
      for (let i = current.length + 1; i <= val; i++) {
        current.push({
          day: i,
          location: `${destination} Exploration`,
          activity: "Sightseeing and cultural discovery"
        });
      }
    } else {
      current.splice(val);
    }
    setItinerary(current);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navigation />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-3 border border-blue-500/20">
            <Calculator className="w-4 h-4" />
            <span>Smart Itinerary & Cost Estimator</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Interactive Trip Planner
          </h1>
          <p className="text-lg text-foreground/75 leading-relaxed">
            Customize your Bangladesh route, generate multi-day schedules, and compute real-time budgets in Bangladeshi Taka (BDT).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Configuration Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="unseen-card rounded-2xl p-6 sm:p-8 border border-border/60">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Trip Parameters
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Primary Destination
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/40 text-sm"
                  >
                    {!["Cox's Bazar", "Sajek Valley", "Srimangal", "Sundarbans", "Bandarban", "Saint Martin"].includes(destination) && (
                      <option value={destination}>{destination}</option>
                    )}
                    <option value="Cox's Bazar">Cox's Bazar (Chittagong)</option>
                    <option value="Sajek Valley">Sajek Valley (Rangamati)</option>
                    <option value="Srimangal">Srimangal (Sylhet)</option>
                    <option value="Sundarbans">Sundarbans (Khulna)</option>
                    <option value="Bandarban">Nilgiri & Bandarban</option>
                    <option value="Saint Martin">Saint Martin's Island</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      Duration (Days)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={14}
                      value={days}
                      onChange={(e) => handleDaysChange(parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/40 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      Travelers
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={travelers}
                      onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/40 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Travel Comfort Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["budget", "standard", "luxury"] as const).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTier(item)}
                        className={`py-2 rounded-xl text-xs font-semibold capitalize border transition-all cursor-pointer ${
                          tier === item
                            ? "bg-primary text-white border-primary shadow-md"
                            : "bg-muted/50 text-foreground/75 border-border hover:bg-muted"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cost Summary Box */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="flex justify-between items-center text-sm mb-2 text-foreground/75">
                  <span>Accommodation:</span>
                  <span className="font-semibold">৳ {estimatedHotel.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm mb-2 text-foreground/75">
                  <span>Food & Dining:</span>
                  <span className="font-semibold">৳ {estimatedFood.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm mb-4 text-foreground/75">
                  <span>Local Transit & Entries:</span>
                  <span className="font-semibold">৳ {estimatedTransport.toLocaleString()}</span>
                </div>
                
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex justify-between items-center">
                  <div>
                    <span className="text-xs uppercase font-bold text-primary block">Estimated Total</span>
                    <span className="text-2xl font-extrabold text-foreground">
                      ৳ {totalEstimatedCost.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">BDT</span>
                </div>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full mt-6 rounded-full shadow-lg bg-[#0f6b4f] hover:bg-[#0f6b4f]/90 text-white font-bold h-12 cursor-pointer active:scale-95 transition-all"
                  size="lg"
                >
                  Request Official Quotation
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Interactive Day-by-Day Schedule */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-foreground">
                Day-by-Day Route ({days} Days in {destination})
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => handleDaysChange(days - 1)}
                  disabled={days <= 1}
                  className="rounded-full text-xs font-bold border-border cursor-pointer"
                >
                  - Remove Day
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => handleDaysChange(days + 1)}
                  disabled={days >= 14}
                  className="rounded-full text-xs font-bold border-border bg-[#0f6b4f]/10 text-[#0f6b4f] hover:bg-[#0f6b4f] hover:text-white cursor-pointer"
                >
                  + Add Day
                </Button>
              </div>
            </div>

            {itinerary.map((plan, index) => (
              <div
                key={plan.day}
                className="unseen-card rounded-2xl p-6 border border-border/60 hover:border-primary/40 transition-all flex flex-col sm:flex-row gap-5 items-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg flex-shrink-0">
                  D{plan.day}
                </div>

                <div className="flex-grow space-y-3 w-full">
                  <div>
                    <label className="text-xs text-muted-foreground font-semibold block mb-1">
                      Target Spot / Location
                    </label>
                    <input
                      type="text"
                      value={plan.location}
                      onChange={(e) => {
                        const copy = [...itinerary];
                        copy[index].location = e.target.value;
                        setItinerary(copy);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground font-semibold block mb-1">
                      Planned Activity / Itinerary Details
                    </label>
                    <input
                      type="text"
                      value={plan.activity}
                      onChange={(e) => {
                        const copy = [...itinerary];
                        copy[index].activity = e.target.value;
                        setItinerary(copy);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-sm text-foreground/80 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${destination} (${days} Days Trip)`}
        subtitle={`Estimated Budget: ৳ ${totalEstimatedCost.toLocaleString()} BDT (${travelers} Travelers, ${tier} tier)`}
        serviceType="quotation"
        initialData={{
          name: `${destination} Trip (${days} Days)`,
          price: totalEstimatedCost.toLocaleString(),
          destination,
        }}
        locale={locale}
      />
    </div>
  );
}
