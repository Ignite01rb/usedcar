"use client";
import { Button } from "@/components/ui/button";
import { Database, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Used Car Price Predictor
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get accurate market value estimates for your used car using AI-powered prediction model.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="text-lg h-12 px-8 transition-all duration-300 hover:scale-105 group"
            >
              Start Prediction
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-6 mt-12">
          <Link href="/Cardetails.csv" target="_blank">
            <Button
              variant="ghost"
              className="gap-2 transition-colors duration-200"
            >
              <Database className="w-5 h-5" />
              Dataset
            </Button>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground pt-4">
          Created by <span className="font-semibold text-foreground">Raaghav Bisht</span>
        </p>
      </div>
    </div>
  );
}
