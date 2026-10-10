// TripStep1.js
import React, {useEffect, useState} from 'react';
import MapModal from './../../components/MapModal';
import RouteMap from './../../components/RouteMap';
import axios from '../../axiosConfig';
import './TripStep1.css';

const TripStep1 = ({formData, handleChange, setIsNextEnabled}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedDeparture, setSelectedDeparture] = useState(formData.departureAddress || '');
    const [selectedDestination, setSelectedDestination] = useState(formData.destinationAddress || '');
    const [waypoints, setWaypoints] = useState(formData.intermediateLocations || []);
    const [shippingMethods, setShippingMethods] = useState([]);

    // Инициализация типа транспорта из formData
    const [transportType, setTransportType] = useState(formData.transportType || 'driving');

    useEffect(() => {
        axios.get('/shipping-methods')
            .then(({data}) => setShippingMethods(data))
            .catch((error) => console.error('Failed to load shipping methods:', error));
    }, []);

    useEffect(() => {
        const methodName = {walking: 'Walking', cycling: 'Bicycle', driving: 'Car'}[transportType];
        const method = shippingMethods.find(({methodName: name}) => name.toLowerCase() === methodName.toLowerCase());
        if (method && formData.shippingMethodId !== method.id) {
            handleChange('shippingMethodId', method.id);
        }
    }, [shippingMethods, transportType, formData.shippingMethodId, handleChange]);

    // Валидация для активации кнопки "Next"
    useEffect(() => {
        setIsNextEnabled(!!selectedDeparture && !!selectedDestination && !!formData.shippingMethodId);
    }, [selectedDeparture, selectedDestination, formData.shippingMethodId, setIsNextEnabled]);

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
        handleChange('transportType', type);
    };

    return (
        <div className="trip-route-container">
            <div className="trip-route-subheader">Your route and travel method</div>

            {/* Departure Address */}
            <div className="trip-route-input-group">
                <input
                    type="text"
                    className="trip-route-input"
                    value={selectedDeparture}
                    readOnly
                    placeholder="Departure Address"
                />
                <button type="button" className="trip-route-button" onClick={() => handleOpenModal('departure')}>Choose on map</button>
            </div>

            {/* Destination Address */}
            <div className="trip-route-input-group">
                <input
                    type="text"
                    className="trip-route-input"
                    value={selectedDestination}
                    readOnly
                    placeholder="Destination Address"
                />
                <button type="button" className="trip-route-button" onClick={() => handleOpenModal('destination')}>Choose on map</button>
            </div>

            {/* Waypoints */}
            <div>
                <button type="button" className="trip-route-button" onClick={() => handleOpenModal('waypoint')}>Add a stop</button>
                <div className="trip-route-waypoints">
                    {waypoints.map((waypoint, index) => (
                        <div key={index} className="trip-route-waypoint">
                            <span>{waypoint.address}</span>
                            <button type="button" onClick={() => removeWaypoint(index)} aria-label={`Remove stop ${index + 1}`}>✕</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Transport Type Selection */}
            <div className="trip-route-transport">
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
                    Car
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
            <div className="trip-route-info">
                {formData.distance && <p>Total distance: {formData.distance} km</p>}
                {formData.duration && <p>Estimated travel time: {formData.duration} minutes</p>}
            </div>
        </div>
    );
};

export default TripStep1;
