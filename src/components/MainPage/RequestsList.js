import React from 'react';
import './RequestsList.css';

const formatDate = value => {
    if (!value) return 'Date to be confirmed';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 'Date to be confirmed' : date.toLocaleDateString();
};

const RequestsList = ({requests, currentFilter, onSelectRequest}) => {
    if (!requests.length) return (
        <div className="murza-empty-list">
            <span aria-hidden="true">✦</span>
            <h3>No {currentFilter === 'parcel' ? 'parcels' : 'trips'} found yet</h3>
            <p>Try another filter or post your own {currentFilter === 'parcel' ? 'parcel' : 'trip'} request.</p>
        </div>
    );

    return <div className="murza-request-list">
        {requests.map(request => {
            const isParcel = currentFilter === 'parcel';
            const id = isParcel ? request.idParcel : request.idTrip;
            const title = request.title || (isParcel ? 'Parcel request' : `Trip by ${request.driverFirstName || 'a traveller'}`);
            const from = isParcel ? request.pickupAddress : request.departureAddress;
            const to = isParcel ? request.deliveryAddress : request.destinationAddress;
            const date = isParcel ? request.pickupDate : request.departureDate;
            return <article className="murza-request-card" key={id}>
                <div className="murza-request-card-top">
                    {isParcel && request.previewPhoto
                        ? <img src={request.previewPhoto} alt="Parcel preview" loading="lazy"/>
                        : <div className="murza-request-icon" aria-hidden="true">{isParcel ? '▣' : '↗'}</div>}
                    <div><span className="murza-request-type">{isParcel ? 'Parcel' : 'Trip'}</span><h3>{title}</h3></div>
                </div>
                <p className="murza-request-route"><span>{from || 'Origin to be confirmed'}</span><span className="murza-route-arrow" aria-hidden="true">→</span><span>{to || 'Destination to be confirmed'}</span></p>
                <div className="murza-request-card-bottom"><span>{formatDate(date)}</span>
                    <button type="button" onClick={() => onSelectRequest(id)}>View details ↗</button></div>
            </article>;
        })}
    </div>;
};
export default RequestsList;
