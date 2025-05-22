import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (password === "admin123") {
      window.location.href = "/admin";
    } else {
      setError("Nieprawidłowe hasło");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4eadc]">
      <img
        src="/marcello-logo.png"
        alt="Marcello Collection Logo"
        className="w-48 mb-8"
      />
      <h1 className="text-3xl font-serif mb-6">Logowanie administratora</h1>
      <div className="flex flex-col items-center">
        <input
          type="password"
          placeholder="Wprowadź hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded-md w-64"
        />
        <button
          onClick={handleLogin}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
        >
          Zaloguj
        </button>
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
}
