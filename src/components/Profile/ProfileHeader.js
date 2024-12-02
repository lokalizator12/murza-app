// ProfileHeader.js
import React from "react";
import {Avatar, Box, Button, Chip, Stack, Tooltip, Typography,} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {motion} from "framer-motion";
import {format} from "date-fns";

const ProfileHeader = ({
                           profile,
                           followersCount,
                           followingCount,
                           isOwnProfile,
                           isFollowing,
                           onEditClick,
                           onSubscribe,
                           onUnsubscribe,
                           message,
                       }) => {
    // Format the registration date
    const registrationDate = profile.dateRegistered
        ? format(new Date(profile.dateRegistered), "dd MMMM yyyy")
        : "N/A";

    return (
        <motion.div
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
        >
            <Box sx={{textAlign: "center", mt: 4, mb: 4}}>
                <Avatar
                    src={profile.userPhoto || "/default-avatar.png"}
                    sx={{width: 220, height: 220, mb: 2, mx: "auto"}}
                />
                <Typography variant="h4" sx={{fontWeight: "bold"}}>
                    {profile.firstName} {profile.lastName}
                </Typography>
                <Typography variant="body1" sx={{color: "gray", mb: 2}}>
                    Followers: {followersCount} | Following: {followingCount}
                </Typography>

                {/* Action Buttons */}
                <Stack direction="row" justifyContent="center" spacing={2} sx={{mb: 2}}>
                    {isOwnProfile ? (
                        <Button
                            startIcon={<EditIcon/>}
                            onClick={onEditClick}
                            variant="contained"
                            color="primary"
                            sx={{
                                background: "linear-gradient(to right, #1976d2, #2196f3)",
                                color: "white",
                                fontWeight: "bold",
                                borderRadius: "20px",
                                "&:hover": {
                                    background: "linear-gradient(to right, #1565c0, #1e88e5)",
                                },
                                transition: "background 0.3s ease",
                            }}
                        >
                            Edit Profile
                        </Button>
                    ) : (
                        <>
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
                                    "&:hover": {
                                        background: isFollowing
                                            ? "linear-gradient(to right, #c62828, #d32f2f)"
                                            : "linear-gradient(to right, #388e3c, #66bb6a)",
                                    },
                                    transition: "background 0.3s ease",
                                }}
                            >
                                {isFollowing ? "Unsubscribe" : "Subscribe"}
                            </Button>

                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={message}
                                sx={{
                                    borderRadius: "20px",
                                    border: "2px solid #FF5722",
                                    color: "#FF5722",
                                    fontWeight: "bold",
                                    "&:hover": {
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

                {/* Verification Status and Registration Date */}
                <Box sx={{mt: 2}}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                    >
                        {/* Email Verification Status */}
                        <Tooltip
                            title={
                                profile.emailVerified
                                    ? "Email is verified"
                                    : "Email is not verified"
                            }
                        >
                            <Chip
                                icon={
                                    profile.emailVerified ? (
                                        <EmailIcon sx={{color: "green"}}/>
                                    ) : (
                                        <EmailOutlinedIcon sx={{color: "gray"}}/>
                                    )
                                }
                                label="Email"
                                sx={{
                                    backgroundColor: profile.emailVerified ? "#e8f5e9" : "#f5f5f5",
                                    color: profile.emailVerified ? "green" : "gray",
                                    fontWeight: "bold",
                                }}
                            />
                        </Tooltip>

                        {/* Phone Verification Status */}
                        <Tooltip
                            title={
                                profile.phoneVerified
                                    ? "Phone number is verified"
                                    : "Phone number is not verified"
                            }
                        >
                            <Chip
                                icon={
                                    profile.phoneVerified ? (
                                        <PhoneIcon sx={{color: "green"}}/>
                                    ) : (
                                        <PhoneOutlinedIcon sx={{color: "gray"}}/>
                                    )
                                }
                                label="Phone"
                                sx={{
                                    backgroundColor: profile.phoneVerified ? "#e8f5e9" : "#f5f5f5",
                                    color: profile.phoneVerified ? "green" : "gray",
                                    fontWeight: "bold",
                                }}
                            />
                        </Tooltip>

                        <Tooltip title="Registration Date">
                            <Chip
                                icon={<CalendarTodayIcon sx={{color: "#1e88e5"}}/>}
                                label={`Joined ${registrationDate}`}
                                sx={{
                                    backgroundColor: "#e3f2fd",
                                    color: "#1e88e5",
                                    fontWeight: "bold",
                                }}
                            />
                        </Tooltip>
                    </Stack>
                </Box>
            </Box>
        </motion.div>
    );
};

export default ProfileHeader;
