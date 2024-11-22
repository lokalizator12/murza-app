/*
import { useState, useEffect, useRef } from 'react';
import axios from '../../../axiosConfig';

const useVerification = () => {
    const [verificationDialog, setVerificationDialog] = useState({
        open: false,
        type: '',
        code: '',
    });
    const [attemptsLeft, setAttemptsLeft] = useState(3);
    const [blockedStatus, setBlockedStatus] = useState({
        email: { isBlocked: false, blockUntil: null },
        phone: { isBlocked: false, blockUntil: null },
    });
    const [codeExpirationTime, setCodeExpirationTime] = useState(null);
    const [canResendCode, setCanResendCode] = useState(false);
    const [loading, setLoading] = useState(false);
    const recaptchaRef = useRef(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const [settings, setSettings] = useState(null);

    const [isCodeSent, setIsCodeSent] = useState(false);
    // Вся логика верификации из `SettingsPanel` переносится сюда

    const handleVerification = async (type) => {
        if (blockedStatus[type].isBlocked) {
            setVerificationDialog({open: true, type, code: ""});
            setSnackbar({
                open: true,
                message: `Вы заблокированы до ${blockedStatus[type].blockUntil.toLocaleTimeString()}`,
                severity: "error",
            });
            return;
        }
        setLoading(true);
        setCanResendCode(false);
        try {
            console.log("Starting verification for type:", type);

            if (recaptchaRef.current) {
                const captchaResponse = await recaptchaRef.current.executeAsync();
                console.log("Received captcha response:", captchaResponse);
                recaptchaRef.current.reset();

                const response = await axios.post(
                    `/v1/verification/send?type=${type}&captchaResponse=${captchaResponse}`
                );
                console.log("Verification code sent successfully:", response.data);

                setSnackbar({
                    open: true,
                    message: `Код верификации отправлен на ваш ${type}.`,
                    severity: "success",
                });
                setVerificationDialog({open: true, type, code: ""});
                setIsCodeSent(true);
                setCodeExpirationTime(Date.now() + 2 * 60 * 1000);
            } else {
                console.error("recaptchaRef.current is null");
                setSnackbar({
                    open: true,
                    message: "Ошибка инициализации ReCAPTCHA. Пожалуйста, обновите страницу.",
                    severity: "error",
                });
            }
        } catch (error) {
            console.error("Error sending verification code:", error);

            let errorMessage = "Ошибка при отправке кода верификации.";
            if (error.response) {
                const apiError = error.response.data;
                if (apiError && apiError.message) {
                    errorMessage = apiError.message;
                } else if (typeof apiError === "string") {
                    errorMessage = apiError;
                }
            } else if (error.message) {
                errorMessage = error.message;
            }

            setSnackbar({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const verifyCode = async () => {
        setLoading(true);
        try {
            console.log("Verifying code:", verificationDialog.code);
            const {type, code} = verificationDialog;
            const response = await axios.post(
                `/v1/verification/verify?type=${type}&code=${code}`
            );
            console.log("Verification successful:", response.data);

            setSnackbar({
                open: true,
                message: `${
                    type === "email" ? "Email" : "Телефон"
                } успешно верифицирован!`,
                severity: "success",
            });
            setSettings((prevSettings) => ({
                ...prevSettings,
                [`${type}Verified`]: true,
            }));
            setVerificationDialog({open: false, type: "", code: ""});
            setAttemptsLeft(3);
            //setIsBlocked(false);
        } catch (error) {
            console.error("Error verifying code:", error);

            let errorMessage = "Ошибка верификации. Пожалуйста, попробуйте снова.";

            if (error.response) {
                const apiError = error.response.data;
                let errorData;

                if (apiError && apiError.data) {
                    errorData = apiError.data;
                } else {
                    errorData = apiError;
                }

                if (errorData) {
                    if (errorData.message) {
                        errorMessage = errorData.message;
                    }
                    if (errorData.errors && errorData.errors.length > 0) {
                        errorMessage = errorData.errors.map((err) => err.message).join(", ");
                    }
                    if (errorData.additionalData) {
                        if (errorData.additionalData.attemptsLeft !== undefined) {
                            setAttemptsLeft(errorData.additionalData.attemptsLeft);
                        }
                        if (errorData.additionalData.blockedUntil) {
                            const blockTime = new Date(errorData.additionalData.blockedUntil);
                            setBlockedStatus((prevStatus) => ({
                                ...prevStatus,
                                [verificationDialog.type]: {isBlocked: true, blockUntil: blockTime},
                            }));

                            // Устанавливаем таймер для снятия блокировки
                            const timeoutDuration = blockTime.getTime() - new Date().getTime();
                            setTimeout(() => {
                                setBlockedStatus((prevStatus) => ({
                                    ...prevStatus,
                                    [verificationDialog.type]: {isBlocked: false, blockUntil: null},
                                }));
                                setAttemptsLeft(3);
                            }, timeoutDuration);
                        }
                    }
                }
            } else if (error.message) {
                errorMessage = error.message;
            }

            setSnackbar({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = () => {
        setCanResendCode(false);
        setCodeExpirationTime(Date.now() + 2 * 60 * 1000); // Обновляем время истечения кода
        handleVerification(verificationDialog.type);
    };

    // Возвращаем все необходимые состояния и функции
    return {
        verificationDialog,
        setVerificationDialog,
        attemptsLeft,
        setAttemptsLeft,
        blockedStatus,
        setBlockedStatus,
        codeExpirationTime,
        setCodeExpirationTime,
        canResendCode,
        setCanResendCode,
        loading,
        setLoading,
        recaptchaRef,
        handleVerification,
        verifyCode,
        handleResendCode,
        snackbar,
        settings,
        isCodeSent,

    };
};

export default useVerification;
*/
