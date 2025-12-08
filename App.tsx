import React, { useState } from 'react';
import { StudentInput, PredictionResult } from './types';
import InputForm from './components/InputForm';
import ResultCard from './components/ResultCard';
import { getStudentPrediction } from './services/predictionService';
import { GraduationCap, BarChart2 } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  // Default values matching a "standard" student from the dataset
  const [input, setInput] = useState<StudentInput>({
    study_hours_per_day: 3,
    sleep_hours: 7,
    attendance_percentage: 85,
    social_media_hours: 2,
    netflix_hours: 1,
    exercise_frequency: 3,
    diet_quality: 'Fair',
    mental_health_rating: 7,
    part_time_job: 'No',
    extracurricular_participation: 'No'
  });

  const handleInputChange = (key: keyof StudentInput, value: string | number) => {
    setInput(prev => ({ ...prev, [key]: value }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setResult(null); // Clear previous result to show transition
    try {
      // Simulate a small delay for "calculation" feel if the API is too fast
      // This enhances the user perception of "processing" complex algorithms
      const predictionPromise = getStudentPrediction(input);
      const minDelayPromise = new Promise(resolve => setTimeout(resolve, 1500));
      
      const [prediction] = await Promise.all([predictionPromise, minDelayPromise]);
      setResult(prediction);
    } catch (error) {
      console.error("Error predicting:", error);
      alert("An error occurred while calculating the prediction. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 1. Header Section */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 leading-tight">Student Performance Analytics</h1>
              <p className="text-xs text-slate-500 font-medium">Academic Outcome Regression Analysis System</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-slate-600 text-sm font-medium bg-slate-100 px-3 py-1.5 rounded-full">
            <BarChart2 size={16} />
            Statistical Analysis Tool v2.1
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 2. Input Section */}
          <div id="input-section" className="lg:col-span-7 space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
              <p className="text-blue-800 text-sm">
                <strong>Instructions:</strong> Enter the student's behavioral data below. The system will apply regression analysis on historical records to forecast the final exam grade.
              </p>
            </div>
            
            <InputForm 
              input={input} 
              onChange={handleInputChange} 
              onSubmit={handlePredict} 
              isLoading={loading} 
            />
          </div>

          {/* 4. Output Section (Sticky on Desktop) */}
          <div id="result-section" className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            {result ? (
              <ResultCard result={result} />
            ) : (
              // Empty State Placeholder
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center h-full flex flex-col items-center justify-center min-h-[300px]">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                  <BarChart2 size={32} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Ready to Analyze</h3>
                <p className="text-slate-500 text-sm max-w-xs mx-auto">
                  Enter student details on the left and click "Predict Final Grade" to view the calculated outcome and performance classification.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 6. Information Section */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Methodology</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                This system utilizes statistical regression methods (Linear Regression, Random Forest, Support Vector Regressor) to correlate input variables such as study duration and attendance with academic success probabilities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">User Guide</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Enter the required student metrics. The system processes these inputs through the pre-trained regression model to output a projected final grade and performance category based on historical data patterns.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
             <p className="text-xs text-slate-400">© 2024 Educational Data Analytics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;