// MainPage.js
import React, { useEffect, useState } from 'react';
import Navbar8 from '../../components/navbar8';
import MapboxMap from '../../components/MainPage/MapboxMap/MapboxMap';
import RequestsFilter from '../../components/MainPage/RequestsFilter';
import RequestsList from '../../components/MainPage/RequestsList';
import axios from 'axios';
import RequestDetailsModal from '../../components/MainPage/RequestDetailsModal';

const MainPage = () => {
    const [parcels, setParcels] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [currentFilter, setCurrentFilter] = useState('parcel');
    const [isModalOpen, setModalOpen] = useState(false);

    // State for map-specific data
    const [mapParcels, setMapParcels] = useState([]);
    const [mapDrivers, setMapDrivers] = useState([]);

    // Fetch order list data for the sidebar
    useEffect(() => {
        fetchRequests();
    }, []);

    useEffect(() => {
        filterRequests();
    }, [currentFilter, parcels, drivers]);

    // Fetch map-specific data
    useEffect(() => {
        fetchMapRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const driversResponse = await axios.get('/trip-requests/list-summary');
            const parcelsResponse = await axios.get('/parcel-requests/list-summary');
            setDrivers(driversResponse.data);
            setParcels(parcelsResponse.data);
        } catch (error) {
            console.error("Error fetching order list requests:", error);
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Navbar8 />
            <div style={{ display: 'flex', flexGrow: 1 }}>
                <div style={{ width: 600, padding: 15, borderRight: '1px solid #ddd' }}>
                    <RequestsFilter currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
                    <RequestsList
                        requests={filteredRequests}
                        currentFilter={currentFilter}
                        onSelectRequest={(id) => handleRequestSelect(id, currentFilter)}
                    />
                </div>
                <div style={{ flexGrow: 1 }}>
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
