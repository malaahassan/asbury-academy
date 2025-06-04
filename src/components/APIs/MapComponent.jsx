import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const libraries = ["places"];

const MapComponent = ({onLocationChange, postButton, windowContainer, displayed}) => {

  const original_lat = 27.238938918324056;
  const original_lng = 33.83597418665886;

  const placeDetails = useRef({
    name: null,
    lat: null,
    lng: null,
    link: null,
  });

  const [center, setCenter] = useState({
    lat: original_lat,
    lng: original_lng,
  });

  
  const [zoom, setZoom] = useState(18);
  const [markerPosition, setMarkerPosition] = useState(center);

  
  
  const searchBoxRef = useRef();
  const searchInputRef = useRef();
  const mapRef = useRef(); // Reference to the map instance


  useEffect(() => {
    if(searchInputRef.current != null){
      searchInputRef.current.value = "";
    }
    setCenter({
      lat: original_lat,
      lng: original_lng,
    });
    setMarkerPosition(center);
    placeDetails.current = {
      name: null,
      lat: null,
      lng: null,
      link: null,
    };
  }, [displayed]);


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "", // Replace with your API key
    libraries,
  });

  const onPlacesChanged = useCallback(() => {
    const places = searchBoxRef.current.getPlaces();

    if (places.length === 0) {
      return;
    }

    const place = places[0];
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const placeName = place.types.includes("establishment") ? `${place.name}, ${place.vicinity}` : place.formatted_address;
    const placeId = place.place_id;
    placeDetails.current = {
      name: placeName,
      lat,
      lng,
      link: place.types.includes("establishment") ? `https://www.google.com/maps/place/?q=place_id:${placeId}` : `https://maps.google.com/maps?q=loc:${lat},${lng}`,
    };
    setMarkerPosition({ lat, lng });
    setCenter({ lat, lng });
    onLocationChange(placeDetails.current);
  });

  const handleClick = useCallback(
    (event) => {
      postButton.current.style.pointerEvents = "none";
      postButton.current.style.opacity = "0.5";
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });

      if (event.placeId) {
        event.stop();
        
        const service = new window.google.maps.places.PlacesService(
          mapRef.current
        );
        service.getDetails({ placeId: event.placeId }, (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            postButton.current.style.pointerEvents = "auto";
            postButton.current.style.opacity = "1";
            const placeName = `${place.name}, ${place.vicinity}`;
            placeDetails.current ={
              name: placeName,
              lat,
              lng,
              link: `https://www.google.com/maps/place/?q=place_id:${event.placeId}`,
            };
            searchInputRef.current.value = placeName;
            onLocationChange(placeDetails.current);
          }
        });
      } else {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: event.latLng }, (results, status) => {
          if (status === "OK" && results[0]) {
            postButton.current.style.pointerEvents = "auto";
            postButton.current.style.opacity = "1";
            const placeName = results[0].formatted_address;
            placeDetails.current = {
              name: placeName,
              lat,
              lng,
              link: `https://maps.google.com/maps?q=loc:${lat},${lng}`,
            };
            searchInputRef.current.value = placeName;
            onLocationChange(placeDetails.current);
          }
        });
      }
    });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
        <StandaloneSearchBox
          onLoad={(ref) => (searchBoxRef.current = ref)}
          onPlacesChanged={onPlacesChanged}
        >
          <input className="uniqueField" onFocus={() => windowContainer.current.style.overflowY = "hidden"} onBlur={() => windowContainer.current.style.overflowY = "auto"} ref={searchInputRef} type="text" placeholder="Search for places" />
        </StandaloneSearchBox>
        <div className="map">
            <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={center}
            zoom={zoom}
            onClick={handleClick}
            onLoad={(map) => mapRef.current = map}
          >
            
            <Marker
              position={markerPosition}
              draggable
              onDragEnd={(e) => handleClick(e)}
            />
          </GoogleMap>
        </div>
      
      
    </div>
  );
};

export default MapComponent;
