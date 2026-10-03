import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
} from "firebase/auth";
import app from "../firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Auth() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <img
          src={user.photoURL || ""}
          alt=""
          className="w-10 h-10 rounded-full"
        />

        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {user.displayName}
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>

        <button
          onClick={logout}
          className="text-sm px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      disabled={loading}
      className="w-full px-4 py-3 rounded-xl bg-blue-600 text-white font-medium"
    >
      {loading ? "Signing in..." : "Continue with Google"}
    </button>
  );
}
