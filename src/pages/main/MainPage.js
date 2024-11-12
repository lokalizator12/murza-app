import React, {useEffect, useState} from 'react';
import Navbar8 from '../../components/navbar8';
import MapboxMap from '../../components/MainPage/MapboxMap/MapboxMap';
import RequestsFilter from '../../components/MainPage/RequestsFilter';
import RequestsList from '../../components/MainPage/RequestsList';
import RequestDetailsModal from '../../components/MainPage/RequestDetailsModal';
import {Box, Button, Pagination} from '@mui/material';
import axios from 'axios';
import Dialog from "@mui/material/Dialog";
import RequestForm from "../test-wizard/MainFormRequest";

const MainPage = () => {
    const [parcels, setParcels] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [currentFilter, setCurrentFilter] = useState('parcel');
    const [isModalOpen, setModalOpen] = useState(false);

    const [currentPageParcel, setCurrentPageParcel] = useState(0);
    const [currentPageTrip, setCurrentPageTrip] = useState(0);
    const [totalPagesParcel, setTotalPagesParcel] = useState(0);
    const [totalPagesTrip, setTotalPagesTrip] = useState(0);

    // State for map-specific data
    const [mapParcels, setMapParcels] = useState([]);
    const [mapDrivers, setMapDrivers] = useState([]);
    const [showRequestDialog, setShowRequestDialog] = useState(false); // состояние для отображения диалога

    // Функция открытия и закрытия диалога
    const handleOpenRequestDialog = () => setShowRequestDialog(true);
    const handleCloseRequestDialog = () => setShowRequestDialog(false);
    // Fetch requests when component mounts or page changes
    useEffect(() => {
        if (currentFilter === 'parcel') {
            fetchParcelRequests(currentPageParcel);
        } else if (currentFilter === 'trip') {
            fetchTripRequests(currentPageTrip);
        }
    }, [currentPageParcel, currentPageTrip, currentFilter]);

    // Update filtered requests when filter or data changes
    useEffect(() => {
        filterRequests();
    }, [currentFilter, parcels, drivers]);

    // Fetch map-specific data
    useEffect(() => {
        fetchMapRequests();
    }, []);

    const fetchParcelRequests = async (page = 0) => {
        try {
            const parcelsResponse = await axios.get(`/parcel-requests/list-summary?page=${page}&size=7`);
            setParcels(parcelsResponse.data.content);
            setTotalPagesParcel(parcelsResponse.data.totalPages);
        } catch (error) {
            console.error("Error fetching parcel requests:", error);
        }
    };

    const fetchTripRequests = async (page = 0) => {
        try {
            const driversResponse = await axios.get(`/trip-requests/list-summary?page=${page}&size=7`);
            setDrivers(driversResponse.data.content);
            setTotalPagesTrip(driversResponse.data.totalPages);
        } catch (error) {
            console.error("Error fetching trip requests:", error);
        }
    };

    const fetchMapRequests = async () => {
        try {
            const mapDriversResponse = await axios.get('/trip-requests/list-map');
            const mapParcelsResponse = await axios.get('/parcel-requests/list-map');
            setMapDrivers(mapDriversResponse.data);
            setMapParcels(mapParcelsResponse.data);
        } catch (error) {
            console.error("Error fetching map-specific requests:", error);
        }
    };
    const refreshRequestsData = () => {
        fetchParcelRequests(currentPageParcel);
        fetchTripRequests(currentPageTrip);
        fetchMapRequests();
    };
    const filterRequests = () => {
        if (currentFilter === 'parcel') {
            setFilteredRequests(parcels);
        } else if (currentFilter === 'trip') {
            setFilteredRequests(drivers);
        }
    };

    const handleRequestSelect = async (requestId, type) => {
        try {
            const response = type === 'parcel'
                ? await axios.get(`/parcel-requests/${requestId}`)
                : await axios.get(`/trip-requests/${requestId}`);
            setSelectedRequest(response.data);
            setModalOpen(true);
        } catch (error) {
            console.error("Error fetching request details:", error);
        }
    };

    const handlePageChange = (event, newPage) => {
        if (currentFilter === 'parcel') {
            setCurrentPageParcel(newPage - 1);
        } else if (currentFilter === 'trip') {
            setCurrentPageTrip(newPage - 1);
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden'}}>
            <Navbar8/>


            <Dialog
                open={showRequestDialog}
                onClose={handleCloseRequestDialog}
                fullWidth
            >
                <RequestForm onClose={handleCloseRequestDialog} onRefreshData={refreshRequestsData}/>
            </Dialog>

            <div style={{display: 'flex', flexGrow: 1, overflow: 'hidden'}}>
                <div style={{width: 600, padding: 15, borderRight: '1px solid #ddd', overflowY: 'auto'}}>
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                        <Button variant="contained" color="primary" onClick={handleOpenRequestDialog}>
                            Создать запрос
                        </Button>
                    </Box>
                    <RequestsFilter currentFilter={currentFilter} onFilterChange={setCurrentFilter}/>
                    <RequestsList
                        requests={filteredRequests}
                        currentFilter={currentFilter}
                        onSelectRequest={(id) => handleRequestSelect(id, currentFilter)}
                    />
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                        <Pagination
                            count={currentFilter === 'parcel' ? totalPagesParcel : totalPagesTrip}
                            page={currentFilter === 'parcel' ? currentPageParcel + 1 : currentPageTrip + 1}
                            onChange={handlePageChange}
                            color="primary"
                            disabled={(currentFilter === 'parcel' && totalPagesParcel === 0) || (currentFilter === 'trip' && totalPagesTrip === 0)}
                        />
                    </Box>
                </div>
                <div style={{flexGrow: 1, overflow: 'hidden'}}>
                    <MapboxMap
                        mapParcels={mapParcels}
                        mapDrivers={mapDrivers}
                        selectedType={currentFilter}
                    />
                </div>
            </div>
            {selectedRequest && (
                <RequestDetailsModal
                    open={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    request={selectedRequest}
                    requestType={currentFilter}
                />
            )}
        </div>
    );
};

export default MainPage;