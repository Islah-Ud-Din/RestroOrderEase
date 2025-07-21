"use client";

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

if (typeof window !== "undefined" && L.Icon.Default) {
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    });
}

function LocationPicker({ onPick }: { onPick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onPick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

function MapFlyTo({ latlng }: { latlng: { lat: number; lng: number } | null }) {
    const map = useMap();
    useEffect(() => {
        if (latlng) {
            map.flyTo([latlng.lat, latlng.lng], map.getZoom());
        }
    }, [latlng, map]);
    return null;
}

export default function LeafletMap({
    latlng,
    onPick,
}: {
    latlng: { lat: number; lng: number } | null;
    onPick: (lat: number, lng: number) => void;
}) {
    return (
        <MapContainer
            center={latlng ? [latlng.lat, latlng.lng] : [20, 0]}
            zoom={latlng ? 13 : 2}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
        >
            <MapFlyTo latlng={latlng} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationPicker onPick={onPick} />
            {latlng && <Marker position={[latlng.lat, latlng.lng]} />}
        </MapContainer>
    );
}
