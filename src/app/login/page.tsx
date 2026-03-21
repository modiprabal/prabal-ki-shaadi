"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Heart, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore, UserRole } from "@/lib/authStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const login = useAuthStore((state: any) => state.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For Phase 5 mock, anyone can login as 'COUPLE' (Super Admin)
    login(email, 'COUPLE');
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[10%] left-[10%] w-64 h-64 bg-brand-peach rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-brand-mint rounded-full blur-3xl"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center">
          {/* Logo Area */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-brand-gold/20 flex items-center justify-center p-2">
              <Image src="/logo.png" alt="Logo" width={60} height={60} className="mix-blend-multiply scale-125" />
            </div>
          </div>

          <p className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3" />
            Management Portal
            <Sparkles className="w-3 h-3" />
          </p>
          <h1 className="font-serif text-3xl text-text-main mb-8">Welcome Back</h1>

          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold ml-1">Email Address</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/60" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-white/60 border border-brand-sage/30 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all placeholder:text-text-muted/40"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/60" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/60 border border-brand-sage/30 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all placeholder:text-text-muted/40"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-brand-gold hover:bg-text-main text-white rounded-2xl py-4 text-sm font-bold uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-brand-gold/20 active:scale-[0.98] mt-4"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-[11px] text-text-muted/60 flex items-center justify-center gap-2 italic">
            Celebrating Prabal <Heart className="w-3 h-3 fill-brand-gold text-brand-gold" /> Shreya
          </p>
        </div>
      </motion.div>
    </main>
  );
}
