// src/types/types.ts

// Represents a single meal
export type Meal = {
  id: string;           // unique identifier for the meal
  name: string;         // name of the meal
  calories: number;     // optional calorie count
  time?: string;        // optional time, e.g., "Breakfast"
  notes?: string;       // optional notes
};

// Optional: represents a day of meals
export type Day = {
  date: string;         // e.g., "2026-01-06"
  meals: Meal[];        // array of meals for the day
};

// Optional: represents a week of meals
export type Week = {
  days: Day[];
};
