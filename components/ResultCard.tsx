import React from 'react';
import { PredictionResult, PerformanceColor } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import { Award, TrendingUp, BookOpen, AlertCircle, Download, Printer } from 'lucide-react';

interface ResultCardProps {
  result: PredictionResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const getColor = (classification: string) => {
    switch (classification) {
      case 'Excellent': return PerformanceColor.Green;
      case 'Good': return PerformanceColor.Blue;
      case 'Average': return PerformanceColor.Yellow;
      default: return PerformanceColor.Red;
    }
  };

  const getBaseColorHex = (classification: string) => {
    switch (classification) {
      case 'Excellent': return '#10b981';
      case 'Good': return '#3b82f6';
      case 'Average': return '#f59e0b';
      default: return '#f43f5e';
    }
  };

  const colorClass = getColor(result.classification);
  const baseColor = getBaseColorHex(result.classification);

  const chartData = [
    { name: 'Average Class Score', score: 72 }, // Hardcoded average for context
    { name: 'Predicted Score', score: result.score },
  ];

  const gaugeData = [
    { name: 'Score', value: result.score },
    { name: 'Remaining', value: 100 - result.score },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className={`p-6 border-b border-slate-100 ${colorClass.split(' ')[1]} flex justify-between items-center`}>
        <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Award size={24} className={colorClass.split(' ')[0]} />
          Prediction Results
        </h2>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 text-xs font-medium bg-white/60 hover:bg-white/90 text-slate-700 px-3 py-1.5 rounded-lg transition-colors border border-black/5 print:hidden"
        >
          <Printer size={14} />
          Save Report
        </button>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Score Display */}
        <div className="text-center">
          <div className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Final Predicted Grade</div>
          <div className={`text-6xl font-bold mb-2 ${colorClass.split(' ')[0]}`}>
            {result.score.toFixed(1)}
          </div>
          <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold border ${colorClass}`}>
            {result.classification} Performance
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          
          {/* Gauge Chart */}
          <div className="h-48 relative flex flex-col items-center justify-center">
             <h3 className="text-xs font-semibold text-slate-400 uppercase mb-4">Score Distribution</h3>
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={gaugeData}
                   cx="50%"
                   cy="50%"
                   startAngle={180}
                   endAngle={0}
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   <Cell key="cell-0" fill={baseColor} />
                   <Cell key="cell-1" fill="#e2e8f0" />
                 </Pie>
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute top-28 text-slate-400 text-xs">0 - 100 Scale</div>
          </div>

          {/* Comparison Bar Chart */}
          <div className="h-48">
            <h3 className="text-xs font-semibold text-slate-400 uppercase mb-4 text-center">Class Comparison</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 10}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <ReferenceLine x={72} stroke="#cbd5e1" strokeDasharray="3 3" />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                   {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === 'Predicted Score' ? baseColor : '#94a3b8'} />
                   ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights Section */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
           <h3 className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
             <BookOpen size={16} className="text-indigo-500" />
             Analysis Insight
           </h3>
           <p className="text-slate-600 text-sm leading-relaxed">
             {result.insights}
           </p>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 text-xs text-slate-400 mt-4">
           <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
           <p>
             Predictions are generated based on historical data regression patterns using Linear Regression and Random Forest algorithms. Actual results may vary based on external factors not captured in this model.
           </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;