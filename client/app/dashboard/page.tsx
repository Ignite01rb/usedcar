"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database, AlertCircle, ArrowLeft, Car, Sparkles, User, Zap, CheckCircle2, Loader2 } from "lucide-react";
import axios from "@/lib/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CarFormValues, carFormSchema } from "@/lib/validations/car";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

interface PredictionResult {
  predicted_price: number;
  formatted_price: string;
  price_range: {
    min: number;
    max: number;
    formatted_min: string;
    formatted_max: string;
  };
  r2_score: string;
}

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const form = useForm<CarFormValues>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      name: "Maruti",
      model: "Swift Dzire",
      year: "2020",
      km_driven: "35000",
      fuel: "Petrol",
      seller_type: "Individual",
      transmission: "Manual",
      owner: "First Owner",
      mileage: "21.21",
      engine: "1197",
      max_power: "81.80",
    },
  });

  const handlePredict = async (values: CarFormValues) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await axios.post("/predict", values);
      if (res.status === 200 && res.data.success) {
        setResult(res.data);
        setIsModalOpen(true);
      } else {
        setErrorMsg(res.data.error || "Failed to calculate prediction.");
      }
    } catch (error: unknown) {
      console.error(error);
      const err = error as { response?: { data?: { error?: string } } };
      setErrorMsg(err?.response?.data?.error || "Could not connect to API server. Ensure python app.py is running on http://127.0.0.1:5001");
    } finally {
      setIsLoading(false);
    }
  };

  const loadPreset = (preset: string) => {
    if (preset === "swift") {
      form.reset({
        name: "Maruti",
        model: "Swift Dzire",
        year: "2022",
        km_driven: "25000",
        fuel: "Petrol",
        seller_type: "Individual",
        transmission: "Manual",
        owner: "First Owner",
        mileage: "22.0",
        engine: "1197",
        max_power: "88.5",
      });
    } else if (preset === "creta") {
      form.reset({
        name: "Hyundai",
        model: "Creta SX",
        year: "2023",
        km_driven: "18000",
        fuel: "Diesel",
        seller_type: "Individual",
        transmission: "Automatic",
        owner: "First Owner",
        mileage: "18.5",
        engine: "1493",
        max_power: "113.4",
      });
    } else if (preset === "city") {
      form.reset({
        name: "Honda",
        model: "City VX",
        year: "2021",
        km_driven: "32000",
        fuel: "Petrol",
        seller_type: "Individual",
        transmission: "Manual",
        owner: "First Owner",
        mileage: "17.8",
        engine: "1498",
        max_power: "119.35",
      });
    } else if (preset === "nexon") {
      form.reset({
        name: "Tata",
        model: "Nexon XZ Plus",
        year: "2024",
        km_driven: "12000",
        fuel: "Petrol",
        seller_type: "Individual",
        transmission: "Manual",
        owner: "First Owner",
        mileage: "17.0",
        engine: "1199",
        max_power: "118.3",
      });
    }
  };

  const generateYearOptions = () => {
    const years = [];
    for (let i = 2026; i >= 2000; i--) {
      years.push(i);
    }
    return years;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Header Bar */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-slate-900">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-indigo-50 text-indigo-600">
                <Car className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm tracking-tight">AutoValuate AI</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <User className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-slate-600">Developed by <strong className="text-slate-900 font-semibold">Raaghav Bisht</strong></span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-8 flex-1 w-full">
        {/* Title Banner */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Car Price Predictor
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select vehicle specifications below to calculate market resale valuation.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Presets:
            </span>
            <Button variant="outline" size="sm" onClick={() => loadPreset("swift")} className="text-xs h-7 border-slate-200 bg-white hover:bg-slate-50">
              Swift
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadPreset("creta")} className="text-xs h-7 border-slate-200 bg-white hover:bg-slate-50">
              Creta
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadPreset("city")} className="text-xs h-7 border-slate-200 bg-white hover:bg-slate-50">
              City
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadPreset("nexon")} className="text-xs h-7 border-slate-200 bg-white hover:bg-slate-50">
              Nexon
            </Button>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-xs sm:text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <Card className="lg:col-span-2 p-6 sm:p-8 custom-card rounded-2xl bg-white">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handlePredict)} className="space-y-6">

                {/* Section 1: Brand & Model */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    1. Brand & Vehicle Model
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-slate-700">Car Brand</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-50 border-slate-200 focus:bg-white text-xs h-9">
                                <SelectValue placeholder="Select Brand" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Maruti">Maruti Suzuki</SelectItem>
                              <SelectItem value="Hyundai">Hyundai</SelectItem>
                              <SelectItem value="Honda">Honda</SelectItem>
                              <SelectItem value="Toyota">Toyota</SelectItem>
                              <SelectItem value="Mahindra">Mahindra</SelectItem>
                              <SelectItem value="Tata">Tata Motors</SelectItem>
                              <SelectItem value="Ford">Ford</SelectItem>
                              <SelectItem value="Renault">Renault</SelectItem>
                              <SelectItem value="Volkswagen">Volkswagen</SelectItem>
                              <SelectItem value="Chevrolet">Chevrolet</SelectItem>
                              <SelectItem value="Nissan">Nissan</SelectItem>
                              <SelectItem value="Skoda">Skoda</SelectItem>
                              <SelectItem value="BMW">BMW</SelectItem>
                              <SelectItem value="Audi">Audi</SelectItem>
                              <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-slate-700">Car Model</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Swift Dzire, Creta, City"
                              className="bg-slate-50 border-slate-200 focus:bg-white text-xs h-9"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Section 2: Specifications & Usage */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    2. Specifications & Usage
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-slate-700">Manufacturing Year (Up to 2026)</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-50 border-slate-200 focus:bg-white text-xs h-9">
                                <SelectValue placeholder="Select Year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-56">
                              {generateYearOptions().map((y) => (
                                <SelectItem key={y} value={y.toString()}>
                                  {y}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="km_driven"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-slate-700">Kilometers Driven</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 35000"
                              className="bg-slate-50 border-slate-200 focus:bg-white text-xs h-9"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mileage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-slate-700">Mileage (kmpl)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="e.g., 21.2"
                              className="bg-slate-50 border-slate-200 focus:bg-white text-xs h-9"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="engine"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-slate-700">Engine Displacement (CC)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 1197"
                              className="bg-slate-50 border-slate-200 focus:bg-white text-xs h-9"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="max_power"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-xs font-semibold text-slate-700">Max Power (BHP)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="e.g., 81.8"
                              className="bg-slate-50 border-slate-200 focus:bg-white text-xs h-9"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Section 3: Ownership Details */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    3. Ownership & Deal Type
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="fuel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-slate-700">Fuel Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-50 border-slate-200 focus:bg-white text-xs h-9">
                                <SelectValue placeholder="Fuel" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Petrol">Petrol</SelectItem>
                              <SelectItem value="Diesel">Diesel</SelectItem>
                              <SelectItem value="CNG">CNG</SelectItem>
                              <SelectItem value="LPG">LPG</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="transmission"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-slate-700">Transmission</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-50 border-slate-200 focus:bg-white text-xs h-9">
                                <SelectValue placeholder="Transmission" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Manual">Manual</SelectItem>
                              <SelectItem value="Automatic">Automatic</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="seller_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-slate-700">Seller Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-50 border-slate-200 focus:bg-white text-xs h-9">
                                <SelectValue placeholder="Seller" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Individual">Individual</SelectItem>
                              <SelectItem value="Dealer">Dealer</SelectItem>
                              <SelectItem value="Trustmark Dealer">Trustmark Dealer</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="owner"
                      render={({ field }) => (
                        <FormItem className="md:col-span-3">
                          <FormLabel className="text-xs font-semibold text-slate-700">Owner History</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-50 border-slate-200 focus:bg-white text-xs h-9">
                                <SelectValue placeholder="Owner History" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="First Owner">First Owner</SelectItem>
                              <SelectItem value="Second Owner">Second Owner</SelectItem>
                              <SelectItem value="Third Owner">Third Owner</SelectItem>
                              <SelectItem value="Fourth & Above Owner">Fourth & Above Owner</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Calculating ML Prediction...
                      </>
                    ) : (
                      "Calculate Resale Price"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </Card>

          {/* Right Column Cards */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 custom-card rounded-2xl bg-white space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ML Model Information
              </div>

              <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <div className="p-2.5 rounded-lg bg-indigo-50/60 border border-indigo-100 flex justify-between items-center">
                  <span className="text-slate-600">Model Accuracy:</span>
                  <span className="font-bold text-indigo-700 text-sm">93.97% R²</span>
                </div>
                <p>• <strong>Algorithm:</strong> Ensemble Voting (Random Forest + Gradient Boosting).</p>
                <p>• <strong>Features:</strong> Brand, Model, Manufacturing Year (up to 2026), Mileage, Engine CC, BHP & Usage.</p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link href="/Cardetails.csv" target="_blank">
                  <Button variant="outline" size="sm" className="w-full text-xs gap-2 border-slate-200">
                    <Database className="w-3.5 h-3.5 text-indigo-600" />
                    View Dataset CSV
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Prediction Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[440px] bg-white text-slate-900 border-slate-200 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold flex items-center gap-2 text-slate-900">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                Resale Price Estimate
              </DialogTitle>
            </DialogHeader>

            {result && (
              <div className="py-2 space-y-5">
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Estimated Market Value
                  </div>
                  <div className="text-4xl font-extrabold text-indigo-600 py-1">
                    {result.formatted_price}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Exact: ₹{result.predicted_price.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Range Bar */}
                <div className="p-3.5 rounded-lg bg-white border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between text-slate-500">
                    <span>Valuation Range (±5%)</span>
                    <span className="font-semibold text-indigo-600">Score: {result.r2_score}</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold text-slate-800">
                    <span className="text-emerald-600">{result.price_range.formatted_min}</span>
                    <span className="text-slate-400">—</span>
                    <span className="text-indigo-600">{result.price_range.formatted_max}</span>
                  </div>
                </div>

                <Button onClick={() => setIsModalOpen(false)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
                  Close & Predict Another
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 py-4 bg-white text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <p>© 2026 AutoValuate AI</p>
          <p>Developed by <strong className="text-slate-800 font-semibold">Raaghav Bisht</strong></p>
        </div>
      </footer>
    </div>
  );
}
