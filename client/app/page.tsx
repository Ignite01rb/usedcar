"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-slate-900 px-6 py-12">
      <div className="max-w-2xl mx-auto my-auto text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
          Used Car Price Predictor
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
          Predict accurate used car market resale values using an AI prediction model.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 h-11 text-sm font-medium">
              Start Prediction →
            </Button>
          </Link>
          <Link href="/Cardetails.csv" target="_blank">
            <Button variant="outline" size="lg" className="px-6 h-11 text-sm font-medium">
              View Dataset
            </Button>
          </Link>
        </div>
      </div>

      <footer className="text-center text-xs text-slate-400 py-4">
        Created by <span className="font-medium text-slate-700">Raaghav Bisht</span>
      </footer>
    </div>
  );
}
