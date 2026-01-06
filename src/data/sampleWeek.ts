// src/data/sampleWeek.ts

import { Meal } from "../types/types";

export const sampleWeek: Meal[] = [
  {
    id: "1",
    childId: "0",
    date: "2026-01-05",
    mealType: "breakfast",
    mealName: "Oatmeal",
    components: ["Oats", "Milk", "Banana"],
    outcome: null,
  },
  {
    id: "2",
    childId: "0",
    date: "2026-01-05",
    mealType: "lunch",
    mealName: "Chicken & Veggies",
    components: ["Chicken", "Carrots", "Peas"],
    outcome: null,
  },
  {
    id: "3",
    childId: "1",
    date: "2026-01-05",
    mealType: "breakfast",
    mealName: "Yogurt & Fruit",
    components: ["Yogurt", "Strawberries", "Blueberries"],
    outcome: null,
  },
  {
    id: "4",
    childId: "1",
    date: "2026-01-05",
    mealType: "lunch",
    mealName: "Turkey Sandwich",
    components: ["Turkey", "Bread", "Lettuce"],
    outcome: null,
  },
];
