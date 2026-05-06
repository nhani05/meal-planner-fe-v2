import { createContext, useContext, useState, useEffect } from 'react';
import { mockUser, mockMeals, mockNutrition, mockWeeklyCalories, mockRecipes, mockWeekPlan } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Load initial state from mock data (or localStorage in the future)
  const [user, setUser] = useState(mockUser);
  const [meals, setMeals] = useState(mockMeals);
  const [nutrition, setNutrition] = useState(mockNutrition);
  const [weeklyCalories, setWeeklyCalories] = useState(mockWeeklyCalories);
  const [recipes] = useState(mockRecipes);
  const [weekPlan, setWeekPlan] = useState(mockWeekPlan);

  // Derived state: Total calories for today
  const [todayCalories, setTodayCalories] = useState(0);

  useEffect(() => {
    const total = Object.values(meals).reduce((sum, meal) => sum + (meal?.calories || 0), 0);
    setTodayCalories(total);
    
    // Update nutrition object's current calories
    setNutrition(prev => ({
      ...prev,
      calories: { ...prev.calories, current: total }
    }));
  }, [meals]);

  const addMeal = (type, mealData) => {
    setMeals(prev => ({
      ...prev,
      [type.toLowerCase()]: mealData
    }));
  };

  const updateWater = (cups) => {
    setNutrition(prev => ({
      ...prev,
      water: { ...prev.water, current: cups }
    }));
  };

  const addToPlan = (day, mealName, slotIndex) => {
    setWeekPlan(prev => {
      const newPlan = { ...prev };
      if (!newPlan[day]) newPlan[day] = [null, null, null];
      newPlan[day][slotIndex] = mealName;
      return newPlan;
    });
  };

  const value = {
    user,
    meals,
    nutrition,
    weeklyCalories,
    recipes,
    weekPlan,
    todayCalories,
    addMeal,
    updateWater,
    addToPlan,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
