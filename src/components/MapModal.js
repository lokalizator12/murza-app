// MapModal.js
import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import {Geocoder} from '@mapbox/search-js-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapModal.css'; // Подключаем стили

const accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapModal = ({isOpen, onClose, setAddress}) => {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [selectedLocation, setSelectedLocation] = useState(null);  // Сохраняем выбранное местоположение
    const [mapError, setMapError] = useState(false);

    useEffect(() => {
        if (isOpen && mapContainerRef.current && !mapInstanceRef.current) {
            mapboxgl.accessToken = accessToken;

            // Проверяем, что контейнер готов, перед инициализацией карты
            if (mapContainerRef.current) {
                try {
                    mapInstanceRef.current = new mapboxgl.Map({
                        container: mapContainerRef.current,
                        center: [15, 51],
                        zoom: 2,
                    });
                } catch (error) {
                    console.warn('Address map is unavailable in this browser', error);
                    setMapError(true);
                }
            }

            // Очистка карты при закрытии модального окна
            return () => {
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.remove();
                    mapInstanceRef.current = null;
                }
            };
        }
    }, [isOpen]);

    // Обработчик изменения адреса в Geocoder
    const handleGeocoderChange = (result) => {
        const address = result?.properties?.full_address || result?.properties?.name_preferred;
        if (result?.geometry?.coordinates && address) {
            setSelectedLocation({
                address,
                coordinates: result.geometry.coordinates,
            });

            //  mapInstanceRef.current.flyTo({center: result.properties.geometry.coordinates, zoom: 14});
        }
    };

    // Обработчик подтверждения выбора адреса
    const handleConfirm = () => {
        if (selectedLocation) {
            setAddress(selectedLocation);  // Передаем полное название и координаты
        }
        onClose();
    };

    if (!isOpen) {
        return null; // Модальное окно не отображается, если оно закрыто
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Choose an address</h2>
                    <button className="close-button" type="button" aria-label="Close address picker" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <div style={{marginBottom: '16px'}}>
                        <Geocoder
                            accessToken={accessToken}
                            map={mapInstanceRef.current}
                            mapboxgl={mapboxgl}
                            onRetrieve={handleGeocoderChange}
                            placeholder="Search for an address"
                            marker={!mapError}
                        />
                    </div>
                    <div ref={mapContainerRef} style={{height: mapError ? 0 : 400, minHeight: mapError ? 0 : 400}}/>
                    {mapError && <p className="murza-address-note">Map preview is unavailable. You can still search and select an address above.</p>}
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
                    <button type="button" onClick={handleConfirm} className="confirm-button" disabled={!selectedLocation}>
                        Use this address
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MapModal;
