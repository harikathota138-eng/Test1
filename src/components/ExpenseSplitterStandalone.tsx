import React, { useState } from 'react';
import { DollarSign, Plus, Trash2, Users, IndianRupee, PieChart, Sparkles } from 'lucide-react';
import { ExpenseItem } from '../types/trip';

export const ExpenseSplitterStandalone: React.FC = () => {
  const [travelersCount, setTravelersCount] = useState<number>(6);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: '1', description: 'Beachside Villa / Resort Stay', amount: 8000, paidBy: 'Traveler 1', category: 'Stay', date: 'Day 1' },
    { id: '2', description: 'Train / Sleeper Tickets', amount: 4800, paidBy: 'Traveler 2', category: 'Transport', date: 'Day 1' },
    { id: '3', description: 'Seafood Shack Dinner & Shakes', amount: 2400, paidBy: 'Traveler 3', category: 'Food', date: 'Day 2' },
    { id: '4', description: 'Scooters Rental & Petrol', amount: 1800, paidBy: 'Traveler 1', category: 'Transport', date: 'Day 2' },
    { id: '5', description: 'Scuba Diving & Watersports', amount: 3600, paidBy: 'Traveler 4', category: 'Activities', date: 'Day 3' }
  ]);

  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState('Traveler 1');
  const [category, setCategory] = useState<'Transport' | 'Stay' | 'Food' | 'Activities' | 'Shopping' | 'Other'>('Food');

  const members = Array.from({ length: travelersCount }, (_, i) => `Traveler ${i + 1}`);

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const costPerPerson = Math.round(totalExpense / Math.max(1, travelersCount));

  const memberStats = members.map(member => {
    const paid = expenses
      .filter(e => e.paidBy === member)
      .reduce((acc, e) => acc + e.amount, 0);
    const balance = paid - costPerPerson;
    return { member, paid, balance };
  });

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!desc.trim() || isNaN(val) || val <= 0) return;

    const newExp: ExpenseItem = {
      id: `exp-${Date.now()}`,
      description: desc.trim(),
      amount: Math.round(val),
      paidBy: payer,
      category,
      date: 'Today'
    };

    setExpenses([newExp, ...expenses]);
    setDesc('');
    setAmount('');
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Fair & Transparent Group Accounting</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Group Travel Expense Splitter
        </h1>
        <p className="mt-2 text-slate-600 text-sm">
          Track shared vacation bills, dining tabs, car rentals, and calculate exactly who owes whom in seconds.
        </p>
      </div>

      {/* Summary Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Total Group Expense</span>
          <span className="text-3xl font-black text-slate-900">₹{totalExpense.toLocaleString('en-IN')}</span>
          <span className="text-xs text-slate-500 block mt-1">{expenses.length} bills recorded</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Group Members</span>
          <div className="flex items-center justify-center gap-3 my-1">
            <button
              onClick={() => setTravelersCount(Math.max(2, travelersCount - 1))}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
            >
              -
            </button>
            <span className="text-2xl font-black text-slate-900">{travelersCount}</span>
            <button
              onClick={() => setTravelersCount(travelersCount + 1)}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
            >
              +
            </button>
          </div>
          <span className="text-xs text-slate-500 block">Travelers in group</span>
        </div>

        <div className="bg-teal-50 p-6 rounded-3xl border border-teal-200 shadow-xs text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block mb-1">Equal Share Per Person</span>
          <span className="text-3xl font-black text-teal-950">₹{costPerPerson.toLocaleString('en-IN')}</span>
          <span className="text-xs text-teal-700 block mt-1">Split evenly across all {travelersCount}</span>
        </div>
      </div>

      {/* Settlement Balances Grid */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-teal-600" />
          Individual Settlement Balances
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {memberStats.map(({ member, paid, balance }) => (
            <div key={member} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="text-xs font-bold text-slate-800 block">{member}</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Paid: ₹{paid.toLocaleString('en-IN')}</span>
              <span className={`text-xs font-extrabold mt-1.5 block ${
                balance > 0 ? 'text-emerald-700' : balance < 0 ? 'text-rose-600' : 'text-slate-400'
              }`}>
                {balance > 0 ? `Gets ₹${balance}` : balance < 0 ? `Owes ₹${Math.abs(balance)}` : 'Settled'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Expense Form & List */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-teal-600" />
          Log a New Vacation Expense
        </h2>

        <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="sm:col-span-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Item Title</label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="e.g. Scuba diving, Ferry tickets, Dinner"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 1500"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Paid By</label>
            <div className="flex gap-2">
              <select
                value={payer}
                onChange={(e) => setPayer(e.target.value)}
                className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
              >
                {members.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs cursor-pointer shrink-0"
              >
                Add
              </button>
            </div>
          </div>
        </form>

        {/* Expense Rows */}
        <div className="divide-y divide-slate-100">
          {expenses.map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                  {item.category}
                </span>
                <div>
                  <span className="font-semibold text-slate-900 text-sm block">{item.description}</span>
                  <span className="text-xs text-slate-400">Paid by {item.paidBy}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-extrabold text-slate-900 text-base">₹{item.amount.toLocaleString('en-IN')}</span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                  title="Remove expense"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
