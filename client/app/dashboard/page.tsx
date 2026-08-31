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
      name: "",
      model: "",
      year: "",
      km_driven: "",
      fuel: "",
      seller_type: "",
      transmission: "",
      owner: "",
      mileage: "",
      engine: "",
      max_power: "",
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
      setErrorMsg(err?.response?.data?.error || "Could not connect to API. Ensure backend app.py is running on http://127.0.0.1:5001");
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen bg-slate-50/50 text-slate-900 p-6 md:p-10">
      <main className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
              ← Back to Home
            </Button>
          </Link>
          <span className="text-xs text-slate-400">
            Created by <strong className="text-slate-700 font-medium">Raaghav Bisht</strong>
          </span>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {errorMsg}
          </div>
        )}

        {/* Main Clean Form Card */}
        <Card className="p-6 md:p-8 bg-white border border-slate-200 shadow-sm rounded-xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Used Car Price Predictor
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Enter vehicle parameters to estimate market price.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handlePredict)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-slate-700">Car Brand</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 text-sm border-slate-200">
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
                          className="h-10 text-sm border-slate-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-slate-700">Year (Up to 2026)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 text-sm border-slate-200">
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-56">
                          {generateYearOptions().map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
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
                          placeholder="e.g., 45000"
                          className="h-10 text-sm border-slate-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fuel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-slate-700">Fuel Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 text-sm border-slate-200">
                            <SelectValue placeholder="Select fuel type" />
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
                  name="seller_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-slate-700">Seller Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 text-sm border-slate-200">
                            <SelectValue placeholder="Select seller type" />
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
                  name="transmission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-slate-700">Transmission</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 text-sm border-slate-200">
                            <SelectValue placeholder="Select transmission" />
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
                  name="owner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-slate-700">Owner History</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 text-sm border-slate-200">
                            <SelectValue placeholder="Select owner history" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="First Owner">First Owner</SelectItem>
                          <SelectItem value="Second Owner">Second Owner</SelectItem>
                          <SelectItem value="Third Owner">Third Owner</SelectItem>
                          <SelectItem value="Fourth & Above Owner">Fourth & Above</SelectItem>
                        </SelectContent>
                      </Select>
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
                          placeholder="e.g., 20"
                          className="h-10 text-sm border-slate-200"
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
                      <FormLabel className="text-xs font-semibold text-slate-700">Engine (cc)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 1500"
                          className="h-10 text-sm border-slate-200"
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
                      <FormLabel className="text-xs font-semibold text-slate-700">Max Power (bhp)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="e.g., 100"
                          className="h-10 text-sm border-slate-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg"
                >
                  {isLoading ? "Predicting..." : "Predict Price"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>

        {/* Prediction Result Dialog */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Predicted Car Price</DialogTitle>
            </DialogHeader>
            {result && (
              <div className="py-4 text-center space-y-4">
                <div>
                  <div className="text-4xl font-extrabold text-slate-900 py-1">
                    {result.formatted_price}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Exact: ₹{result.predicted_price.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="p-3 bg-slate-100 rounded-lg text-xs flex justify-between items-center text-slate-600">
                  <span>Model Accuracy (R² Score)</span>
                  <span className="font-semibold text-slate-900">{result.r2_score}</span>
                </div>
                <Button onClick={() => setIsModalOpen(false)} className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
