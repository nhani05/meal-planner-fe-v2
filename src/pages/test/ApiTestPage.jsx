import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useUiStore } from '../../stores/uiStore';
import * as authApi from '../../api/authApi';
import * as dishApi from '../../api/dishApi';
import * as mealApi from '../../api/mealApi';
import * as userApi from '../../api/userApi';
import * as ingredientApi from '../../api/ingredientApi';

export default function ApiTestPage() {
  const [results, setResults] = useState([]);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const showToast = useUiStore((state) => state.showToast);

  const addResult = (label, data, error) => {
    const entry = {
      id: Date.now() + Math.random(),
      label,
      time: new Date().toLocaleTimeString(),
      data: error ? null : data,
      error: error ? (error.response?.data?.message || error.message) : null,
    };
    setResults((prev) => [entry, ...prev].slice(0, 20));
  };

  const handleLogin = async () => {
    try {
      const res = await authApi.login({ username: 'tester1', password: 'P@ssw0rd' });
      login(res.data.token, res.data.user);
      addResult('POST /auth/login', res.data);
      showToast('Login success', 'success');
    } catch (err) {
      addResult('POST /auth/login', null, err);
      showToast('Login failed', 'error');
    }
  };

  const handleRegister = async () => {
    try {
      const username = `tester${Date.now()}`;
      const res = await authApi.register({
        username,
        email: `${username}@example.com`,
        password: 'P@ssw0rd',
        passwordConfirm: 'P@ssw0rd',
      });
      addResult('POST /auth/register', res.data);
      showToast('Register success', 'success');
    } catch (err) {
      addResult('POST /auth/register', null, err);
      showToast('Register failed', 'error');
    }
  };

  const handleGetDishes = async () => {
    try {
      const res = await dishApi.getDishes({ page: 0, size: 5 });
      addResult('GET /dishes?page=0&size=5', res.data);
    } catch (err) {
      addResult('GET /dishes', null, err);
    }
  };

  const handleGetCategories = async () => {
    try {
      const res = await dishApi.getCategories();
      addResult('GET /dish-categories', res.data);
    } catch (err) {
      addResult('GET /dish-categories', null, err);
    }
  };

  const handleGetMealPlans = async () => {
    if (!user?.id) {
      addResult('GET /meal-plans/account/{id}', null, { message: 'Not logged in' });
      return;
    }
    try {
      const res = await mealApi.getMealPlans(user.id);
      addResult(`GET /meal-plans/account/${user.id}`, res.data);
    } catch (err) {
      addResult('GET /meal-plans/account/{id}', null, err);
    }
  };

  const handleGetProfile = async () => {
    if (!user?.id) {
      addResult('GET /health-profile/{id}', null, { message: 'Not logged in' });
      return;
    }
    try {
      const res = await userApi.getHealthProfile(user.id);
      addResult(`GET /health-profile/${user.id}`, res.data);
    } catch (err) {
      addResult('GET /health-profile/{id}', null, err);
    }
  };

  const handleGetGoal = async () => {
    if (!user?.id) {
      addResult('GET /health-goal/{id}', null, { message: 'Not logged in' });
      return;
    }
    try {
      const res = await userApi.getHealthGoal(user.id);
      addResult(`GET /health-goal/${user.id}`, res.data);
    } catch (err) {
      addResult('GET /health-goal/{id}', null, err);
    }
  };

  const handleGetIngredients = async () => {
    try {
      const res = await ingredientApi.getIngredients({ page: 0, size: 5 });
      addResult('GET /ingredients?page=0&size=5', res.data);
    } catch (err) {
      addResult('GET /ingredients', null, err);
    }
  };

  const handleLogout = () => {
    logout();
    addResult('Logout', { message: 'Token cleared' });
    showToast('Logged out', 'info');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">API Test Page — Phase 0</h1>

      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="font-semibold mb-2">Auth State</h2>
        <p><strong>Token:</strong> {token ? `${token.slice(0, 20)}...` : 'null'}</p>
        <p><strong>User:</strong> {user ? `${user.username} (id=${user.id}, role=${user.role})` : 'null'}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Login (tester1)
        </button>
        <button onClick={handleRegister} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Register (random)
        </button>
        <button onClick={handleGetDishes} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Get Dishes
        </button>
        <button onClick={handleGetCategories} className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
          Get Categories
        </button>
        <button onClick={handleGetMealPlans} className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
          Get Meal Plans
        </button>
        <button onClick={handleGetProfile} className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
          Get Health Profile
        </button>
        <button onClick={handleGetGoal} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Get Health Goal
        </button>
        <button onClick={handleGetIngredients} className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700">
          Get Ingredients
        </button>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 col-span-2 md:col-span-4">
          Logout
        </button>
      </div>

      <div className="space-y-3">
        <h2 className="font-semibold">Results</h2>
        {results.map((r) => (
          <div key={r.id} className={`p-3 rounded border ${r.error ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{r.label}</span>
              <span className="text-gray-500">{r.time}</span>
            </div>
            {r.error ? (
              <pre className="text-xs text-red-600 whitespace-pre-wrap">{r.error}</pre>
            ) : (
              <pre className="text-xs text-gray-700 whitespace-pre-wrap overflow-x-auto max-h-40">
                {JSON.stringify(r.data, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
