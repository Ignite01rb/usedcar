"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Sparkles, Car } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900">
      {/* Navbar */}
      <header className="w-full bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-slate-900 text-white">
              <Car className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 text-base tracking-tight">AutoValuate AI</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Developed by <strong className="text-slate-800 font-medium">Raaghav Bisht</strong>
            </span>
            <Link href="/dashboard">
              <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white text-xs">
                Launch Predictor
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 text-slate-800 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-slate-700" />
          <span>93.97% Accuracy • Years 2000–2026 Supported</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
          Smart Resale Price Estimator for Used Cars
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mt-4 leading-relaxed">
          Get precise market valuation estimates powered by Machine Learning. Calculate prices instantly based on brand, model, and vehicle specifications.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-8 w-full max-w-sm">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-11 px-7 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg">
              Start Price Estimation <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/Cardetails.csv" target="_blank" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-11 px-6 text-sm font-medium border-slate-300">
              <Database className="mr-2 w-4 h-4" /> Dataset
            </Button>
          </Link>
        </div>

        {/* 3 Minimal Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 w-full text-left">
          <div className="p-4 rounded-xl minimal-card bg-white">
            <div className="text-xs font-bold text-slate-900 mb-1">93.97% Accuracy</div>
            <p className="text-xs text-slate-500">Ensemble ML pipeline trained on 8,000+ Indian vehicle listings.</p>
          </div>
          <div className="p-4 rounded-xl minimal-card bg-white">
            <div className="text-xs font-bold text-slate-900 mb-1">Model & Year Precision</div>
            <p className="text-xs text-slate-500">Specific model matching for manufacturing years up to 2026.</p>
          </div>
          <div className="p-4 rounded-xl minimal-card bg-white">
            <div className="text-xs font-bold text-slate-900 mb-1">INR Currency Output</div>
            <p className="text-xs text-slate-500">Formatted price output in Lakhs / Thousands with confidence range.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 py-4 bg-white text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 AutoValuate AI</p>
          <p>Created by <strong className="text-slate-800 font-semibold">Raaghav Bisht</strong></p>
        </div>
      </footer>
    </div>
  );
}
