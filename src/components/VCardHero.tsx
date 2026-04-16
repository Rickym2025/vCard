import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function VCardHero() {
  return (
    <Card className="w-full min-h-[500px] bg-black/[0.96] relative overflow-hidden border-none rounded-none">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Sinistra: Testo e Intro */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Riccardo M.
          </h1>
          <p className="mt-4 text-neutral-400 max-w-lg text-lg">
            Sviluppo Soluzioni AI e Sound Design. 
            Trasformo la complessità in esperienze interattive.
          </p>
        </div>

        {/* Destra: La scena Spline Interattiva (Sostituisce il vecchio GLB) */}
        <div className="flex-1 relative min-h-[300px]">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
}