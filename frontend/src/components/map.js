import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";
import axios from "axios";

const MapContainer = (props) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [currentLocationInput, setCurrentLocationInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handlePlaceSelect = (place) => {
    setDestination({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
  };

  const handleCurrentLocationSelect = (place) => {
    setCurrentLocation({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    setCurrentLocationInput(place.formatted_address);
  };

  const handleDirections = () => {
    if (destination && currentLocation) {
      const directionsService = new window.google.maps.DirectionsService();
      const origin = new window.google.maps.LatLng(
        currentLocation.lat,
        currentLocation.lng
      );
      const destinationLatLng = new window.google.maps.LatLng(
        destination.lat,
        destination.lng
      );

      directionsService.route(
        {
          origin: origin,
          destination: destinationLatLng,
          travelMode: window.google.maps.TravelMode.TRANSIT,
          transitOptions: {
            modes: ["BUS", "RAIL", "SUBWAY", "TRAIN", "TRAM"],
          },
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://roadhealthmap.vercel.app/classified');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  function getClassColor(classNum) {
    switch (classNum) {
      case 0:
        return "green";
      case 1:
        return "red";
      case 2:
        return "orange";
      default:
        return "blue";
    }
  }



  return (
    <LoadScript googleMapsApiKey={props.apiKey} libraries={["places"]}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Autocomplete
        onPlaceSelected={handleCurrentLocationSelect}
        types={['geocode']}
        placeholder="Current location"
        value={currentLocationInput}
        onChange={(event) => setCurrentLocationInput(event.target.value)}
        style={{
          padding: '10px',
          border: 'none',
          borderRadius: '2px',
          marginBottom: '10px',
        }}
        inputContainerStyle={{
          backgroundColor: 'transparent',
          border: 'none',
        }}
        highlightFirstSuggestion={true}
      />
      <Autocomplete
        onPlaceSelected={handlePlaceSelect}
        types={['(regions)']}
        componentRestrictions={{ country: 'us' }}
        placeholder="Destination"
        value={destinationInput}
        onChange={(event) => setDestinationInput(event.target.value)}
        style={{
          padding: '10px',
          border: 'none',
          borderRadius: '2px',
          marginBottom: '10px',
        }}
        inputContainerStyle={{
          backgroundColor: 'transparent',
          border: 'none',
        }}
        highlightFirstSuggestion={true}
      />
      <button
        onClick={handleDirections}
        style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          color: 'inherit',
          cursor: 'pointer',
        }}
      >
        Get Directions
      </button>
</div>

      <GoogleMap
        zoom={8}
        center={currentLocation}
        mapContainerStyle={{
          width: "900px",
          height: "400px",
          position: "fixed",
          marginTop:"20px"
        }}
      >
        {data.map((data) => (
  <Marker
    key={data._id}
    position={{
      lat: Number(data.Latitude) || 0,
      lng: Number(data.Longitude) || 0,
    }}
    title={data.Class.toString()}
    icon={{
      url: `http://maps.google.com/mapfiles/ms/icons/${getClassColor(data.Class)}-dot.png`
    }}
  />
))}

        {currentLocation && <Marker position={currentLocation} />}
        {destination && <Marker position={destination} />}
        {directions && <DirectionsRenderer directions={directions} />}
        {destination && (
          <DirectionsService
            options={{
              destination: destination,
              origin: currentLocation,
              travelMode: window.google.maps.TravelMode.DRIVING,
              transitOptions: ["BUS", "RAIL", "SUBWAY", "TRAIN", "TRAM"],
            }}
            callback={(result, status) => {
              if (status === "OK") {
                setDirections(result);
              } else {
                console.error("Directions request failed due to " + status);
              }
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
