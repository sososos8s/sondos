export interface StudentInput {
  study_hours_per_day: number;
  sleep_hours: number;
  attendance_percentage: number;
  social_media_hours: number;
  netflix_hours: number;
  exercise_frequency: number; // days per week
  diet_quality: 'Poor' | 'Fair' | 'Good';
  mental_health_rating: number; // 1-10
  part_time_job: 'Yes' | 'No';
  extracurricular_participation: 'Yes' | 'No';
}

export interface PredictionResult {
  score: number;
  classification: 'Excellent' | 'Good' | 'Average' | 'Weak';
  insights: string;
}

export enum PerformanceColor {
  Green = 'text-emerald-600 bg-emerald-100 border-emerald-200',
  Yellow = 'text-amber-600 bg-amber-100 border-amber-200',
  Red = 'text-rose-600 bg-rose-100 border-rose-200',
  Blue = 'text-blue-600 bg-blue-100 border-blue-200',
}