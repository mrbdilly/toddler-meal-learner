// src/types/types.ts

export type Meal = {
  id: string;                // unique ID for the meal
  childId: string;           // ID of the child who had the meal
  date: string;              // ISO date string, e.g., "2026-01-06"
  mealType: "breakfast" | "lunch" | "snack" | "dinner"; // type of meal
  mealName: string;          // name of the meal
  components: string[];      // list of meal components/ingredients
  outcome: null | string;    // optional outcome or note about the meal
};

export type Child = {
  id: string;                // unique child ID
  name: string;              // child's name
  gender: "boy" | "girl";    // gender
  age: string;               // formatted like "1y1m"
};
