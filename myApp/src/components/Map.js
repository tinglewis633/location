import React from "react";
import "../theme/Map.css";
import { useState } from "react";

import { placeStore } from "../stores/store";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
function Map() {
  const geoedPlaces = placeStore.useState((s) => s.geoedPlaces);
  const search = placeStore.useState((s) => s.search);

  //googlemap default setup
  const containerStyle = {
    width: "90%",
    height: "400px",
  };
  const center = {
    lat: 43.453,
    lng: -79.583,
  };
  const zoom = 9;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBgxJ-padRN_a3sczwqk7sB1NPkuObA2gk",
  });
  const [map, setMap] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div className="map">
      <h1>Map</h1>
      {isLoaded && geoedPlaces ? (
        <GoogleMap
          id="map"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* loop through geoedplaces, for each coordinate of a place, set a marker for it */}

          {geoedPlaces
            .filter(
              (place) =>
                place.name.toLowerCase().includes(search.toLowerCase()) ||
                place.address.toLowerCase().includes(search.toLowerCase())
            )
            .map((place) => (
              <Marker
                key={place.id}
                position={{ lat: place.lat, lng: place.lng }}
                label={{
                  text: place.id,
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                onClick={() => {
                  setSelectedPlace(place);
                }}
              />
            ))}

          {/* If a place is selected, pop infowindow */}
          {selectedPlace && (
            <InfoWindow
              position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
              onCloseClick={() => {
                setSelectedPlace(null);
              }}
            >
              <div>
                <h3>
                  {selectedPlace.name}({selectedPlace.id})
                </h3>
                <p>{selectedPlace.address}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Map;
