import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-lg p-8 border border-outline-variant/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-primary-container tracking-tight mb-2">ByteFeed</h1>
          <h2 className="text-xl font-bold text-on-surface">Sign in to ByteFeed</h2>
        </div>
        
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Email or @username</label>
            <input 
              type="text" 
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all"
              placeholder="Enter your email or username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Password</label>
            <input 
              type="password" 
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <Link to="/feed" className="block w-full">
            <button className="w-full bg-gradient-to-r from-primary-container to-primary hover:opacity-90 text-on-primary font-bold py-3 px-4 rounded-full transition-all active:scale-[0.98] shadow-md mt-4">
              Log In
            </button>
          </Link>
          
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
          </div>
        </form>
        
        <div className="mt-8 pt-6 border-t border-outline-variant/20 text-center">
          <p className="text-on-surface-variant text-sm">
            Don't have an account? <a href="#" className="text-primary font-semibold hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
