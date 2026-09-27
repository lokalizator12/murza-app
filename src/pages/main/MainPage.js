import React, {useCallback, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Dialog, Pagination} from '@mui/material';
import MapboxMap from '../../components/MainPage/MapboxMap/MapboxMap';
import RequestsFilter from '../../components/MainPage/RequestsFilter';
import RequestsList from '../../components/MainPage/RequestsList';
import RequestDetailsModal from '../../components/MainPage/RequestDetailsModal';
import RequestsFilterPanel from '../../components/MainPage/RequestsFilterPanel';
import RequestForm from '../test-wizard/MainFormRequest';
import axios from '../../axiosConfig';
import './MainPage.css';

const MainPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const requestedType = searchParams.get('type') === 'trip' ? 'trip' : 'parcel';
    const requestedCreate = searchParams.get('create');
    const [currentFilter, setCurrentFilter] = useState(requestedType);
    const [requests, setRequests] = useState({parcel: [], trip: []});
    const [mapRequests, setMapRequests] = useState({parcel: [], trip: []});
    const [totalPages, setTotalPages] = useState({parcel: 0, trip: 0});
    const [pages, setPages] = useState({parcel: 0, trip: 0});
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showRequestDialog, setShowRequestDialog] = useState(false);
    const [requestKind, setRequestKind] = useState(null);
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

    useEffect(() => setCurrentFilter(requestedType), [requestedType]);
    useEffect(() => {
        if (requestedCreate === 'parcel' || requestedCreate === 'trip') {
            setRequestKind(requestedCreate);
            setShowRequestDialog(true);
        }
    }, [requestedCreate]);

    const fetchMapRequests = useCallback(async () => {
        try {
            const [trips, parcels] = await Promise.all([
                axios.get('/trip-requests/list-map'),
                axios.get('/parcel-requests/list-map')
            ]);
            setMapRequests({trip: trips.data || [], parcel: parcels.data || []});
        } catch (fetchError) {
            // The list remains usable when map markers fail to load.
            console.error('Unable to load map markers', fetchError);
        }
    }, []);

    const fetchRequests = useCallback(async (type, page, activeFilters) => {
        setLoading(true);
        setError('');
        try {
            const params = new URLSearchParams({page: String(page), size: '7'});
            Object.entries(activeFilters).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') params.set(key, String(value));
            });
            const endpoint = type === 'parcel' ? 'parcel-requests' : 'trip-requests';
            const response = await axios.get(`/${endpoint}/list-summary?${params}`);
            setRequests(previous => ({...previous, [type]: response.data.content || []}));
            setTotalPages(previous => ({...previous, [type]: response.data.totalPages || 0}));
        } catch (fetchError) {
            setError('Requests could not be loaded. Please try again.');
            setRequests(previous => ({...previous, [type]: []}));
            console.error('Unable to load requests', fetchError);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRequests(currentFilter, pages[currentFilter], filters);
    }, [currentFilter, pages, filters, fetchRequests]);
    useEffect(() => { fetchMapRequests(); }, [fetchMapRequests]);

    const handleFilterChange = (type) => {
        setCurrentFilter(type);
        setFilters({});
        setPages(previous => ({...previous, [type]: 0}));
        setSearchParams({type});
    };
    const handleApplyFilters = (nextFilters) => {
        setPages(previous => ({...previous, [currentFilter]: 0}));
        setFilters(nextFilters);
    };
    const handleOpenRequestDialog = (kind) => {
        setRequestKind(kind);
        setShowRequestDialog(true);
        setSearchParams({type: currentFilter, create: kind});
    };
    const handleCloseRequestDialog = () => {
        setShowRequestDialog(false);
        setRequestKind(null);
        setSearchParams({type: currentFilter});
    };
    const refreshRequestsData = () => {
        fetchRequests(currentFilter, pages[currentFilter], filters);
        fetchMapRequests();
    };
    const handleRequestSelect = async (requestId, type = currentFilter) => {
        try {
            const endpoint = type === 'parcel' ? 'parcel-requests' : 'trip-requests';
            const response = await axios.get(`/${endpoint}/${requestId}`);
            setSelectedRequest({data: response.data, type});
        } catch (fetchError) {
            setError('Request details could not be loaded. Please try again.');
            console.error('Unable to load request details', fetchError);
        }
    };

    return (
        <main className="murza-board">
            <div className="murza-board-head">
                <div className="murza-container murza-board-head-inner">
                    <div>
                        <span className="murza-eyebrow">The Murza map</span>
                        <h1>Find the route that fits.</h1>
                        <p>Browse posted parcels and trips, then open a request to connect.</p>
                    </div>
                    <img src="/images/murza-delivery.webp" alt="" aria-hidden="true"/>
                </div>
            </div>
            <div className="murza-board-workspace">
                <aside className="murza-board-sidebar" aria-label="Requests">
                    <div className="murza-board-actions">
                        <button className="murza-button murza-button-small" type="button" onClick={() => handleOpenRequestDialog('parcel')}>+ Post a parcel</button>
                        <button className="murza-button murza-button-outline murza-button-small" type="button" onClick={() => handleOpenRequestDialog('trip')}>+ Post a trip</button>
                    </div>
                    <RequestsFilter currentFilter={currentFilter} onFilterChange={handleFilterChange}/>
                    <button className="murza-filter-toggle" type="button" onClick={() => setIsFilterPanelOpen(open => !open)}
                            aria-expanded={isFilterPanelOpen} aria-controls="murza-filters">
                        {isFilterPanelOpen ? 'Hide filters' : 'Show filters'} <span aria-hidden="true">{isFilterPanelOpen ? '−' : '+'}</span>
                    </button>
                    {isFilterPanelOpen && <div id="murza-filters"><RequestsFilterPanel
                        onApplyFilters={handleApplyFilters} onResetFilters={() => handleApplyFilters({})}
                        currentFilter={currentFilter}/></div>}
                    <div className="murza-list-heading">
                        <h2>{currentFilter === 'parcel' ? 'Parcel requests' : 'Available trips'}</h2>
                        <span>{loading ? 'Loading…' : `${requests[currentFilter].length} shown`}</span>
                    </div>
                    {error && <div className="murza-board-error" role="alert">{error} <button type="button" onClick={() => fetchRequests(currentFilter, pages[currentFilter], filters)}>Retry</button></div>}
                    {loading ? <div className="murza-board-status" role="status">Loading requests…</div> :
                        <RequestsList requests={requests[currentFilter]} currentFilter={currentFilter}
                                      onSelectRequest={id => handleRequestSelect(id)}/>}
                    {totalPages[currentFilter] > 1 && <div className="murza-board-pagination">
                        <Pagination count={totalPages[currentFilter]} page={pages[currentFilter] + 1}
                                    onChange={(_, page) => setPages(previous => ({...previous, [currentFilter]: page - 1}))}/>
                    </div>}
                </aside>
                <section className="murza-board-map" aria-label="Request map">
                    <MapboxMap mapParcels={mapRequests.parcel} mapDrivers={mapRequests.trip}
                               selectedType={currentFilter} onRequestSelect={handleRequestSelect}/>
                </section>
            </div>
            <Dialog open={showRequestDialog} onClose={handleCloseRequestDialog} fullWidth maxWidth="md">
                <RequestForm key={requestKind || 'choose'} initialType={requestKind}
                             onClose={handleCloseRequestDialog} onRefreshData={refreshRequestsData}/>
            </Dialog>
            {selectedRequest && <RequestDetailsModal open onClose={() => setSelectedRequest(null)}
                                                     request={selectedRequest.data} requestType={selectedRequest.type}/>}
        </main>
    );
};
export default MainPage;
