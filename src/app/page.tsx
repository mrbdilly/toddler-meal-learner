"use client";

import { useState } from "react";
import { Meal } from "../../types/types"; // relative path from src/app/page.tsx
import { sampleWeek } from "../data/sampleWeek";
export default function Home() {
  // --- Onboarding / Welcome ---
  const [showWelcome, setShowWelcome] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // --- Onboarding state ---
  const [numChildren, setNumChildren] = useState<number | null>(null);
  const [childGenders, setChildGenders] = useState<("male" | "female" | null)[]>([]);
  const [children, setChildren] = useState<{ id: string; name: string; gender: "male" | "female" | null; age: string }[]>([]);
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("1m");
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [confirmation, setConfirmation] = useState("");

  // --- Meals state ---
  const [meals, setMeals] = useState<Meal[]>(sampleWeek);
  const [selectedChildId, setSelectedChildId] = useState<string>("");
  const [mealType, setMealType] = useState<Meal["mealType"]>("breakfast");
  const [mealName, setMealName] = useState("");
  const [components, setComponents] = useState("");
  const [mealDate, setMealDate] = useState<string>(new Date().toISOString().split("T")[0]);

  // --- Handlers ---
  const startOnboarding = () => {
    setShowWelcome(false);
    setShowOnboarding(true);
  };

  const selectNumChildren = (count: number) => {
    setNumChildren(count);
    setChildGenders(Array(count).fill(null));
  };

  const setGender = (index: number, gender: "male" | "female") => {
    const newGenders = [...childGenders];
    newGenders[index] = gender;
    setChildGenders(newGenders);
  };

  const addChildName = () => {
    if (childName.trim() === "") return;
    const gender = childGenders[currentNameIndex];
    const newId = (children.length + 1).toString();
    const newChild = { id: newId, name: childName.trim(), gender, age: childAge };
    setChildren([...children, newChild]);
    setConfirmation(`Thanks! ${childName.trim()} has been added.`);
    setChildName("");
    setChildAge("1m");
    setCurrentNameIndex(currentNameIndex + 1);

    if (currentNameIndex + 1 >= (numChildren ?? 0)) {
      setShowOnboarding(false);
      setSelectedChildId(newId);
    }
  };

  const addMeal = () => {
    if (!selectedChildId || !mealName.trim() || !mealDate) return;
    const newMeal: Meal = {
      id: (meals.length + 1).toString(),
      childId: selectedChildId,
      date: mealDate,
      mealType,
      mealName: mealName.trim(),
      components: components.split(",").map((c) => c.trim()).filter((c) => c !== ""),
      outcome: null,
    };
    setMeals([...meals, newMeal]);
    setComponents("");
    setMealDate(new Date().toISOString().split("T")[0]);
  };

  const mealTypeColors: Record<Meal["mealType"], string> = {
    breakfast: "bg-yellow-200 text-yellow-800",
    lunch: "bg-green-200 text-green-800",
    snack: "bg-blue-200 text-blue-800",
    dinner: "bg-pink-200 text-pink-800",
  };

  const getAISuggestions = (childId: string) => {
    const childMeals = meals.filter((m) => m.childId === childId);
    if (childMeals.length === 0) return ["No meals yet."];
    const suggestions: string[] = [];
    childMeals.forEach((m) => {
      if (!m.components.includes("Vegetables")) suggestions.push(`⚠️ Consider adding vegetables to ${m.mealType} "${m.mealName}"`);
    });
    return suggestions;
  };

  const ageOptions: string[] = [];
  for (let m = 1; m <= 12; m++) ageOptions.push(`${m}m`);
  for (let y = 1; y <= 5; y++) {
    for (let m = 1; m <= 12; m++) {
      const totalMonths = y * 12 + m;
      if (totalMonths > 60) break;
      ageOptions.push(`${y}y${m}m`);
    }
  }

  // --- Dynamic onboarding header ---
  const getOnboardingHeader = () => {
    if (showWelcome) return ""; 
    if (numChildren === null) return "How many children do you have?";
    if (numChildren !== null && children.length < numChildren && childGenders[currentNameIndex] === null)
      return "Select the gender";

    if (numChildren !== null && children.length < numChildren && childGenders[currentNameIndex] !== null) {
      const gender = childGenders[currentNameIndex];
      if (gender === "male") return "What is your son's name and age?";
      if (gender === "female") return "What is your daughter's name and age?";
      return "Enter name + age";
    }

    return "";
  };

  // --- Progress step calculation ---
  const getCurrentStep = () => {
    if (showWelcome) return 0;
    if (numChildren === null) return 1;
    if (numChildren !== null && children.length < numChildren && childGenders[currentNameIndex] === null) return 2;
    if (numChildren !== null && children.length < numChildren && childGenders[currentNameIndex] !== null) return 3;
    return 3;
  };

  return (
    <div className="min-h-screen p-6 flex justify-center items-center bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100">
      <div className="w-full max-w-3xl space-y-6">

        {/* --- Welcome Screen --- */}
        {showWelcome && (
          <div className="bg-white p-12 rounded-xl shadow-lg flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-black">
              Welcome to your AI-powered Toddler Meal Planner!
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Plan meals, track intake, and get AI-based suggestions tailored to your children.
            </p>
            <button
              onClick={startOnboarding}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
            >
              Get started
            </button>
          </div>
        )}

        {/* --- Onboarding --- */}
        {showOnboarding && (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            {/* Stepper / Progress */}
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-2 rounded-full ${getCurrentStep() >= step ? "bg-blue-500" : "bg-gray-300"}`}
                />
              ))}
            </div>

            {/* Confirmation message */}
            {confirmation && (
              <div className="text-green-600 font-semibold mb-2">{confirmation}</div>
            )}

            <h2 className="text-2xl font-bold mb-4 text-black">{getOnboardingHeader()}</h2>

            {/* Step 1: Number of children */}
            {numChildren === null && (
              <div className="flex gap-4 justify-center">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => selectNumChildren(n)}
                    className="flex flex-col items-center p-4 border rounded hover:bg-gray-100 transition"
                  >
                    <span className="text-4xl">👤</span>
                    <span className="mt-1 text-black">{n}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Gender selection */}
            {numChildren !== null && children.length < numChildren && childGenders[currentNameIndex] === null && (
              <div className="flex gap-4 justify-center mt-4">
                <button
                  onClick={() => setGender(currentNameIndex, "male")}
                  className="flex flex-col items-center p-4 border rounded hover:bg-blue-100 transition"
                >
                  <span className="text-4xl">👦</span>
                  <span className="mt-1 text-black">Boy</span>
                </button>
                <button
                  onClick={() => setGender(currentNameIndex, "female")}
                  className="flex flex-col items-center p-4 border rounded hover:bg-pink-100 transition"
                >
                  <span className="text-4xl">👧</span>
                  <span className="mt-1 text-black">Girl</span>
                </button>
              </div>
            )}

            {/* Step 3: Name + Age input */}
            {numChildren !== null && children.length < numChildren && childGenders[currentNameIndex] !== null && (
              <div className="mt-4 flex gap-2 justify-center items-center">
                <input
                  type="text"
                  placeholder="Child name"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="border rounded px-3 py-2 w-48 bg-white text-black"
                />
                <select
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  className="border rounded px-3 py-2 bg-white text-black"
                >
                  {ageOptions.map((age) => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </select>
                <button
                  onClick={addChildName}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- Meal Planner + AI Suggestions remain unchanged --- */}
        {!showOnboarding && children.length > 0 && (
          <>
            {/* Add Meal Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-black">🍽 Add Meal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <select
                  value={selectedChildId}
                  onChange={(e) => setSelectedChildId(e.target.value)}
                  className="border rounded px-3 py-2 bg-white text-black"
                >
                  <option value="">Select Child</option>
                  {children.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value as Meal["mealType"])}
                  className="border rounded px-3 py-2 bg-white text-black"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="snack">Snack</option>
                  <option value="dinner">Dinner</option>
                </select>
                <input
                  type="text"
                  placeholder="Meal name"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  className="border rounded px-3 py-2 bg-white text-black"
                />
                <input
                  type="text"
                  placeholder="Components (comma separated)"
                  value={components}
                  onChange={(e) => setComponents(e.target.value)}
                  className="border rounded px-3 py-2 bg-white text-black"
                />
                <input
                  type="date"
                  value={mealDate}
                  onChange={(e) => setMealDate(e.target.value)}
                  className="border rounded px-3 py-2 bg-white text-black"
                />
              </div>
              <button
                onClick={addMeal}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Save Meal
              </button>
            </div>

            {/* Meals List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-black">📋 Meals</h2>
              <div className="space-y-2">
                {children.map((child) => (
                  <div key={child.id} className="mb-2">
                    <h3 className="font-semibold text-lg text-black">{child.name} ({child.age})</h3>
                    <ul className="space-y-1">
                      {meals.filter((m) => m.childId === child.id).map((meal) => (
                        <li key={meal.id} className="flex items-center gap-2">
                          <span className={`${mealTypeColors[meal.mealType]} px-2 py-1 rounded text-sm font-semibold`}>
                            {meal.mealType}
                          </span>
                          <span className="text-black font-medium">{meal.mealName}</span>
                          <span className="text-gray-600">({meal.date})</span>
                          <span className="text-gray-700">[{meal.components.join(", ")}]</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-black">💡 AI Suggestions</h2>
              {children.map((child) => (
                <div key={child.id} className="mb-4 p-3 bg-gray-50 rounded">
                  <strong className="block mb-1 text-black">{child.name}:</strong>
                  <ul className="list-disc pl-5 text-black">
                    {getAISuggestions(child.id).map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
