import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
export function DateDifferenceCalculatorPage() {
  const [date1, setDate1] = useState(''); const [date2, setDate2] = useState('');
  const calc = () => {
    if (!date1 || !date2) return null;
    const d1 = new Date(date1); const d2 = new Date(date2);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
    const start = d1 < d2 ? d1 : d2; const end = d1 < d2 ? d2 : d1;
    const diffMs = end.getTime() - start.getTime();
    const totalDays = Math.floor(diffMs / 86400000);
    const totalWeeks = Math.floor(totalDays / 7); const remDays = totalDays % 7;
    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    if (days < 0) { months--; days += new Date(end.getFullYear(), end.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalHours = totalDays * 24; const totalMinutes = totalHours * 60; const totalSeconds = totalMinutes * 60;
    return { years, months, days, totalDays, totalWeeks, remDays, totalMonths, totalHours, totalMinutes, totalSeconds };
  };
  const diff = calc();
  return (
    <ToolPageLayout toolId="date-difference-calculator">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Start Date</label><input type="date" value={date1} onChange={e => setDate1(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} /></div>
            <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">End Date</label><input type="date" value={date2} onChange={e => setDate2(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} /></div>
          </div>
        </div>
        {diff && (
          <div className="space-y-4">
            <div className="bg-[#111111] rounded-2xl border border-[#39FF14]/20 p-6 text-center">
              <p className="text-xs text-[#39FF14] uppercase tracking-wider mb-2">Difference</p>
              <p className="text-3xl font-black text-white">
                {diff.years > 0 && <>{diff.years} <span className="text-white/30 text-base">year{diff.years !== 1 ? 's' : ''}</span>{' '}</>}
                {diff.months > 0 && <>{diff.months} <span className="text-white/30 text-base">month{diff.months !== 1 ? 's' : ''}</span>{' '}</>}
                {diff.days} <span className="text-white/30 text-base">day{diff.days !== 1 ? 's' : ''}</span>
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: 'Total Days', value: diff.totalDays.toLocaleString() },
                { label: 'Total Weeks', value: `${diff.totalWeeks} weeks, ${diff.remDays} days` },
                { label: 'Total Months', value: diff.totalMonths.toLocaleString() },
                { label: 'Total Hours', value: diff.totalHours.toLocaleString() },
                { label: 'Total Minutes', value: diff.totalMinutes.toLocaleString() },
                { label: 'Total Seconds', value: diff.totalSeconds.toLocaleString() },
              ].map(s => (
                <div key={s.label} className="bg-[#111111] border border-white/8 rounded-xl p-4 text-center">
                  <p className="text-lg font-black text-white">{s.value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
