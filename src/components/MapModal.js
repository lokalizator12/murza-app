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
    const [inputValue, setInputValue] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(null);  // Сохраняем выбранное местоположение

    useEffect(() => {
        if (isOpen && mapContainerRef.current && !mapInstanceRef.current) {
            mapboxgl.accessToken = accessToken;

            // Проверяем, что контейнер готов, перед инициализацией карты
            if (mapContainerRef.current) {
                mapInstanceRef.current = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    center: [-74.5, 40],
                    zoom: 1,
                });

                mapInstanceRef.current.on("load", () => {
                    console.log("Карта загружена");
                });
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
        console.log(result);
        console.log(result.geometry);
        console.log(result.properties.full_address);

        if (result && result.geometry && result.properties.full_address) {
            setInputValue(result.properties.full_address);
            setSelectedLocation({
                address: result.properties.full_address,
                coordinates: result.geometry.coordinates,
            });

            //  mapInstanceRef.current.flyTo({center: result.properties.geometry.coordinates, zoom: 14});
        }
    };

    // Обработчик подтверждения выбора адреса
    const handleConfirm = () => {
        if (selectedLocation) {
            setAddress(selectedLocation);  // Передаем полное название и координаты
            console.log("Передаем адрес и координаты:", selectedLocation); // Для отладки
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
                    <h2>Укажите адрес на карте</h2>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div className="modal-body">
                    <div style={{marginBottom: '16px'}}>
                        <Geocoder
                            accessToken={accessToken}
                            map={mapInstanceRef.current}
                            mapboxgl={mapboxgl}
                            onRetrieve={(d) => {
                                setInputValue(d);
                                handleGeocoderChange(d);
                            }}
                            placeholder="Введите адрес"
                            marker
                        />
                    </div>
                    <div ref={mapContainerRef} style={{height: 400, minHeight: 400}}/>
                </div>
                <div className="modal-footer">
                    <button onClick={onClose} className="cancel-button">Отмена</button>
                    <button onClick={handleConfirm} className="confirm-button" disabled={!selectedLocation}>
                        Подтвердить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MapModal;
