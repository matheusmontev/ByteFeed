import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", handle: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.handle.includes(" ")) {
      setError("O handle não pode conter espaços.");
      return;
    }
    if (form.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      await register(form.name, form.handle, form.email, form.password);
      navigate("/feed");
    } catch (err) {
      setError(err.message || "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-lg p-8 border border-outline-variant/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-primary-container tracking-tight mb-2">ByteFeed</h1>
          <h2 className="text-xl font-bold text-on-surface">Create your account</h2>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Name</label>
            <input
              id="signup-name"
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">
              Handle <span className="text-on-surface-variant/60 text-xs">(sem @, sem espaços)</span>
            </label>
            <input
              id="signup-handle"
              type="text"
              name="handle"
              required
              value={form.handle}
              onChange={handleChange}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all"
              placeholder="seu_handle"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Email</label>
            <input
              id="signup-email"
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Password</label>
            <input
              id="signup-password"
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all"
              placeholder="mín. 6 caracteres"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center bg-red-400/10 rounded-lg py-2 px-3">
              {error}
            </p>
          )}

          <button
            id="signup-submit"
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-container to-primary hover:opacity-90 text-on-primary font-bold py-3 px-4 rounded-full transition-all active:scale-[0.98] shadow-md mt-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Criando conta..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-outline-variant/20 text-center">
          <p className="text-on-surface-variant text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-primary font-semibold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
