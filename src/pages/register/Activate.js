import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import "./Activate.css"; // Подключаем стили

const Activate = () => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(null); // Успешная/неудачная активация
    const token = searchParams.get("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            axios
                .get(`/v1/verification/activate?token=${token}`)
                .then((response) => {
                    if (response.status === 200 && response.data === true) {
                        setMessage("Your account has been successfully activated!");
                        setStatus("success");
                    } else {
                        setMessage("Activation failed. The link might be expired or invalid.");
                        setStatus("error");
                    }
                })
                .catch(() => {
                    setMessage("Activation failed. The link might be expired or invalid.");
                    setStatus("error");
                });
        }
    }, [token]);

    return (
        <div className="activation-container">
            <div className={`activation-card ${status}`}>
                <h1>{status === "success" ? "🎉 Congratulations!" : "⚠️ Activation Error"}</h1>
                <p>{message}</p>
                <div className="activation-buttons">
                    {status === "success" ? (
                        <>
                            <button
                                className="navbar8-action21 thq-button-outline thq-button-animated"
                                onClick={() => navigate("/login")}
                            >
                                Go to Login
                            </button>
                            <button
                                className="navbar8-action21 thq-button-outline thq-button-animated"
                                onClick={() => navigate("/")}
                            >
                                Back to Home
                            </button>
                        </>
                    ) : (
                        <button
                            className="navbar8-action11 thq-button-filled thq-button-animated"
                            onClick={() => navigate("/register")}
                        >
                            Register Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Activate;
