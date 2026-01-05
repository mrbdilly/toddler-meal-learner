// --------------------
// Children
// --------------------
export const children = [
  { id: "1", name: "Colette", ageMonths: 29 },
  { id: "2", name: "Sloane", ageMonths: 15 },
];

// --------------------
// Planned Meals
// --------------------
export const plannedMeals = [
  {
    id: "101",
    childId: "1",
    date: "2026-01-05",
    mealType: "breakfast",
    mealName: "Oatmeal",
    components: ["Oats", "Milk", "Banana"],
    outcome: null,
  },
  {
    id: "102",
    childId: "1",
    date: "2026-01-05",
    mealType: "lunch",
    mealName: "Chicken & Veggies",
    components: ["Chicken", "Carrot", "Peas"],
    outcome: null,
  },
  {
    id: "103",
    childId: "2",
    date: "2026-01-05",
    mealType: "breakfast",
    mealName: "Pancakes",
    components: ["Flour", "Egg", "Milk"],
    outcome: null,
  },
  {
    id: "104",
    childId: "2",
    date: "2026-01-05",
    mealType: "lunch",
    mealName: "Mac & Cheese",
    components: ["Pasta", "Cheese", "Butter"],
    outcome: null,
  },
] as const; // ✅ tell TS these are readonly literal values
