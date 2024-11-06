import React, { useEffect, useState } from 'react';
import Navbar8 from '../../components/navbar8'; // Подключаем Navbar
import MapboxMap from '../components/MapboxMap'; // Компонент для карты Mapbox
import RequestFilters from '../../components/RequestFilters'; // Компонент фильтров
import RequestList from './components/RequestList'; // Компонент списка запросов
import axios from 'axios';

const MainPage = () => {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [requestType, setRequestType] = useState('all'); // 'drivers' или 'parcels'

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const driversResponse = await axios.get('/api/driver-requests');
            const parcelsResponse = await axios.get('/api/parcel-requests');
            setRequests([...driversResponse.data, ...parcelsResponse.data]);
        } catch (error) {
            console.error("Ошибка при получении запросов:", error);
        }
    };

    // Обработка фильтров
    const handleFilterChange = (filters) => {
        // Примените фильтры к списку запросов
        const filtered = requests.filter(request => {
            // Логика фильтрации в зависимости от filters и requestType
            return true;
        });
        setFilteredRequests(filtered);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* Navbar8 */}
            <Navbar8 />

            {/* Основное содержимое */}
            <div style={{ display: 'flex', flexGrow: 1 }}>
                {/* Левая панель с фильтрами и списком запросов */}
                <div style={{ width: '300px', padding: '10px', borderRight: '1px solid #ddd' }}>
                    <div>
                        <button onClick={() => setRequestType('parcels')}>Посылки</button>
                        <button onClick={() => setRequestType('drivers')}>Водители</button>
                    </div>
                    <RequestFilters onFilterChange={handleFilterChange} />
                    <RequestList
                        requests={filteredRequests}
                        onSelectRequest={(request) => setSelectedRequest(request)}
                    />
                </div>

                {/* Карта с метками */}
                <div style={{ flexGrow: 1 }}>
                    <MapboxMap
                        requests={filteredRequests}
                        selectedRequest={selectedRequest}
                        onSelectRequest={(request) => setSelectedRequest(request)}
                    />
                </div>
            </div>
        </div>
    );
};

export default MainPage;
