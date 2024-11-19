import React from "react";
import { Tabs, Tab } from "@mui/material";

const ProfileTabs = ({ activeTab, onTabChange }) => {
    return (
        <Tabs value={activeTab} onChange={onTabChange}>
            <Tab label="Profile" />
            <Tab label="Edit Profile" />
            <Tab label="Settings" />
        </Tabs>

    );
};

export default ProfileTabs;
