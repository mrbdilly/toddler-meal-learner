"use client";

import { useState } from "react";
import { children as initialChildren, plannedMeals as initialMeals } from "../src/data/sampleWeek";

// ----------------------
// Type definitions
// ----------------------
type Child = {
  id: string;
  name: string;
  ageMonths: number;
};

type Meal = {
  id: string;
  childId: string;
  date: string;
  mealType: "breakfast" | "lunch" | "snack" | "dinner";
  mealName: string;
  components: string[];
  outcome: "most" | "some" | "little" | null;
};

type NewMealInput = {
  date: string;
  mealType: string;
  mealName: string;
  components: string;
};

export default function Home() {
  // ----------------------
  // State for meals
  // ----------------------
  const [mealStates, setMealStates] = useState<Meal[]>(
    initialMeals.map((meal) => ({
      ...meal,
      outcome: meal.outcome ?? null,
      components: [...meal.components],
    }))
  );

  // ----------------------
  // Modal and form state
  // ----------------------
  const [modalOpenForChild, setModalOpenForChild] = useState<string | null>(null);
  const [newMealInputs, setNewMealInputs] = useState<Record<string, NewMealInput>>(
    initialChildren.reduce((acc, child) => {
      acc[child.id] = { date: "", mealType: "", mealName: "", components: "" };
      return acc;
    }, {} as Record<string, NewMealInput>)
  );

  // ----------------------
  // Handlers
  // ----------------------
  const handleInputChange = (childId: string, field: keyof NewMealInput, value: string) => {
    setNewMealInputs((prev) => ({
      ...prev,
      [childId]: {
        ...prev[childId],
        [field]: value,
      },
    }));
  };

  const handleAddMeal = (childId: string) => {
    const input = newMealInputs[childId];
    if (!input || !input.date || !input.mealType || !input.mealName) {
      alert("Please fill date, meal type, and meal name");
      return;
    }

    const newMeal: Meal = {
      id: Date.now().toString(),
      childId,
      date: input.date,
      mealType: input.mealType as Meal["mealType"],
      mealName: input.mealName,
      components: input.components
        ? input.components.split(",").map((s) => s.trim())
        : [],
      outcome: null,
    };

    setMealStates((prev) => [...prev, newMeal]);

    // Reset form and close modal
    setNewMealInputs((prev) => ({
      ...prev,
      [childId]: { date: "", mealType: "", mealName: "", components: "" },
    }));
    setModalOpenForChild(null);
  };

  // ----------------------
  // Render
  // ----------------------
  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">
        Toddler Meal Planner Demo
      </h1>

      {initialChildren.map((child: Child) => (
        <section
          key={child.id}
          className="mb-6 p-6 bg-white shadow-md rounded-lg relative"
        >
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            {child.name} ({Math.floor(child.ageMonths / 12)}y {child.ageMonths % 12}m)
          </h2>

          {/* Button to open modal */}
          <button
            className="px-4 py-2 mb-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={() => setModalOpenForChild(child.id)}
          >
            Add Meal
          </button>

          {/* Modal */}
          {modalOpenForChild === child.id && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black/30"
                onClick={() => setModalOpenForChild(null)}
              ></div>

              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Add a new meal
                </h3>
                <div className="flex flex-col space-y-3">
                  <input
                    type="date"
                    value={newMealInputs[child.id]?.date || ""}
                    onChange={(e) => handleInputChange(child.id, "date", e.target.value)}
                    className="p-2 border rounded w-full text-black placeholder-gray-400"
                  />
                  <select
                    value={newMealInputs[child.id]?.mealType || ""}
                    onChange={(e) => handleInputChange(child.id, "mealType", e.target.value)}
                    className="p-2 border rounded w-full text-black placeholder-gray-400"
                  >
                    <option value="">Select meal type</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="snack">Snack</option>
                    <option value="dinner">Dinner</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Meal name"
                    value={newMealInputs[child.id]?.mealName || ""}
                    onChange={(e) => handleInputChange(child.id, "mealName", e.target.value)}
                    className="p-2 border rounded w-full text-black placeholder-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Components (comma-separated)"
                    value={newMealInputs[child.id]?.components || ""}
                    onChange={(e) =>
                      handleInputChange(child.id, "components", e.target.value)
                    }
                    className="p-2 border rounded w-full text-black placeholder-gray-400"
                  />

                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                      onClick={() => setModalOpenForChild(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                      onClick={() => handleAddMeal(child.id)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Meal List */}
          <ul className="list-disc list-inside space-y-2">
            {mealStates
              .filter((meal) => meal.childId === child.id)
              .map((meal) => (
                <li
                  key={meal.id}
                  className="flex items-center justify-between text-gray-700"
                >
                  <div>
                    <span className="font-medium">{meal.date} - {meal.mealType}:</span>{" "}
                    {meal.mealName}{" "}
                    <span className="italic text-gray-500">({meal.components.join(", ")})</span>
                  </div>

                  <div className="space-x-2">
                    {["most", "some", "little"].map((option) => (
                      <button
                        key={option}
                        className={`px-2 py-1 rounded text-white ${
                          meal.outcome === option
                            ? option === "most"
                              ? "bg-green-600"
                              : option === "some"
                              ? "bg-yellow-500"
                              : "bg-red-600"
                            : "bg-gray-400 hover:bg-gray-500"
                        }`}
                        onClick={() =>
                          setMealStates((prev) =>
                            prev.map((m) =>
                              m.id === meal.id
                                ? { ...m, outcome: option as "most" | "some" | "little" }
                                : m
                            )
                          )
                        }
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
