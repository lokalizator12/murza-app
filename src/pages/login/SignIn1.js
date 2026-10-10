import React, { useCallback, useEffect, useRef, useState } from "react";
import "./sign-in2.css";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { Helmet } from "react-helmet";
import ForgotPassword from "./ForgotPassword";
import { useAuth } from "../../context/AuthContext";
import { safeNextDestination } from "../../services/routeAccess";

export default function SignIn1() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const [accountNotice] = useState(
    () => sessionStorage.getItem("murza-account-notice") || "",
  );
  useEffect(() => {
    sessionStorage.removeItem("murza-account-notice");
  }, []);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openForgotPassword) {
      setIsForgotPasswordOpen(true);
    }
  }, [location.state]);
  const validateInputs = useCallback(() => {
    const email = document.getElementById("thq-sign-in-2-email").value.trim();
    const password = document.getElementById("thq-sign-in-2-password").value;

    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password) {
      setPasswordError(true);
      setPasswordErrorMessage("Please enter your password.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  }, []);

  const handleForgotPasswordOpen = () => {
    setIsForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setIsForgotPasswordOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (lock.current || !validateInputs()) return;
    lock.current = true;
    setBusy(true);
    setLoginError("");

    const formData = new FormData(event.currentTarget);
    const loginUserDto = {
      email: formData.get("email").trim(),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post("auth/login", loginUserDto, {
        withCredentials: true,
      });
      Cookies.set("token", response.data.token, {
        expires: response.data.expiresIn / 86400000,
        secure: window.location.protocol === "https:",
        sameSite: "Lax",
      });
      localStorage.setItem("currentUserId", response.data.userId);
      login(response.data.token, response.data.userId);
      navigate(safeNextDestination(location.search));
    } catch (error) {
      setLoginError(
        "We could not log you in. Check your email and password and try again.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="page-container">
      <a className="murza-auth-brand" href="/" aria-label="Murza home">
        <img src="/logo-1500h.png" alt="Murza" />
      </a>
      <Helmet>
        <title>Log in</title>
        <meta property="og:title" content="Log in" />
      </Helmet>
      <div className="sign-in2-container1 thq-section-padding">
        <div className="sign-in2-max-width thq-section-max-width">
          <div className="sign-in2-form-root">
            <h2 className="sign-in2-text25 thq-heading-2">Log in</h2>

            {accountNotice && (
              <p className="profile-security-note" role="status">
                {accountNotice}
              </p>
            )}
            <form className="sign-in2-form2" onSubmit={handleSubmit}>
              <div className="sign-in2-email">
                <label htmlFor="thq-sign-in-2-email" className="thq-body-large">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  id="thq-sign-in-2-email"
                  required
                  autoFocus
                  placeholder="Email address"
                  className={`sign-in2-textinput1 thq-input thq-body-large ${emailError ? "error" : ""}`}
                />
                {emailError && (
                  <p className="error-text">{emailErrorMessage}</p>
                )}
              </div>

              <div className="sign-in2-password">
                <div className="sign-in2-container3">
                  <label
                    htmlFor="thq-sign-in-2-password"
                    className="thq-body-large"
                  >
                    Password
                  </label>
                  <button
                    className="sign-in2-hide-password"
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <svg viewBox="0 0 1024 1024" className="sign-in2-icon5">
                      <path d="M317.143 762.857l44.571-80.571c-66.286-48-105.714-125.143-105.714-206.857 0-45.143 12-89.714 34.857-128.571-89.143 45.714-163.429 117.714-217.714 201.714 59.429 92 143.429 169.143 244 214.286zM539.429 329.143c0-14.857-12.571-27.429-27.429-27.429-95.429 0-173.714 78.286-173.714 173.714 0 14.857 12.571 27.429 27.429 27.429s27.429-12.571 27.429-27.429c0-65.714 53.714-118.857 118.857-118.857 14.857 0 27.429-12.571 27.429-27.429z" />
                    </svg>
                    <span className="thq-body-small">
                      {showPassword ? "Hide" : "Show"}
                    </span>
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  id="thq-sign-in-2-password"
                  required
                  placeholder="Password"
                  className={`sign-in2-textinput1 thq-input thq-body-large ${passwordError ? "error" : ""}`}
                />
                {passwordError && (
                  <p className="error-text">{passwordErrorMessage}</p>
                )}
              </div>

              <div className="sign-in2-container4">
                <button
                  type="submit"
                  disabled={busy}
                  className="sign-in2-button3 thq-button-filled"
                >
                  <span className="sign-in2-text24 thq-body-small">
                    {busy ? "Signing in…" : "Log in"}
                  </span>
                </button>
              </div>
            </form>
            {loginError && (
              <p className="sign-in2-login-error" role="alert">
                {loginError}
              </p>
            )}
            <div className="sign-in2-container4">
              <button
                onClick={handleForgotPasswordOpen}
                className="forgot-password-btn"
              >
                Forgot password?
              </button>
            </div>

            <div className="sign-in2-container5">
              <div className="sign-in2-divider4"></div>
              <span className="sign-in2-text23 thq-body-large">
                Don’t have an account?
              </span>
            </div>

            <button
              type="button"
              className="sign-in2-button4 thq-button-outline"
              onClick={() => navigate("/register")}
            >
              <span className="sign-in2-text26 thq-body-small">
                Create an account
              </span>
            </button>
          </div>
        </div>
      </div>
      <ForgotPassword
        open={isForgotPasswordOpen}
        handleClose={handleForgotPasswordClose}
      />
    </div>
  );
}
