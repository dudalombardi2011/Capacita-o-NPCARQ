import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BrickWall, 
  ArrowDown,
  Crown,
  Zap,
  Flame,
  Rocket
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { dataService, type Trainee } from "./services/dataService";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [ranking, setRanking] = useState<Trainee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sortedData = await dataService.fetchRanking();
        setRanking(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const topThree = ranking.slice(0, 3);
  const restOfRanking = ranking.slice(3);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-brand-black">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-brand-pink border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh selection:bg-brand-pink selection:text-white">
      {/* Hero / Podium Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-pink/20 text-brand-pink text-xs font-bold uppercase tracking-widest mb-6 border border-brand-pink/30">
            <Rocket className="w-3.5 h-3.5" />
            NPCARQ Capacitação 2026
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-white mb-4 drop-shadow-[0_0_15px_rgba(255,45,133,0.5)]">
            OS MESTRES DA <br /> <span className="text-brand-purple">CONSTRUÇÃO</span>
          </h1>
          <p className="text-slate-400 font-body max-w-md mx-auto">
            Quem está empilhando mais tijolinhos nesta jornada? Confira os líderes!
          </p>
        </motion.div>

        {/* Podium */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-4 w-full max-w-5xl">
          {/* 2nd Place */}
          {topThree[1] && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ delay: 0.2 }}
              className="order-2 md:order-1 flex flex-col items-center w-full md:w-1/3"
            >
              <div className="relative mb-4">
                <img 
                  src={topThree[1].imagem} 
                  alt={topThree[1].nome}
                  className="w-24 h-24 rounded-full border-4 border-slate-400 object-cover neon-glow-purple"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(topThree[1].nome)}&background=random`;
                  }}
                />
                <div className="absolute -bottom-2 -right-2 bg-slate-400 w-8 h-8 rounded-full flex items-center justify-center text-brand-black font-bold border-2 border-brand-black">
                  2
                </div>
              </div>
              <div className="glass w-full p-6 rounded-t-3xl text-center border-b-0">
                <p className="font-bold text-lg mb-1 truncate px-2">{topThree[1].nome}</p>
                <div className="flex items-center justify-center gap-2 text-brand-pink font-display text-xl">
                  {topThree[1].pontos} <BrickWall className="w-5 h-5" />
                </div>
              </div>
              <div className="w-full h-32 bg-gradient-to-b from-slate-400/20 to-transparent rounded-b-3xl border-x border-slate-400/10" />
            </motion.div>
          )}

          {/* 1st Place */}
          {topThree[0] && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 1.1 }}
              animate={{ opacity: 1, y: 0, scale: 1.1 }}
              whileHover={{ y: -10, scale: 1.12 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
              className="order-1 md:order-2 flex flex-col items-center w-full md:w-1/3 z-10"
            >
              <div className="relative mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 text-yellow-400"
                >
                  <Crown className="w-12 h-12 fill-current" />
                </motion.div>
                <img 
                  src={topThree[0].imagem} 
                  alt={topThree[0].nome}
                  className="w-32 h-32 rounded-full border-4 border-brand-pink object-cover neon-glow-pink"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(topThree[0].nome)}&background=random`;
                  }}
                />
                <div className="absolute -bottom-2 -right-2 bg-brand-pink w-10 h-10 rounded-full flex items-center justify-center text-white font-bold border-2 border-brand-black">
                  1
                </div>
              </div>
              <div className="glass w-full p-8 rounded-t-3xl text-center border-b-0 border-brand-pink/30">
                <p className="font-bold text-2xl mb-1 truncate px-2">{topThree[0].nome}</p>
                <div className="flex items-center justify-center gap-2 text-brand-pink font-display text-3xl">
                  {topThree[0].pontos} <BrickWall className="w-6 h-6" />
                </div>
              </div>
              <div className="w-full h-48 bg-gradient-to-b from-brand-pink/20 to-transparent rounded-b-3xl border-x border-brand-pink/10" />
            </motion.div>
          )}

          {/* 3rd Place */}
          {topThree[2] && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ delay: 0.3 }}
              className="order-3 md:order-3 flex flex-col items-center w-full md:w-1/3"
            >
              <div className="relative mb-4">
                <img 
                  src={topThree[2].imagem} 
                  alt={topThree[2].nome}
                  className="w-24 h-24 rounded-full border-4 border-orange-400/50 object-cover neon-glow-purple"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(topThree[2].nome)}&background=random`;
                  }}
                />
                <div className="absolute -bottom-2 -right-2 bg-orange-400/50 w-8 h-8 rounded-full flex items-center justify-center text-brand-black font-bold border-2 border-brand-black">
                  3
                </div>
              </div>
              <div className="glass w-full p-6 rounded-t-3xl text-center border-b-0">
                <p className="font-bold text-lg mb-1 truncate px-2">{topThree[2].nome}</p>
                <div className="flex items-center justify-center gap-2 text-brand-pink font-display text-xl">
                  {topThree[2].pontos} <BrickWall className="w-5 h-5" />
                </div>
              </div>
              <div className="w-full h-24 bg-gradient-to-b from-orange-400/10 to-transparent rounded-b-3xl border-x border-orange-400/10" />
            </motion.div>
          )}
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Ver Ranking Completo</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* Full Ranking Section */}
      <main className="max-w-4xl mx-auto px-4 pb-32">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />
          <h2 className="font-display text-2xl text-white whitespace-nowrap">OUTROS PARTICIPANTES</h2>
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {restOfRanking.map((trainee, index) => (
              <motion.div 
                key={trainee.nome + index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05 }}
                className="glass p-4 rounded-2xl flex items-center justify-between group hover:bg-white/5 transition-colors border-brand-purple/10"
              >
                <div className="flex items-center gap-6">
                  <span className="font-display text-xl text-slate-600 w-8 text-center">
                    #{trainee.posicao}
                  </span>
                  <div className="relative">
                    <img 
                      src={trainee.imagem} 
                      alt={trainee.nome}
                      className="w-12 h-12 rounded-full object-cover border-2 border-brand-purple/20"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(trainee.nome)}&background=random`;
                      }}
                    />
                    {trainee.pontos > 100 && (
                      <div className="absolute -top-1 -right-1 bg-brand-pink rounded-full p-0.5">
                        <Flame className="w-3 h-3 text-white fill-current" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-white group-hover:text-brand-pink transition-colors">{trainee.nome}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">NPCARQ Trainee</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-display text-xl text-white">{trainee.pontos}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Tijolinhos</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all">
                    <BrickWall className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Fun Footer */}
        <footer className="mt-32 text-center">
          <div className="inline-flex items-center gap-4 p-8 glass rounded-[2rem] border-brand-pink/20">
            <div className="text-left">
              <h3 className="font-display text-xl text-white mb-1">QUER SUBIR NO RANKING?</h3>
              <p className="text-sm text-slate-400">Complete as missões e ganhe pontos!</p>
            </div>
            <button className="bg-brand-pink text-white p-4 rounded-2xl shadow-lg shadow-brand-pink/20 hover:scale-110 active:scale-95 transition-transform">
              <Zap className="w-6 h-6 fill-current" />
            </button>
          </div>
          <p className="mt-12 text-slate-600 text-xs font-bold uppercase tracking-widest">
            CimatecJr • NPCARQ • 2026
          </p>
        </footer>
      </main>
    </div>
  );
}
