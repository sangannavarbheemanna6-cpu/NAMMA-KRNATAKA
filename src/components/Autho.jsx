import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
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
    await signOut(auth);
    setUser(null);
  };

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <img
          src={user.photoURL || ""}
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm">{user.displayName}</span>
        <button
          onClick={logout}
          className="text-sm px-3 py-1 rounded-lg border"
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
      className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium"
    >
      {loading ? "Signing in..." : "Continue with Google"}
    </button>
  );
}
