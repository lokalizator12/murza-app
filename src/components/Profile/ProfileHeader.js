import React from "react";
import {Avatar, Box, Button, Chip, Stack, Tooltip, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
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

    const lastSeenDate = profile.lastActivityDate
        ? format(new Date(profile.lastActivityDate), "EEE, MMM dd yyyy HH:mm:ss")
        : "N/A";

    const formatLastSeen = (timestamp) => {
        if (!timestamp) return "Just now";

        const lastSeenDate = new Date(timestamp);
        const now = new Date();
        const diffMs = now - lastSeenDate;

        if (diffMs < 60 * 1000) {
            return "Just now";
        } else if (diffMs < 60 * 60 * 1000) {
            const minutes = Math.floor(diffMs / (60 * 1000));
            return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        } else if (diffMs < 24 * 60 * 60 * 1000) {
            const hours = Math.floor(diffMs / (60 * 60 * 1000));
            return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        } else {
            return lastSeenDate.toLocaleString();
        }
    };

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
                                background: "linear-gradient(to right, #64431c, #8d6f4c)",
                                color: "white",
                                fontWeight: "bold",
                                borderRadius: "20px",
                                "&:hover": {
                                    background: "linear-gradient(to right, #51320d, #804b0c)",
                                },
                                transition: "background 0.5s ease",
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
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
                        {/* Email Verification Status */}
                        <Tooltip
                            title={profile.emailVerified ? "Email is verified" : "Email is not verified"}
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
                            title={profile.phoneVerified ? "Phone number is verified" : "Phone number is not verified"}
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
                                icon={<CalendarTodayIcon sx={{color: "#896c49"}}/>}
                                label={`Joined ${registrationDate}`}
                                sx={{
                                    backgroundColor: "#e3f2fd",
                                    color: "#64431c",
                                    fontWeight: "bold",
                                }}
                            />
                        </Tooltip>

                        {/* Online Status */}
                        <Tooltip title={profile.online ? "User is online" : "User is offline"}>
                            <Chip
                                icon={
                                    profile.online ? (
                                        <FiberManualRecordIcon
                                            sx={{
                                                color: "#039108",
                                                animation: "blinker 1.5s linear infinite",
                                                "@keyframes blinker": {
                                                    "50%": {
                                                        opacity: 0.5,
                                                    },
                                                },
                                            }}
                                        />
                                    ) : (
                                        <FiberManualRecordIcon sx={{color: "#9e9e9e"}}/>
                                    )
                                }
                                label={
                                    profile.online
                                        ? "Online"
                                        : `Last seen ${formatLastSeen(lastSeenDate)}`
                                }
                                sx={{
                                    backgroundColor: profile.online ? "#e8f5e9" : "#f5f5f5",
                                    color: profile.online ? "#4caf50" : "gray",
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
