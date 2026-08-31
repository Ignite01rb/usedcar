"use client";
import { Button } from "@/components/ui/button";
import { Database, ArrowRight, Car, Sparkles, TrendingUp, ShieldCheck, User, Cpu } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900">
      {/* Header Bar */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight text-base">
                AutoValuate <span className="text-indigo-600">AI</span>
              </span>
              <span className="block text-xs text-slate-500">Used Car Price Predictor</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-600">
              <User className="w-3.5 h-3.5 text-indigo-500" />
              <span>Created by <strong className="text-slate-900 font-semibold">Raaghav Bisht</strong></span>
            </div>
            <Link href="/dashboard">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                Open Predictor
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Ensemble ML Model • 93.97% Accuracy Score</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] max-w-3xl">
          Get Instant & Accurate <span className="text-indigo-600">Used Car Resale Values</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mt-5 leading-relaxed">
          Powered by an advanced Machine Learning ensemble (Random Forest + Gradient Boosting). Supports manufacturing years up to 2026 with model-specific precision.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 w-full max-w-md">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 px-7 text-base font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-200 transition-all hover:scale-[1.02] group"
            >
              Start Price Estimation
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-14 w-full text-left">
          <div className="p-5 rounded-xl custom-card custom-card-hover">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Ensemble ML Pipeline</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Log-transformed target regression pipeline trained on 8,000+ Indian vehicle listings.
            </p>
          </div>

          <div className="p-5 rounded-xl custom-card custom-card-hover">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">INR Price Formatting</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Displays price predictions formatted in Lakhs / Thousands along with valuation confidence range.
            </p>
          </div>

          <div className="p-5 rounded-xl custom-card custom-card-hover">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Brand & Model Precision</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Supports car brands and model series up to manufacturing year 2026.
            </p>
          </div>
        </div>

        {/* Quick Dataset Link */}
        <div className="mt-10">
          <Link href="/Cardetails.csv" target="_blank">
            <Button variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-slate-900">
              <Database className="w-4 h-4 text-indigo-600" />
              View Cardetails Dataset
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 py-4 bg-white text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 AutoValuate AI. All rights reserved.</p>
          <p>Designed & Developed by <strong className="text-slate-800 font-semibold">Raaghav Bisht</strong></p>
        </div>
      </footer>
    </div>
  );
}
