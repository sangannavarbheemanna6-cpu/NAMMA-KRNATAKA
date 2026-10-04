import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
  RecaptchaVerifier,
  linkWithPhoneNumber,
} from "firebase/auth";
import app from "../firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Auth() {
  const [user, setUser] = useState(auth.currentUser);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const googleLogin = async () => {
    try {
      setLoading(true);
      setMessage("");

      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
      setMessage("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendOTP = async () => {
    if (!user) return;

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setMessage("Enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
          }
        );
      }

      const result = await linkWithPhoneNumber(
        user,
        `+91${phone}`,
        window.recaptchaVerifier
      );

      setConfirmation(result);
      setMessage("OTP sent successfully.");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!confirmation) return;

    try {
      setLoading(true);
      setMessage("");

      await confirmation.confirm(otp);

      setMessage("Mobile number verified successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setConfirmation(null);
    setPhone("");
    setOtp("");
  };

  return (
    <div className="w-full max-w-md mx-auto p-5">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 p-6">

        {!user ? (
          <>
            <h2 className="text-xl font-bold text-center mb-2">
              NAMMA KARNATAKA
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Login to continue
            </p>

            <button
              onClick={googleLogin}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-black text-white font-semibold"
            >
              {loading ? "Please wait..." : "Continue with Google"}
            </button>
          </>
        ) : !user.phoneNumber ? (
          <>
            <h2 className="text-xl font-bold mb-2">
              Verify Mobile Number
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">
              ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ಪರಿಶೀಲಿಸಿ / Verify your mobile number
            </p>

            {!confirmation ? (
              <>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="10-digit mobile number"
                  className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 mb-3"
                />

                <button
                  onClick={sendOTP}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="Enter OTP"
                  className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 mb-3"
                />

                <button
                  onClick={verifyOTP}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </>
            )}

            <button
              onClick={logout}
              className="w-full mt-3 py-2 text-sm text-red-600"
            >
              Logout
            </button>

            <div id="recaptcha-container"></div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-center mb-2">
              Welcome 👋
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300">
              {user.displayName || user.email}
            </p>

            <p className="text-center text-green-600 mt-3">
              Mobile verified ✓
            </p>

            <button
              onClick={logout}
              className="w-full mt-6 py-3 rounded-xl bg-red-600 text-white font-semibold"
            >
              Logout
            </button>
          </>
        )}

        {message && (
          <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-300">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}
