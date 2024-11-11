export const BASE_URL = "http://localhost:3000";
// iconUrls.js
const AWS_MAIN_MAP_ICON_BASE_URL = 'https://murza-picture-store.s3.eu-north-1.amazonaws.com/front-end/main-page/map/marker-icons';

export const ICON_URLS = {
    TRIP_START: `${AWS_MAIN_MAP_ICON_BASE_URL}/trip-a.png`,
    TRIP_END: `${AWS_MAIN_MAP_ICON_BASE_URL}/trip-c.png`,
    PARCEL_START: `${AWS_MAIN_MAP_ICON_BASE_URL}/parcel-a.png`,
    PARCEL_END: `${AWS_MAIN_MAP_ICON_BASE_URL}/parcel-b.png`,
    INTERMEDIATE: `${AWS_MAIN_MAP_ICON_BASE_URL}/trip-b.png`
};
