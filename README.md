# Murza frontend

Murza connects people sending parcels with people already making a trip. Members can post parcel or trip requests, browse routes and contact each other.

## Run locally

Use Node.js 20 and npm:

```sh
npm ci --legacy-peer-deps
npm start
```

Set `REACT_APP_MAPBOX_TOKEN` for maps and address search. `REACT_APP_RECAPTCHA_SITE_KEY` is used by the auth flow. The frontend uses `http://localhost:8080/api/` during local development; set `REACT_APP_API_BASE_URL` to use another backend. Do not put server secrets in `REACT_APP_*` variables because they are included in the browser build.

## Check changes

```sh
CI=true npm test -- --watch=false --runInBand
npm run build
```

The main entry points are `/` (landing), `/main` (authenticated request board), `/about` and `/legal` (service information). Parcel and trip links use `/main?type=parcel|trip`; posting links use `/main?create=parcel|trip`. Visitors return to the selected action after login.

Brand illustrations are stored in `public/images/`. The board still shows request lists when WebGL is unavailable, although the map preview needs WebGL.

Murza currently helps members find and discuss a route. It does not provide live parcel tracking, process payments or transport parcels itself.
