// MainPage.js
import React, { useEffect, useState } from 'react';
import MapboxMap from '../../components/MainPage/MapboxMap/MapboxMap';
import RequestsFilter from '../../components/MainPage/RequestsFilter';
import RequestsList from '../../components/MainPage/RequestsList';
import RequestDetailsModal from '../../components/MainPage/RequestDetailsModal';
import { Box, Button, Divider, IconButton, Pagination, Tooltip } from '@mui/material';
import axios from 'axios';
import Dialog from "@mui/material/Dialog";
import RequestForm from "../test-wizard/MainFormRequest";
import RequestsFilterPanel from "../../components/MainPage/RequestsFilterPanel";
import { Add, FilterList } from "@mui/icons-material";

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
    const [showRequestDialog, setShowRequestDialog] = useState(false); // state for showing the dialog

    // Function to open and close the dialog
    const handleOpenRequestDialog = () => setShowRequestDialog(true);
    const handleCloseRequestDialog = () => setShowRequestDialog(false);

    const [filters, setFilters] = useState({});
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        // Reset current page to the first one
        if (currentFilter === 'parcel') {
            setCurrentPageParcel(0);
        } else if (currentFilter === 'trip') {
            setCurrentPageTrip(0);
        }
    };

    const handleResetFilters = () => {
        setFilters({});
        // Reset current page to the first one
        if (currentFilter === 'parcel') {
            setCurrentPageParcel(0);
        } else if (currentFilter === 'trip') {
            setCurrentPageTrip(0);
        }
    };

    const toggleFilterPanel = () => {
        setIsFilterPanelOpen(!isFilterPanelOpen);
    };

    useEffect(() => {
        setFilters({});
        if (currentFilter === 'parcel') {
            setCurrentPageParcel(0);
        } else if (currentFilter === 'trip') {
            setCurrentPageTrip(0);
        }
    }, [currentFilter]);

    // Fetch requests when component mounts or page changes
    useEffect(() => {
        if (currentFilter === 'parcel') {
            fetchParcelRequests(currentPageParcel, filters);
        } else if (currentFilter === 'trip') {
            fetchTripRequests(currentPageTrip, filters);
        }
    }, [currentFilter, currentPageParcel, currentPageTrip, filters]);

    // Update filtered requests when filter or data changes
    useEffect(() => {
        filterRequests();
    }, [currentFilter, parcels, drivers]);

    // Fetch map-specific data
    useEffect(() => {
        fetchMapRequests();
    }, []);

    const fetchParcelRequests = async (page = 0, filters = {}) => {
        try {
            const params = new URLSearchParams({ page, size: 7 });
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    params.append(key, value);
                }
            });
            const parcelsResponse = await axios.get(`/parcel-requests/list-summary?${params.toString()}`);
            setParcels(parcelsResponse.data.content);
            setTotalPagesParcel(parcelsResponse.data.totalPages);
        } catch (error) {
            console.error("Error fetching parcel requests:", error);
        }
    };

    const fetchTripRequests = async (page = 0, filters = {}) => {
        try {
            const params = new URLSearchParams({ page, size: 7 });
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    params.append(key, value);
                }
            });
            const driversResponse = await axios.get(`/trip-requests/list-summary?${params.toString()}`);
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

    // Updated handleRequestSelect to accept id and type
    const handleRequestSelect = async (requestId, type) => {
        try {
            let response;
            if (type === 'parcel') {
                response = await axios.get(`/parcel-requests/${requestId}`);
            } else if (type === 'trip') {
                response = await axios.get(`/trip-requests/${requestId}`);
            } else {
                console.error('Unknown request type:', type);
                return;
            }
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
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            <Dialog
                open={showRequestDialog}
                onClose={handleCloseRequestDialog}
                fullWidth
            >
                <RequestForm onClose={handleCloseRequestDialog} onRefreshData={refreshRequestsData} />
            </Dialog>

            <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
                <div style={{ width: 550, padding: 15, borderRight: '1px solid #ddd', overflowY: 'auto' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={handleOpenRequestDialog}
                        >
                            Create Request
                        </Button>
                        <Tooltip title={isFilterPanelOpen ? 'Hide Filters' : 'Show Filters'}>
                            <IconButton onClick={toggleFilterPanel}>
                                <FilterList />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <RequestsFilter currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
                    {isFilterPanelOpen && (
                        <RequestsFilterPanel
                            onApplyFilters={handleApplyFilters}
                            onResetFilters={handleResetFilters}
                            currentFilter={currentFilter}
                        />
                    )}
                    <RequestsList
                        requests={filteredRequests}
                        currentFilter={currentFilter}
                        onSelectRequest={(id) => handleRequestSelect(id, currentFilter)}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Pagination
                            count={currentFilter === 'parcel' ? totalPagesParcel : totalPagesTrip}
                            page={currentFilter === 'parcel' ? currentPageParcel + 1 : currentPageTrip + 1}
                            onChange={handlePageChange}
                            color="primary"
                            disabled={
                                (currentFilter === 'parcel' && totalPagesParcel === 0) ||
                                (currentFilter === 'trip' && totalPagesTrip === 0)
                            }
                        />
                    </Box>
                </div>
                <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                    <MapboxMap
                        mapParcels={mapParcels}
                        mapDrivers={mapDrivers}
                        selectedType={currentFilter}
                        onRequestSelect={handleRequestSelect} // Pass the handler here
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
