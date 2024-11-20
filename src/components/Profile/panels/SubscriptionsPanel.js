import React, {useEffect, useState} from "react";
import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Snackbar,
    Tab,
    Tabs
} from "@mui/material";
import axios from "../../../axiosConfig";
import {Link} from "react-router-dom";

const SubscriptionsPanel = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(false);
    const [removedFollowers, setRemovedFollowers] = useState([]);
    const [unsubscribedFollowing, setUnsubscribedFollowing] = useState([]);
    const [snackbar, setSnackbar] = useState({open: false, message: "", severity: "success"});

    const fetchFollowers = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem("currentUserId");
            const response = await axios.get(`/v1/subscriptions/${userId}/followers`);
            setFollowers(response.data);
        } catch (error) {
            setSnackbar({open: true, message: "Error fetching followers", severity: "error"});
        } finally {
            setLoading(false);
        }
    };

    const fetchFollowing = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem("currentUserId");
            const response = await axios.get(`/v1/subscriptions/${userId}/following`);
            setFollowing(response.data);
        } catch (error) {
            setSnackbar({open: true, message: "Error fetching following", severity: "error"});
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (type, userId) => {
        try {
            if (type === "remove") {
                await axios.delete(`/v1/subscriptions/${userId}`);
                setRemovedFollowers((prev) => [...prev, userId]);
                setSnackbar({open: true, message: "Follower removed", severity: "success"});
            } else if (type === "return") {
                await axios.post(`/v1/subscriptions/${userId}`);
                setRemovedFollowers((prev) => prev.filter((id) => id !== userId));
                setSnackbar({open: true, message: "Follower returned", severity: "success"});
            } else if (type === "unsubscribe") {
                await axios.delete(`/v1/subscriptions/${userId}`);
                setUnsubscribedFollowing((prev) => [...prev, userId]);
                setSnackbar({open: true, message: "Unsubscribed successfully", severity: "success"});
            } else if (type === "subscribe") {
                await axios.post(`/v1/subscriptions/${userId}`);
                setUnsubscribedFollowing((prev) => prev.filter((id) => id !== userId));
                setSnackbar({open: true, message: "Subscribed successfully", severity: "success"});
            }
        } catch (error) {
            setSnackbar({open: true, message: "Error performing action", severity: "error"});
        }
    };

    useEffect(() => {
        if (activeTab === 0) fetchFollowers();
        else fetchFollowing();
    }, [activeTab]);

    const renderList = (list, isFollowers) =>
        list.map((user) => {
            const isRemoved = removedFollowers.includes(user.id);
            const isUnsubscribed = unsubscribedFollowing.includes(user.id);

            return (
                <ListItem
                    key={user.id}
                    sx={{
                        "&:hover": {
                            backgroundColor: "#f9f9f9",
                        },
                    }}
                >
                    <ListItemAvatar>
                        <Avatar src={user.avatar || "/default-avatar.png"}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Link to={`/profile/${user.id}`} style={{textDecoration: "none", color: "inherit"}}>
                                {user.firstName} {user.lastName}
                            </Link>
                        }
                    />
                    <Button
                        variant={isRemoved || isUnsubscribed ? "outlined" : "contained"}
                        color={isRemoved || isUnsubscribed ? "secondary" : "primary"}
                        onClick={() =>
                            handleAction(
                                isFollowers
                                    ? isRemoved
                                        ? "return"
                                        : "remove"
                                    : isUnsubscribed
                                        ? "subscribe"
                                        : "unsubscribe",
                                user.id
                            )
                        }
                    >
                        {isRemoved ? "Return" : isUnsubscribed ? "Subscribe" : isFollowers ? "Remove" : "Unsubscribe"}
                    </Button>
                </ListItem>
            );
        });

    return (
        <Box>
            <Snackbar open={snackbar.open} autoHideDuration={3000}
                      onClose={() => setSnackbar({...snackbar, open: false})}>
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
            <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)}>
                <Tab label="Followers"/>
                <Tab label="Following"/>
            </Tabs>
            {loading ? (
                <CircularProgress/>
            ) : (
                <List>{activeTab === 0 ? renderList(followers, true) : renderList(following, false)}</List>
            )}
        </Box>
    );
};

export default SubscriptionsPanel;
