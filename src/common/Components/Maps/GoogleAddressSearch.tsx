import { useCallback, useRef, useState, type FC } from 'react';
import { GoogleMap, useJsApiLoader, Autocomplete, } from '@react-google-maps/api'
import { Icons } from '../../Constants/Icons';
import type { Location } from './interfaces';
import Loader from '../Loader/Loader';

const containerStyle = {
    width: '100%',
    height: '100%',
}

const DEFAULT_CENTER: google.maps.LatLngLiteral = { lat: 19.4326, lng: -99.1332 }

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const MAP_LIBRARIES = ['places'] as const;

const GoogleAddressSearch: FC<{
    initLocation?: google.maps.LatLngLiteral,
    onLocationChange: (location: Location) => void
}> = ({
    initLocation = DEFAULT_CENTER,
    onLocationChange
}) => {

        const [initVals] = useState(() => initLocation)

        const { isLoaded } = useJsApiLoader({
            googleMapsApiKey: API_KEY,
            libraries: [...MAP_LIBRARIES],
        })

        const [address, setAddress] = useState('');
        const [locating, setLocating] = useState(false);
        const [isDragging, setIsDragging] = useState(false)

        const mapRef = useRef<google.maps.Map | null>(null);
        const autoRef = useRef<google.maps.places.Autocomplete | null>(null);
        const geocoderRef = useRef<google.maps.Geocoder | null>(null);

        const changeLocation = (latLng: google.maps.LatLngLiteral) => {
            geocoderRef.current?.geocode({ location: latLng }, (res, status) => {
                if (status === 'OK' && res?.[0]) {
                    const address = res[0].formatted_address
                    setAddress(address)
                    onLocationChange({
                        latitude: latLng.lat,
                        longitude: latLng.lng,
                        address: address
                    })
                }
            })
        }

        const handleIdle = useCallback(() => {
            const map = mapRef.current;
            if (!map) return;

            const latLng = map.getCenter();
            if (!latLng) return;
            changeLocation({ lat: latLng.lat(), lng: latLng.lng() })
        }, [])


        const onAutoLoad = useCallback((auto: google.maps.places.Autocomplete) => {
            autoRef.current = auto;
        }, []);


        const onPlaceChanged = useCallback(() => {
            const place = autoRef.current?.getPlace();
            if (place?.geometry?.location) {
                const loc = place.geometry.location;
                const latLng = { lat: loc.lat(), lng: loc.lng() };
                const { formatted_address: address } = place

                setAddress(address ?? '');
                mapRef.current?.panTo(latLng);
                mapRef.current?.setZoom(17);
            }
        }, []);

        const handleLocate = useCallback(() => {
            if (!navigator.geolocation) {
                alert('Geolocalización no soportada en este navegador.');
                return;
            }
            setLocating(true);
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const latLng = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    };

                    mapRef.current?.panTo(latLng);
                    mapRef.current?.setZoom(17);

                    setLocating(false)
                },
                (err) => {
                    console.error(err);
                    alert('No se pudo obtener la ubicación.');
                    setLocating(false);
                },
                { enableHighAccuracy: true, timeout: 10_000 }
            );
        }, []);

        if (!isLoaded) return <div className='w-12'><Loader message='Cargando mapas...' /></div>

        return (
            <div className='flex-1 gap-2 flex flex-col'>
                <div className="flex w-full gap-2">
                    <Autocomplete className='w-full' onLoad={onAutoLoad} onPlaceChanged={onPlaceChanged}>
                        <input
                            className="base-input w-full input-valid"
                            placeholder="Busca una dirección…"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Autocomplete>

                    <button
                        className="btn btn-primary size-10 total-center"
                        onClick={handleLocate}
                        disabled={locating}
                        title="Usar mi ubicación"
                    >
                        {locating ? <div className='size-6 total-center'><Loader /></div> : <Icons.CurrentLocation size="20px" />}
                    </button>

                </div>
                <GoogleMap
                    // key={`${initLocation.lat}-${initLocation.lng}`}
                    mapContainerStyle={containerStyle}
                    center={initVals}
                    zoom={15}
                    onLoad={(m) => {
                        mapRef.current = m;
                        geocoderRef.current = new google.maps.Geocoder();
                    }}
                    onIdle={handleIdle}
                    options={{ streetViewControl: false }}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                >
                    <div className='absolute bottom-1/2 left-1/2 -translate-x-1/2 pointer-events-none'>
                        <div className={`${isDragging ? "opacity-70 -translate-y-2" : ""} duration-150`}>
                            <Icons.Location className='size-8 text-red-500' />
                        </div>
                    </div>
                </GoogleMap>
            </div>
        )
    }

export default GoogleAddressSearch