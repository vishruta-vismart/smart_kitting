"use client";

import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Users, Package, CheckCircle2, AlertTriangle, Activity } from "lucide-react";

const kpi = [
  { label: "Active Operators", value: 8, icon: Users, gradient: "from-indigo-500 to-purple-500" },
  { label: "Kits in Progress", value: 24, icon: Package, gradient: "from-sky-500 to-cyan-500" },
  { label: "Kits Completed Today", value: 312, icon: CheckCircle2, gradient: "from-emerald-500 to-lime-500" },
  { label: "Error Rate", value: "0.12%", icon: AlertTriangle, gradient: "from-rose-500 to-orange-500" },
];

const throughput = [
  { time: "8", kits: 22 },
  { time: "9", kits: 34 },
  { time: "10", kits: 48 },
  { time: "11", kits: 62 },
  { time: "12", kits: 70 },
  { time: "1", kits: 75 },
  { time: "2", kits: 68 },
  { time: "3", kits: 44 },
  { time: "4", kits: 30 },
];

const errorTrend = [
  { day: "D1", err: 5 },
  { day: "D2", err: 3 },
  { day: "D3", err: 4 },
  { day: "D4", err: 2 },
  { day: "D5", err: 1 },
];

const operators = [
  { name: "Operator A", score: 92 },
  { name: "Operator B", score: 85 },
  { name: "Operator C", score: 71 },
];

export default function SmartKittingDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10"><Activity /></div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Smart Kitting Dashboard</h1>
              <p className="text-sm text-slate-300">Real-time operations overview</p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300">Live (Demo)</span>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpi.map((k, i) => {
            const Icon = k.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`relative overflow-hidden rounded-2xl p-5 shadow-lg bg-gradient-to-r ${k.gradient}`}
              >
                <div className="absolute -right-6 -top-6 opacity-20">
                  <Icon size={96} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white/80 text-sm">{k.label}</div>
                    <div className="text-3xl font-bold mt-1">{k.value}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/20"><Icon /></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts with 3D Effect */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur rounded-2xl shadow p-5 h-[360px]"
          >
            <h2 className="font-medium mb-3">Hourly Throughput</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={throughput} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#1e40af" />
                  </linearGradient>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="4" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.6" />
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fill: '#e5e7eb' }} axisLine={{ stroke: '#475569' }} />
                <YAxis tick={{ fill: '#e5e7eb' }} axisLine={{ stroke: '#475569' }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const key = payload[0].dataKey;
                      const isThroughput = key === 'kits';
                      return (
                        <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 shadow-xl text-sm">
                          <p className="text-slate-300">{isThroughput ? 'Time' : 'Day'}: <span className="text-white">{label}</span></p>
                          <p className={isThroughput ? 'text-sky-400 font-semibold' : 'text-rose-400 font-semibold'}>
                            {isThroughput ? 'Kits Picked' : 'Errors Detected'}: {payload[0].value}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="kits"
                  fill="url(#barGlow)"
                  radius={[8, 8, 0, 0]}
                  isAnimationActive
                  filter="url(#shadow)"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur rounded-2xl shadow p-5 h-[360px]"
          >
            <h2 className="font-medium mb-3">Error Rate Trend</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={errorTrend} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f87171" />
                    <stop offset="100%" stopColor="#7f1d1d" />
                  </linearGradient>
                  <filter id="lineShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="3" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.6" />
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fill: '#e5e7eb' }} axisLine={{ stroke: '#475569' }} />
                <YAxis tick={{ fill: '#e5e7eb' }} axisLine={{ stroke: '#475569' }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const key = payload[0].dataKey;
                      const isThroughput = key === 'kits';
                      return (
                        <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 shadow-xl text-sm">
                          <p className="text-slate-300">{isThroughput ? 'Time' : 'Day'}: <span className="text-white">{label}</span></p>
                          <p className={isThroughput ? 'text-sky-400 font-semibold' : 'text-rose-400 font-semibold'}>
                            {isThroughput ? 'Kits Picked' : 'Errors Detected'}: {payload[0].value}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="err"
                  stroke="url(#lineGlow)"
                  strokeWidth={4}
                  dot={{ r: 6 }}
                  activeDot={{ r: 9 }}
                  filter="url(#lineShadow)"
                  isAnimationActive
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Operator Performance */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur rounded-2xl shadow p-5"
        >
          <h2 className="font-medium mb-4">Operator Performance</h2>
          <div className="space-y-3">
            {operators.map((op) => (
              <div key={op.name} className="flex items-center gap-4">
                <div className="w-32 text-sm text-slate-200">{op.name}</div>
                <div className="flex-1 bg-slate-700/50 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${op.score}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-sky-400 to-indigo-500"
                  />
                </div>
                <div className="w-12 text-sm text-right text-slate-200">{op.score}%</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
