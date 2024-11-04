import React, {useEffect, useState} from 'react';
import MapModal from './../../components/MapModal';
import RouteMap from './../../components/RouteMap';
import './TripStep1.css';

const TripStep1 = ({formData, handleChange, setIsNextEnabled}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedDeparture, setSelectedDeparture] = useState(formData.departureAddress || '');
    const [selectedDestination, setSelectedDestination] = useState(formData.destinationAddress || '');
    const [waypoints, setWaypoints] = useState(formData.waypoints || []);
    const [transportType, setTransportType] = useState('driving');

    useEffect(() => {
        setIsNextEnabled(!!selectedDeparture && !!selectedDestination);
    }, [selectedDeparture, selectedDestination, setIsNextEnabled]);
    const handleOpenModal = (type) => {
        setModalType(type);
        setModalOpen(true);
    };

    const handleCloseModal = () => setModalOpen(false);

    const updateDepartureFromMap = (location) => {
        const {address, coordinates} = location;
        setSelectedDeparture(address);
        handleChange('departureAddress', address);
        handleChange('departureCoordinates', coordinates);
        handleCloseModal();
    };

    const updateDestinationFromMap = (location) => {
        const {address, coordinates} = location;
        setSelectedDestination(address);
        handleChange('destinationAddress', address);
        handleChange('destinationCoordinates', coordinates);
        handleCloseModal();
    };

    const addWaypoint = (location) => {
        const {address, coordinates} = location;
        const updatedWaypoints = [...waypoints, {address, coordinates}];
        setWaypoints(updatedWaypoints);
        handleChange('waypoints', updatedWaypoints);
        handleCloseModal();
    };

    const removeWaypoint = (index) => {
        const updatedWaypoints = waypoints.filter((_, i) => i !== index);
        setWaypoints(updatedWaypoints);
        handleChange('waypoints', updatedWaypoints);
    };

    const handleTransportTypeChange = (type) => {
        setTransportType(type);
        handleChange('transportType', type);
    };

    return (
        <div className="container">
            <div className="header">Request a Trip</div>
            <div className="subheader">Step 1: Location and Transport Type</div>

            {/* Departure Address */}
            <div className="input-group">
                <input
                    type="text"
                    className="input-field"
                    value={selectedDeparture}
                    readOnly
                    placeholder="Departure Address"
                />
                <button className="button" onClick={() => handleOpenModal('departure')}>Set</button>
            </div>

            {/* Destination Address */}
            <div className="input-group">
                <input
                    type="text"
                    className="input-field"
                    value={selectedDestination}
                    readOnly
                    placeholder="Destination Address"
                />
                <button className="button" onClick={() => handleOpenModal('destination')}>Set</button>
            </div>

            {/* Waypoints */}
            <div>
                <button className="button" onClick={() => handleOpenModal('waypoint')}>Add Waypoint</button>
                <div className="waypoints-list">
                    {waypoints.map((waypoint, index) => (
                        <div key={index} className="waypoint-item">
                            <span>{waypoint.address}</span>
                            <button onClick={() => removeWaypoint(index)}>✕</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Transport Type Selection */}
            <div className="transport-selection">
                <label>
                    <input
                        type="radio"
                        name="transportType"
                        value="walking"
                        checked={transportType === 'walking'}
                        onChange={() => handleTransportTypeChange('walking')}
                    />
                    Walking
                </label>
                <label>
                    <input
                        type="radio"
                        name="transportType"
                        value="cycling"
                        checked={transportType === 'cycling'}
                        onChange={() => handleTransportTypeChange('cycling')}
                    />
                    Cycling
                </label>
                <label>
                    <input
                        type="radio"
                        name="transportType"
                        value="driving"
                        checked={transportType === 'driving'}
                        onChange={() => handleTransportTypeChange('driving')}
                    />
                    Car / Bus
                </label>
            </div>

            {/* Map Modal */}
            <MapModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                setAddress={
                    modalType === 'departure'
                        ? updateDepartureFromMap
                        : modalType === 'destination'
                            ? updateDestinationFromMap
                            : addWaypoint
                }
            />

            {/* Route Map */}
            <RouteMap
                pickupCoordinates={formData.departureCoordinates}
                destinationCoordinates={formData.destinationCoordinates}
                waypoints={waypoints.map(wp => wp.coordinates)}
                transportType={transportType}
            />

            {/* Route Info */}
            <div className="route-info">
                {formData.distance && <p>Total distance: {formData.distance} km</p>}
                {formData.duration && <p>Estimated travel time: {formData.duration} minutes</p>}
            </div>
        </div>
    );
};

export default TripStep1;
