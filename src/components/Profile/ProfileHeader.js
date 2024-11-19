import React from "react";
import { Avatar, Box, Button, Typography, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";

const ProfileHeader = ({ profile, followersCount, followingCount, isOwnProfile, isFollowing, onEditClick, onSubscribe, onUnsubscribe }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box sx={{ textAlign: "center", mt: 4, mb: 4 }}>
                <Avatar
                    src={profile.userPhoto || "/default-avatar.png"}
                    sx={{ width: 220, height: 220, mb: 2, mx: "auto" }}
                />
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {profile.firstName} {profile.lastName}
                </Typography>
                <Typography variant="body1" sx={{ color: "gray", mb: 2 }}>
                    Followers: {followersCount} | Following: {followingCount}
                </Typography>
                <Stack direction="row" justifyContent="center" spacing={2}>
                    {/* Условие для проверки, если это профиль текущего пользователя */}
                    {isOwnProfile ? (
                        <Button
                            startIcon={<EditIcon />}
                            onClick={onEditClick}
                            variant="contained"
                            color="primary"
                            sx={{
                                background: "linear-gradient(to right, #1976d2, #2196f3)",
                                color: "white",
                                fontWeight: "bold",
                                borderRadius: "20px",
                                '&:hover': {
                                    background: "linear-gradient(to right, #1565c0, #1e88e5)",
                                },
                                transition: "background 0.3s ease",
                            }}
                        >
                            Edit Profile
                        </Button>
                    ) : (
                        <>
                            {/* Кнопка "Subscribe/Unsubscribe" */}
                            <Button
                                variant="contained"
                                color={isFollowing ? "secondary" : "primary"}
                                onClick={isFollowing ? onUnsubscribe : onSubscribe}
                                sx={{
                                    background: isFollowing
                                        ? "linear-gradient(to right, #e53935, #ff5722)"
                                        : "linear-gradient(to right, #4caf50, #81c784)",
                                    color: "white",
                                    fontWeight: "bold",
                                    borderRadius: "20px",
                                    '&:hover': {
                                        background: isFollowing
                                            ? "linear-gradient(to right, #c62828, #d32f2f)"
                                            : "linear-gradient(to right, #388e3c, #66bb6a)",
                                    },
                                    transition: "background 0.3s ease",
                                }}
                            >
                                {isFollowing ? "Unsubscribe" : "Subscribe"}
                            </Button>

                            {/* Кнопка "Message" */}
                            <Button
                                variant="outlined"
                                color="secondary"
                                sx={{
                                    borderRadius: "20px",
                                    border: "2px solid #FF5722",
                                    color: "#FF5722",
                                    fontWeight: "bold",
                                    '&:hover': {
                                        background: "#FFCCBC",
                                        borderColor: "#E64A19",
                                    },
                                    transition: "background 0.3s ease, border-color 0.3s ease",
                                }}
                            >
                                Message
                            </Button>
                        </>
                    )}
                </Stack>
            </Box>
        </motion.div>
    );
};

export default ProfileHeader;
