import React from 'react';
import { StudentInput } from '../types';
import { Clock, Moon, CalendarCheck, Smartphone, Tv, Activity, Heart, Briefcase, Users, Utensils } from 'lucide-react';

interface InputFormProps {
  input: StudentInput;
  onChange: (key: keyof StudentInput, value: string | number) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ input, onChange, onSubmit, isLoading }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
      <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
        <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg">
          <Activity size={20} />
        </span>
        Student Metrics Input
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Study Hours */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Clock size={16} className="text-blue-500" /> Daily Study Hours
          </label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={input.study_hours_per_day}
            onChange={(e) => onChange('study_hours_per_day', parseFloat(e.target.value))}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Attendance */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <CalendarCheck size={16} className="text-green-500" /> Attendance Percentage (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={input.attendance_percentage}
            onChange={(e) => onChange('attendance_percentage', parseFloat(e.target.value))}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Sleep Hours */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Moon size={16} className="text-indigo-500" /> Sleep Hours
          </label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={input.sleep_hours}
            onChange={(e) => onChange('sleep_hours', parseFloat(e.target.value))}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Social Media */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Smartphone size={16} className="text-pink-500" /> Social Media Hours
          </label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={input.social_media_hours}
            onChange={(e) => onChange('social_media_hours', parseFloat(e.target.value))}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

         {/* Netflix */}
         <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Tv size={16} className="text-red-500" /> Entertainment/Netflix Hours
          </label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={input.netflix_hours}
            onChange={(e) => onChange('netflix_hours', parseFloat(e.target.value))}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Mental Health */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Heart size={16} className="text-rose-400" /> Mental Focus Level (1-10)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={input.mental_health_rating}
            onChange={(e) => onChange('mental_health_rating', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="text-right text-sm text-slate-500">{input.mental_health_rating}/10</div>
        </div>

        {/* Diet Quality */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Utensils size={16} className="text-orange-500" /> Diet Quality
          </label>
          <select
            value={input.diet_quality}
            onChange={(e) => onChange('diet_quality', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
          >
            <option value="Poor">Poor</option>
            <option value="Fair">Fair</option>
            <option value="Good">Good</option>
          </select>
        </div>

        {/* Part Time Job */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Briefcase size={16} className="text-slate-600" /> Part Time Job?
          </label>
          <select
            value={input.part_time_job}
            onChange={(e) => onChange('part_time_job', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading}
        className={`w-full py-3.5 px-6 rounded-xl text-white font-semibold text-lg shadow-lg transition-all transform active:scale-[0.98]
          ${isLoading 
            ? 'bg-slate-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/25'
          }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing Regression Model...
          </span>
        ) : (
          'Predict Final Grade'
        )}
      </button>
    </div>
  );
};

export default InputForm;