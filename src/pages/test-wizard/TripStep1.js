// TripStep1.js
import React, {useEffect, useState} from 'react';
import MapModal from './../../components/MapModal';
import RouteMap from './../../components/RouteMap';
import './TripStep1.css';

const TripStep1 = ({formData, handleChange, setIsNextEnabled}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedDeparture, setSelectedDeparture] = useState(formData.departureAddress || '');
    const [selectedDestination, setSelectedDestination] = useState(formData.destinationAddress || '');
    const [waypoints, setWaypoints] = useState(formData.intermediateLocations || []);

    // Инициализация типа транспорта из formData
    const [transportType, setTransportType] = useState(
        formData.shippingMethodId === 1 ? 'walking' :
            formData.shippingMethodId === 2 ? 'cycling' : 'driving'
    );
    useEffect(() => {
        const shippingMethodId = transportType === 'walking' ? 1 : transportType === 'cycling' ? 2 : 3;
        handleChange('shippingMethodId', shippingMethodId);
    }, [transportType, handleChange]);

    // Валидация для активации кнопки "Next"
    useEffect(() => {
        setIsNextEnabled(!!selectedDeparture && !!selectedDestination);
    }, [selectedDeparture, selectedDestination, setIsNextEnabled]);

    const handleOpenModal = (type) => {
        setModalType(type);
        setModalOpen(true);
    };

    const handleCloseModal = () => setModalOpen(false);

    // Обновление адреса отправления
    const updateDepartureFromMap = (location) => {
        const {address, coordinates} = location;
        setSelectedDeparture(address);
        handleChange('departureAddress', address);
        handleChange('departureLatitude', coordinates[1]);
        handleChange('departureLongitude', coordinates[0]);
        handleCloseModal();
    };

    // Обновление адреса назначения
    const updateDestinationFromMap = (location) => {
        const {address, coordinates} = location;
        setSelectedDestination(address);
        handleChange('destinationAddress', address);
        handleChange('destinationLatitude', coordinates[1]);
        handleChange('destinationLongitude', coordinates[0]);
        handleCloseModal();
    };

    // Добавление промежуточной точки как { latitude, longitude, address }
    const addWaypoint = (location) => {
        const {address, coordinates} = location;
        const updatedWaypoints = [
            ...waypoints,
            {latitude: coordinates[1], longitude: coordinates[0], address}
        ];
        setWaypoints(updatedWaypoints);
        handleChange('intermediateLocations', updatedWaypoints); // Сохранение в formData
        handleCloseModal();
    };

    // Удаление промежуточной точки
    const removeWaypoint = (index) => {
        const updatedWaypoints = waypoints.filter((_, i) => i !== index);
        setWaypoints(updatedWaypoints);
        handleChange('intermediateLocations', updatedWaypoints);
    };

    // Обработка изменения типа транспорта
    const handleTransportTypeChange = (type) => {
        setTransportType(type);
        const shippingMethodId = type === 'walking' ? 1 : type === 'cycling' ? 2 : 3; // Пример: 1 = walking, 2 = cycling, 3 = driving
        handleChange('shippingMethodId', shippingMethodId);
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
                pickupCoordinates={formData.departureLatitude && formData.departureLongitude ? [formData.departureLongitude, formData.departureLatitude] : null}
                destinationCoordinates={formData.destinationLatitude && formData.destinationLongitude ? [formData.destinationLongitude, formData.destinationLatitude,] : null}
                waypoints={waypoints.map(wp => [wp.longitude, wp.latitude])}
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
