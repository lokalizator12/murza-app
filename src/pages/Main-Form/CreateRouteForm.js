import React, {useState, useRef, useEffect, useCallback} from 'react';
import Map, { Marker, Source, Layer, NavigationControl } from 'react-map-gl';
import mapboxSdk from '@mapbox/mapbox-sdk/services/directions';
import mapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import Modal from 'react-modal';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './CreateRouteForm.css';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const directionsClient = mapboxSdk({ accessToken: MAPBOX_TOKEN });
const geocodingClient = mapboxGeocoding({ accessToken: MAPBOX_TOKEN });

const CreateRouteForm = ({ nextStep, formData, setFormData }) => {
    const [route, setRoute] = useState(null);
    const [isRouteValid, setIsRouteValid] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [locationSetter, setLocationSetter] = useState(null);
    const [selectedOption, setSelectedOption] = useState(formData.selectedOption || null);
    const [fromLocation, setFromLocation] = useState(formData.fromLocation || '');
    const [toLocation, setToLocation] = useState(formData.toLocation || '');
    const [fromCoords, setFromCoords] = useState(formData.fromCoords || null);
    const [toCoords, setToCoords] = useState(formData.toCoords || null);
    const [shippingMethod, setShippingMethod] = useState(formData.shippingMethod || null)
    const mapRef = useRef();
    const modalMapRef = useRef();

    // Открыть модальное окно для выбора места
    const openModal = (setLocation, setCoords) => {
        setLocationSetter(() => ({ setLocation, setCoords }));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setShippingMethod(null);
    };

    const getProfile = (method) => {
        switch (method) {
            case 'Car':
                return 'driving';
            case 'Bus':
                return 'driving-traffic';
            case 'Walk':
                return 'walking';
            case 'Bicycle':
                return 'cycling';
            default:
                return 'driving';
        }
    };

    const getRoute = useCallback(async (start, end) => {
        const profile = getProfile(shippingMethod);
        const response = await directionsClient
            .getDirections({
                profile,
                waypoints: [
                    { coordinates: start },
                    { coordinates: end }
                ]
            })
            .send();

        const routeGeoJson = {
            type: 'Feature',
            geometry: response.body.routes[0].geometry
        };
        setRoute(routeGeoJson);
    }, [shippingMethod]);

    const setFormDataCallback = useCallback((newData) => {
        setFormData((prevData) => ({ ...prevData, ...newData }));
    }, [setFormData]);


    useEffect(() => {
        setFormDataCallback({
            selectedOption,
            fromLocation,
            toLocation,
            fromCoords,
            toCoords,
            shippingMethod
        });

        if (selectedOption === 'Send Package') {
            setIsRouteValid(!!fromCoords && !!toCoords);
        } else if (selectedOption === 'Pick Up Package') {
            if (fromCoords && toCoords && shippingMethod) {
                getRoute(fromCoords, toCoords).then(() => setIsRouteValid(true));
            } else {
                setIsRouteValid(false);
            }
        }
    }, [selectedOption, fromLocation, toLocation, fromCoords, toCoords, shippingMethod, getRoute, setFormDataCallback]);

    // Адаптивный поиск с подсказками для поля ввода
    const handleInputChange = async (value, setLocation, setCoords) => {
        setLocation(value);
        if (value.length > 3) {
            const response = await geocodingClient.forwardGeocode({
                query: value,
                limit: 1,
            }).send();

            if (response && response.body.features.length) {
                const { place_name, center } = response.body.features[0];
                setLocation(place_name);
                setCoords(center);
            }
        }
    };

    // Функция выбора места на карте в модальном окне
    const handleMapClick = async (e) => {
        const coordinates = e.lngLat;
        const response = await geocodingClient.reverseGeocode({
            query: [coordinates.lng, coordinates.lat],
            limit: 1,
        }).send();

        if (response && response.body.features.length) {
            const placeName = response.body.features[0].place_name;
            locationSetter.setLocation(placeName);
            locationSetter.setCoords([coordinates.lng, coordinates.lat]);
            closeModal();
        }
    };

    return (
        <div className="create-route-form">
            {/* Progress Bar */}
            <div className="progress-bar">
                <div className={`step ${selectedOption === 'Send Package' || selectedOption === 'Pick Up Package' ? 'active' : ''}`}>
                    <div className="step-icon">📍</div>
                    <div className="step-label">Location</div>
                </div>
                <div className={`step ${shippingMethod ? 'active' : ''}`}>
                    <div className="step-icon">🚚</div>
                    <div className="step-label">Type</div>
                </div>
                <div className="step">
                    <div className="step-icon">🏢</div>
                    <div className="step-label">Facilities</div>
                </div>
                <div className="step">
                    <div className="step-icon">💬</div>
                    <div className="step-label">Comments</div>
                </div>
            </div>

            <h1 className="form-title">List Your Place</h1>
            <p className="form-subtitle">This information will let us know more about your place.</p>

            {/* Delivery Option Selector */}
            <div className="option-selector">
                <button
                    className={`option-button ${selectedOption === 'Send Package' ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect('Send Package')}
                >
                    Send Package
                </button>
                <button
                    className={`option-button ${selectedOption === 'Pick Up Package' ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect('Pick Up Package')}
                >
                    Pick Up Package
                </button>
            </div>

            {/* Location Inputs */}
            <div className="input-group">
                <label>From</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        value={fromLocation}
                        onChange={(e) => handleInputChange(e.target.value, setFromLocation, setFromCoords)}
                        placeholder="Enter departure location"
                    />
                    <button onClick={() => openModal(setFromLocation, setFromCoords)}>Select on Map</button>
                </div>
            </div>

            <div className="input-group">
                <label>To</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        value={toLocation}
                        onChange={(e) => handleInputChange(e.target.value, setToLocation, setToCoords)}
                        placeholder="Enter destination location"
                    />
                    <button onClick={() => openModal(setToLocation, setToCoords)}>Select on Map</button>
                </div>
            </div>

            {/* Delivery Type Switches */}
            {selectedOption === 'Pick Up Package' && (
                <div className="input-group">
                    <label>Delivery Type</label>
                    <select
                        value={shippingMethod || ''}
                        onChange={(e) => setShippingMethod(e.target.value)}
                    >
                        <option value="" disabled>Select type of delivery</option>
                        <option value="Bus">Bus</option>
                        <option value="Car">Car</option>
                        <option value="Walk">Walk</option>
                        <option value="Bicycle">Bicycle</option>
                    </select>
                </div>
            )}

            <div className="map-container">
                <Map
                    ref={mapRef}
                    initialViewState={{
                        longitude: 37.6173,
                        latitude: 55.7558,
                        zoom: 10
                    }}
                    style={{ width: '100%', height: '300px', borderRadius: '8px' }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxAccessToken={MAPBOX_TOKEN}
                >
                    <NavigationControl position="top-left" />
                    {fromCoords && <Marker longitude={fromCoords[0]} latitude={fromCoords[1]} color="red" />}
                    {toCoords && <Marker longitude={toCoords[0]} latitude={toCoords[1]} color="blue" />}
                    {route && (
                        <Source id="route" type="geojson" data={route}>
                            <Layer
                                id="route"
                                type="line"
                                paint={{
                                    'line-color': '#ff7a00',
                                    'line-width': 4
                                }}
                            />
                        </Source>
                    )}
                </Map>
            </div>

            {/* Модальное окно для выбора местоположения */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Select Location"
                className="modal"
                overlayClassName="overlay"
            >
                <Map
                    ref={modalMapRef}
                    initialViewState={{
                        longitude: 37.6173,
                        latitude: 55.7558,
                        zoom: 10
                    }}
                    style={{ width: '100%', height: '400px', borderRadius: '8px' }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxAccessToken={MAPBOX_TOKEN}
                    onClick={handleMapClick}
                >
                    <NavigationControl position="top-left" />
                </Map>
                <button onClick={closeModal} className="close-modal">Close</button>
            </Modal>

            {/* Wizard Footer */}
            <div className="wizard-footer">
                <button
                    className="next-button"
                    onClick={nextStep}
                    disabled={!isRouteValid}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CreateRouteForm;
