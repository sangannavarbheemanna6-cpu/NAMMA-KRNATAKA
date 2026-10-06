import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import app from "../firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Auth({ onAuthenticated }) {
  const [step, setStep] = useState("splash");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (auth.currentUser) {
        setUser(auth.currentUser);
        onAuthenticated?.();
      } else {
        setStep("welcome");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [onAuthenticated]);

  const loginWithGoogle = async () => {
    try {
      setError("");

      const result = await signInWithPopup(auth, provider);

      setUser(result.user);
      setStep("splash");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      onAuthenticated?.();
    } catch (err) {
      console.error(err);
      setError(err?.message || "Google login failed.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError("");
      setStep("welcome");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Logout failed.");
    }
  };

  if (step === "splash") {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <img
          src="/namma-karnataka-splash.jpeg"
          alt="NAMMA KARNATAKA"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    );
  }

  if (step === "welcome") {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            NAMMA KARNATAKA
          </h1>
          <p className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-100">
            ಸ್ವಾಗತ 🙏
          </p>
          <p className="mt-1 text-lg font-semibold text-gray-700 dark:text-gray-200">
            Welcome 🙏
          </p>
          <p className="mt-8 text-base text-gray-700 dark:text-gray-300">
            ಈ ಆ್ಯಪ್‌ನಲ್ಲಿ ಎಲ್ಲಾ ಸೇವೆಗಳನ್ನು ಪಡೆಯಿರಿ
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Access all services available in this app
          </p>
          <button
            type="button"
            onClick={() => setStep("google")}
            className="mt-10 w-full py-3 rounded-xl bg-blue-600 text-white font-bold shadow-md"
          >
            ಮುಂದುವರಿಸಿ
          </button>
          <p className="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
            Continue
          </p>
        </div>
      </div>
    );
  }

  if (step === "google") {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            NAMMA KARNATAKA
          </h1>
          <button
            type="button"
            onClick={loginWithGoogle}
            className="mt-10 w-full py-3 rounded-xl bg-blue-600 text-white font-bold shadow-md"
          >
            Google ಮೂಲಕ ಮುಂದುವರಿಸಿ
          </button>
          <p className="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
            Continue with Google
          </p>
          {error && (
            <p className="mt-6 text-sm text-red-600 break-words">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  return null;
}
