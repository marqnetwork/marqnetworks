import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
export function AgeCalculatorPage() {
  const [dob, setDob] = useState('');
  const calc = () => {
    if (!dob) return null;
    const birth = new Date(dob); const now = new Date();
    if (isNaN(birth.getTime())) return null;
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((now.getTime() - birth.getTime()) / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < now) nextBday.setFullYear(nextBday.getFullYear() + 1);
    const daysUntilBday = Math.ceil((nextBday.getTime() - now.getTime()) / 86400000);
    return { years, months, days, totalDays, totalWeeks, totalHours, totalMinutes, daysUntilBday };
  };
  const age = calc();
  return (
    <ToolPageLayout toolId="age-calculator">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Date of Birth</label>
          <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} />
        </div>
        {age && (
          <div className="space-y-4">
            <div className="bg-[#111111] rounded-2xl border border-[#39FF14]/20 p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" />
              <p className="text-xs text-[#39FF14] uppercase tracking-wider mb-2">Your Age</p>
              <p className="text-4xl font-black text-white">{age.years} <span className="text-white/30 text-lg">years</span> {age.months} <span className="text-white/30 text-lg">months</span> {age.days} <span className="text-white/30 text-lg">days</span></p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[{ label: 'Total Days', value: age.totalDays.toLocaleString() }, { label: 'Total Weeks', value: age.totalWeeks.toLocaleString() }, { label: 'Total Hours', value: age.totalHours.toLocaleString() }, { label: 'Total Minutes', value: age.totalMinutes.toLocaleString() }].map(s => (
                <div key={s.label} className="bg-[#111111] border border-white/8 rounded-xl p-4 text-center">
                  <p className="text-lg font-black text-white">{s.value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#111111] border border-white/8 rounded-xl p-4 text-center">
              <p className="text-xs text-white/40">Next Birthday In</p>
              <p className="text-2xl font-black text-[#39FF14] mt-1">{age.daysUntilBday} days</p>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
