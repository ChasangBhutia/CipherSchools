import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaLock, FaUser, FaSpinner } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";

export default function AuthPanel() {
  const { registerUser, loginUser } = useAuthContext();

  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});

  const cardVariant = {
    hidden: { opacity: 0, y: 10, scale: 0.995 },
    enter: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.995,
      transition: { duration: 0.25, ease: "easeIn" },
    },
  };

  const handleInput = (e, formSetter) => {
    const { name, value } = e.target;
    formSetter((prev) => ({ ...prev, [name]: value }));
  };

  const validateLogin = () => {
    const err = {};
    if (!loginForm.email) err.email = "Email is required";
    if (!loginForm.password) err.password = "Password is required";
    return err;
  };

  const validateRegister = () => {
    const err = {};
    if (!registerForm.firstName) err.firstName = "First Name is required";
    if (!registerForm.lastName) err.lastName = "Last Name is required";
    if (!registerForm.email) err.email = "Email is required";
    if (!registerForm.password) err.password = "Password is required";
    if (registerForm.password !== registerForm.confirm)
      err.confirm = "Passwords do not match";
    return err;
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    const err = validateLogin();
    setErrors(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    try {
      await loginUser(loginForm);
      // simulate network
      await new Promise((r) => setTimeout(r, 700));
    } catch (err) {
      setErrors({ form: err.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    const err = validateRegister();
    setErrors(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    try {
      await registerUser(registerForm);
      await new Promise((r) => setTimeout(r, 900));
    } catch (err) {
      setErrors({ form: err.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left illustration / marketing */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
          className="hidden md:flex flex-col gap-6 bg-white/5 p-8 rounded-2xl backdrop-blur-md shadow-lg"
        >
          <div className="text-white">
            <h2 className="text-3xl font-extrabold">Welcome back</h2>
            <p className="mt-2 text-slate-300">
              Fast, focused and delightful authentication experience for your
              IDE.
            </p>
          </div>

          <div className="mt-4 grid gap-3">
            <div className="px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600/80 text-white shadow-md">
              Create projects, edit files, and preview live
            </div>
            <div className="px-4 py-3 rounded-lg bg-white/5 text-slate-200">
              Auto-save, boilerplates, and npm package integration
            </div>
            <div className="px-4 py-3 rounded-lg bg-white/5 text-slate-200">
              Secure by design — keep your work safe
            </div>
          </div>

          <div className="mt-auto text-sm text-slate-400">
            Tip: Try the register flow to create an account and save projects in
            the cloud.
          </div>
        </motion.div>

        {/* Right auth card */}
        <motion.div
          variants={cardVariant}
          initial="hidden"
          animate="enter"
          exit="exit"
          className="bg-white/6 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white">
                {mode === "login" ? "Sign in" : "Create an account"}
              </h3>
              <p className="text-sm text-slate-300">
                {mode === "login"
                  ? "Welcome back — please enter your details"
                  : "Start building projects in seconds"}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="px-3 py-1 rounded-lg bg-white/8 text-white text-sm hover:bg-white/12 transition"
                aria-label="toggle-mode"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.form
                key="login"
                onSubmit={submitLogin}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="space-y-4"
              >
                {errors.form && (
                  <div className="text-red-400 text-sm">{errors.form}</div>
                )}

                <div className="grid gap-2">
                  <label className="text-sm text-slate-300 flex items-center gap-2">
                    <FaEnvelope /> Email
                  </label>
                  <input
                    name="email"
                    value={loginForm.email}
                    onChange={(e) => handleInput(e, (v) => setLoginForm(v))}
                    onInput={(e) => handleInput(e, (v) => setLoginForm(v))}
                    onChangeCapture={(e) =>
                      setLoginForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    type="email"
                    className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/6 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="you@company.com"
                    aria-label="email"
                  />
                  {errors.email && (
                    <div className="text-red-400 text-sm">{errors.email}</div>
                  )}
                </div>

                <div className="grid gap-2">
                  <label className="text-sm text-slate-300 flex items-center gap-2">
                    <FaLock /> Password
                  </label>
                  <input
                    name="password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    type="password"
                    className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/6 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="********"
                    aria-label="password"
                  />
                  {errors.password && (
                    <div className="text-red-400 text-sm">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-slate-300">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-indigo-500" />{" "}
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="text-indigo-300 hover:underline"
                  >
                    Forgot?
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold shadow"
                  >
                    {loading ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </div>

                <div className="pt-2">
                  <div className="text-center text-sm text-slate-400">
                    or continue with
                  </div>
                  <div className="mt-3 flex gap-3 justify-center">
                    <button className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/8">
                      Google
                    </button>
                    <button className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/8">
                      Github
                    </button>
                  </div>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                onSubmit={submitRegister}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="space-y-4"
              >
                {errors.form && (
                  <div className="text-red-400 text-sm">{errors.form}</div>
                )}

                <div className="grid gap-2">
                  <label className="text-sm text-slate-300 flex items-center gap-2">
                    <FaUser /> First name
                  </label>
                  <input
                    name="firstName"
                    value={registerForm.firstName}
                    onChange={(e) =>
                      setRegisterForm((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    type="text"
                    className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/6 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your first name"
                    aria-label="first name"
                  />
                  {errors.firstName && (
                    <div className="text-red-400 text-sm">
                      {errors.firstName}
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <label className="text-sm text-slate-300 flex items-center gap-2">
                    <FaUser /> Last name
                  </label>
                  <input
                    name="lastName"
                    value={registerForm.lastName}
                    onChange={(e) =>
                      setRegisterForm((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    type="text"
                    className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/6 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your last name"
                    aria-label="last name"
                  />
                  {errors.lastName && (
                    <div className="text-red-400 text-sm">
                      {errors.lastName}
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <label className="text-sm text-slate-300 flex items-center gap-2">
                    <FaEnvelope /> Email
                  </label>
                  <input
                    name="email"
                    value={registerForm.email}
                    onChange={(e) =>
                      setRegisterForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    type="email"
                    className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/6 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="you@company.com"
                    aria-label="email"
                  />
                  {errors.email && (
                    <div className="text-red-400 text-sm">{errors.email}</div>
                  )}
                </div>

                <div className="grid gap-2 md:grid-cols-2 md:grid-flow-col">
                  <div>
                    <label className="text-sm text-slate-300 flex items-center gap-2">
                      <FaLock /> Password
                    </label>
                    <input
                      name="password"
                      value={registerForm.password}
                      onChange={(e) =>
                        setRegisterForm((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      type="password"
                      className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/6 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Create password"
                      aria-label="password"
                    />
                    {errors.password && (
                      <div className="text-red-400 text-sm">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 flex items-center gap-2">
                      Confirm
                    </label>
                    <input
                      name="confirm"
                      value={registerForm.confirm}
                      onChange={(e) =>
                        setRegisterForm((prev) => ({
                          ...prev,
                          confirm: e.target.value,
                        }))
                      }
                      type="password"
                      className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/6 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Repeat password"
                      aria-label="confirm-password"
                    />
                    {errors.confirm && (
                      <div className="text-red-400 text-sm">
                        {errors.confirm}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold shadow"
                  >
                    {loading ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      "Create account"
                    )}
                  </button>
                </div>

                <div className="text-sm text-slate-400">
                  By creating an account you agree to our{" "}
                  <button className="text-indigo-300 underline">Terms</button>.
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-4 text-center text-slate-400 text-sm">
            <span>Need help? </span>
            <button className="text-indigo-300 hover:underline">
              Contact support
            </button>
          </div>
        </motion.div>
      </div>

      {/* small footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5 } }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 text-slate-400 text-sm"
      >
        Built with ❤️ for your React IDE
      </motion.div>
    </div>
  );
}
