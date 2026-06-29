import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("admin-warehouse");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin-warehouse" && password === "password") {
      login(username, "warehouse");
      navigate("/menu");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-500 rounded-full mb-6">
            <Lock className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Shinsei Traceability
          </h1>
          <p className="text-slate-500">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-medium hover:bg-blue-500 transition-all duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400">
            Default credentials: admin-warehouse / password
          </p>
        </div>
      </div>
    </div>
  );
}
