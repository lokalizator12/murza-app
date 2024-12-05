import React, {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../axiosConfig";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import EditProfileForm from "../../components/Profile/panels/EditProfileForm";
import ProfileTrips from "../../components/Profile/ProfileTrips";
import ProfileParcels from "../../components/Profile/ProfileParcels";
import ProfileDetailsDialog from "../../components/Profile/ProfileDetailsDialog";
import {Alert, Box, Container, Grid, Paper, Snackbar} from "@mui/material";
import RequestDetailsModal from "../../components/MainPage/RequestDetailsModal";
import SettingsPanel from "../../components/Profile/panels/SettingsPanel";
import SubscriptionsPanel from "../../components/Profile/panels/SubscriptionsPanel";


const ProfilePage = () => {
    const {userId} = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [trips, setTrips] = useState([]);
    const [parcels, setParcels] = useState([]);
    const [error, setError] = useState(null);
    const [tripsPage, setTripsPage] = useState(1);
    const [parcelsPage, setParcelsPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const itemsPerPage = 3;
    const [selectedItem, setSelectedItem] = useState(null);
    const [totalTrips, setTotalTrips] = useState(0);
    const [totalParcels, setTotalParcels] = useState(0);
    const [modalType, setModalType] = useState(null);
    const [itemType] = useState(null);


    const fetchProfileData = useCallback(async () => {
        try {
            const isOwnProfileRes = await axios.get(`/v1/profile/is-owner/${userId}`);
            setIsOwnProfile(isOwnProfileRes.data);

            const profileEndpoint = isOwnProfileRes.data ? "/v1/profile" : `/v1/profile/${userId}`;
            const profileRes = await axios.get(profileEndpoint);
            setProfile(profileRes.data);

            const [followersRes, followingRes] = await Promise.all([
                axios.get(`/v1/subscriptions/${userId}/followers/count`),
                axios.get(`/v1/subscriptions/${userId}/following/count`),
            ]);
            setFollowersCount(followersRes.data);
            setFollowingCount(followingRes.data);

            if (!isOwnProfileRes.data) {
                const isFollowingRes = await axios.get(`/v1/subscriptions/${userId}/is-following`, {
                    withCredentials: true,
                });
                setIsFollowing(isFollowingRes.data);
            }
        } catch (error) {
            setError("Error fetching profile data");
            console.error(error);
        }
    }, [userId]);

    const fetchTripsAndParcels = useCallback(async () => {
        try {
            const [tripsRes, parcelsRes] = await Promise.all([
                axios.get(`/trip-requests/user/${userId}?page=${tripsPage - 1}&size=${itemsPerPage}`),
                axios.get(`/parcel-requests/user/${userId}?page=${parcelsPage - 1}&size=${itemsPerPage}`),
            ]);

            setTrips(tripsRes.data.content || []);
            setParcels(parcelsRes.data.content || []);
            setTotalTrips(tripsRes.data.totalElements || 0);
            setTotalParcels(parcelsRes.data.totalElements || 0);
        } catch (error) {
            setError("Error fetching trips or parcels");
            console.error(error);
        }
    }, [userId, tripsPage, parcelsPage]);

    const handleSubscribe = async () => {
        try {
            await axios.post(`/v1/subscriptions/${userId}`, {}, {withCredentials: true});
            setIsFollowing(true);
            setFollowersCount((prev) => prev + 1);
        } catch (error) {
            setError("Error subscribing");
            console.error(error);
        }
    };

    const handleUnsubscribe = async () => {
        try {
            await axios.delete(`/v1/subscriptions/${userId}`, {withCredentials: true});
            setIsFollowing(false);
            setFollowersCount((prev) => prev - 1);
        } catch (error) {
            setError("Error unsubscribing");
            console.error(error);
        }
    };

    const handleMessaging = () => {
        if (userId) {
            setTimeout(() => {
                navigate(`/chat/${userId}`);
            }, 100);
        } else {
            console.error('User ID is not available for redirection.');
        }
    };


    const handleSaveChanges = async (updatedProfile, updatedPhoto) => {
        try {
            const formData = new FormData();
            formData.append("firstName", updatedProfile.firstName);
            formData.append("lastName", updatedProfile.lastName);
            if (updatedPhoto) formData.append("userPhoto", updatedPhoto);

            const response = await axios.put(`/v1/profile`, formData, {
                headers: {"Content-Type": "multipart/form-data"},
                withCredentials: true,
            });

            setProfile(response.data);
        } catch (error) {
            setError("Error saving profile changes");
            console.error(error);
        }
    };

    const handleOpenModal = async (item, type) => {
        try {
            const response = type === 'parcel'
                ? await axios.get(`/parcel-requests/${item.idParcel}`)
                : await axios.get(`/trip-requests/${item.idTrip}`);

            setSelectedItem({
                ...response.data,
                requestType: type, // Тип запроса (parcel или trip)
                ownerId: userId, // ID владельца профиля
            });
            setModalType("active");
            setModalOpen(true);
        } catch (error) {
            console.error("Error fetching request details:", error);
        }
    };
    useEffect(() => {
        fetchProfileData();
    }, [userId]);
    const handleProfileUpdated = (updatedProfile) => {
        setProfile(updatedProfile); // Обновление данных на странице
    };
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedItem(null);
        setModalType(null);
    };
    const refreshTrips = async () => {
        try {
            const response = await axios.get(`/trip-requests/user/${userId}?page=${tripsPage - 1}&size=${itemsPerPage}`);
            setTrips(response.data.content || []);
        } catch (error) {
            console.error("Error refreshing trips:", error);
        }
    };

    const refreshParcels = async () => {
        try {
            const response = await axios.get(`/parcel-requests/user/${userId}?page=${tripsPage - 1}&size=${itemsPerPage}`);
            setParcels(response.data.content || []);
        } catch (error) {
            console.error("Error refreshing parcels:", error);
        }
    };
    useEffect(() => {
        fetchProfileData();
        fetchTripsAndParcels();
    }, [userId, tripsPage, parcelsPage]);

    if (!profile || isOwnProfile === null) {
        return <div>Loading...</div>;
    }

    return (

        <>

            <Container maxWidth="lg" sx={{mt: 4, pb: 4}}>
                <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
                    <Alert severity="error" onClose={() => setError(null)}>
                        {error}
                    </Alert>
                </Snackbar>

                <Grid container spacing={4}>
                    {/* Profile Header */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{p: 3, textAlign: "center"}}>
                            <ProfileHeader
                                profile={profile}
                                followersCount={followersCount}
                                followingCount={followingCount}
                                isOwnProfile={isOwnProfile}
                                isFollowing={isFollowing}
                                onEditClick={() => setActiveTab(1)}
                                onSubscribe={handleSubscribe}
                                onUnsubscribe={handleUnsubscribe}
                                message={handleMessaging}
                            />
                        </Paper>
                    </Grid>

                    {/* Profile Content */}
                    <Grid item xs={12} md={8}>

                        <ProfileTabs
                            activeTab={activeTab}
                            onTabChange={(event, value) => setActiveTab(value)}
                            isOwnProfile={isOwnProfile}
                        />
                        {activeTab === 0 && (
                            <Box>
                                <ProfileTrips
                                    trips={trips}
                                    tripsPage={tripsPage}
                                    totalTrips={totalTrips}
                                    itemsPerPage={itemsPerPage}
                                    onTripsPageChange={setTripsPage}
                                    isOwnProfile={isOwnProfile}
                                    onItemClick={(item) => handleOpenModal(item, "trip")}
                                    refreshTrips={refreshTrips}
                                />
                                <ProfileParcels
                                    parcels={parcels}
                                    parcelsPage={parcelsPage}
                                    totalParcels={totalParcels}
                                    itemsPerPage={itemsPerPage}
                                    isOwnProfile={isOwnProfile}
                                    onParcelsPageChange={setParcelsPage}
                                    refreshParcels={refreshParcels}
                                    onItemClick={(item) => handleOpenModal(item, "parcel")}
                                />
                            </Box>
                        )}

                        {activeTab === 1 && isOwnProfile && (
                            <EditProfileForm
                                initialProfile={{
                                    firstName: profile.firstName,
                                    lastName: profile.lastName,
                                    userPhoto: profile.userPhoto,
                                }}
                                profile={profile}
                                onSave={(updatedProfile, updatedPhoto) => handleSaveChanges(updatedProfile, updatedPhoto)}
                                onProfileUpdated={handleProfileUpdated}
                            />
                        )}
                        {activeTab === 2 && isOwnProfile && (
                            <SettingsPanel
                                onSettingsUpdated={(updatedSettings) => {
                                    setProfile((prevProfile) => ({...prevProfile, ...updatedSettings}));
                                }}
                            />
                        )}
                        {activeTab === 3 && isOwnProfile && <SubscriptionsPanel/>}
                        {modalType === "active" && (
                            <RequestDetailsModal
                                open={modalOpen}
                                onClose={() => setModalOpen(false)}
                                request={selectedItem}
                                requestType={selectedItem.requestType}
                            />
                        )}

                        {modalType === "ended" && (
                            <ProfileDetailsDialog open={modalOpen} onClose={handleCloseModal}
                                                  selectedItem={selectedItem}
                                                  type={itemType}/>
                        )}
                    </Grid>
                </Grid>

                {/*<ProfileDetailsDialog
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                selectedItem={selectedItem}
                type={modalType}
            />*/}
            </Container>

        </>
    );
};

export default ProfilePage;
