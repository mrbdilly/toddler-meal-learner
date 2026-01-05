export type Child = {
  id: string;
  name: string;
  ageMonths: number;
};

export type PlannedMeal = {
  id: string;
  childId: string;
  date: string; // e.g., "2026-01-05"
  mealType: "breakfast" | "lunch" | "dinner";
  mealName: string; // e.g., "chicken + rice"
  components: string[]; // e.g., ["chicken", "rice", "broccoli"]
};

export type MealOutcome = {
  plannedMealId: string;
  overallResult: "ate_most" | "ate_some" | "ate_little";
  componentsEaten: string[];
};

export type SnackFallback = {
  plannedMealId: string;
  snackType: string; // e.g., "yogurt pouch"
  timing: "during" | "after";
};
