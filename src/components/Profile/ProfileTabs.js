import React from "react";
import {Tab, Tabs} from "@mui/material";

const ProfileTabs = ({activeTab, onTabChange, isOwnProfile}) => {
    return (
        <Tabs value={activeTab} onChange={onTabChange}>
            <Tab label="Profile"/>
            {isOwnProfile && <Tab label="Edit Profile"/>}
            {isOwnProfile && <Tab label="Settings"/>}
            {isOwnProfile && <Tab label="Subscriptions" />}
        </Tabs>
    );
};

export default ProfileTabs;
