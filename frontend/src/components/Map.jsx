import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fixing default marker issue in Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Custom Icons for Different Locations
const userIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const ngoIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const communityIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const Dashboard = () => {
  const [userLocation, setUserLocation] = useState([22.40450, 72.52492]);

  // NGO Locations
  const [ngoLocations, setNgoLocations] = useState([
    { lat: 22.6911, lng: 72.8641, name: "Kaira Social Service Society" },
    { lat: 22.6923, lng: 72.8654, name: "Catholic Church Mission Road" },
    { lat: 22.6935, lng: 72.8667, name: "Kaira District Probation and After Care Association" },
    { lat: 22.6948, lng: 72.8679, name: "Newtech Rural and Urban Education Development Foundation" },
    { lat: 22.6960, lng: 72.8692, name: "Dayitva Janseva Trust" },
  ]);

  // Community Spaces Near User
  const [communitySpaces, setCommunitySpaces] = useState([
    { lat: 22.4050, lng: 72.5250, name: "Community Center A" },
    { lat: 22.4072, lng: 72.5274, name: "Green Park Community Hall" },
    { lat: 22.4095, lng: 72.5291, name: "Sunrise Community Hub" },
  ]);

  // Community Spaces Near NGOs
  const [communitySpacesNearNGOs, setCommunitySpacesNearNGOs] = useState([
    { lat: 22.6918, lng: 72.8650, name: "Nadiad Community Hall" },
    { lat: 22.6930, lng: 72.8662, name: "Social Welfare Center" },
    { lat: 22.6952, lng: 72.8685, name: "Unity Public Hall" },
    { lat: 22.6975, lng: 72.8708, name: "Harmony Community Hub" },
    { lat: 22.6990, lng: 72.8730, name: "Peaceful Gathering Spot" },
  ]);

  // Fetch user location dynamically
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => console.error("Error fetching location:", error)
    );
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 bg-white shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
        
        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <p className="text-lg font-semibold">Your Location</p>
            <p className="text-gray-600">{userLocation.join(", ")}</p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg shadow">
            <p className="text-lg font-semibold">Total NGOs</p>
            <p className="text-gray-600">{ngoLocations.length}</p>
          </div>

          <div className="bg-red-100 p-4 rounded-lg shadow">
            <p className="text-lg font-semibold">Total Community Spaces</p>
            <p className="text-gray-600">
              {communitySpaces.length + communitySpacesNearNGOs.length}
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Map Section */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Map View</h2>
          <div className="rounded-lg overflow-hidden shadow-md">
            <MapContainer center={userLocation} zoom={15} style={{ height: "500px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {/* User Location */}
              <Marker position={userLocation} icon={userIcon}>
                <Popup>You are here</Popup>
              </Marker>

              {/* NGO Locations */}
              {ngoLocations.map((ngo, index) => (
                <Marker key={index} position={[ngo.lat, ngo.lng]} icon={ngoIcon}>
                  <Popup>{ngo.name}</Popup>
                </Marker>
              ))}

              {/* Community Spaces Near User */}
              {communitySpaces.map((space, index) => (
                <Marker key={index} position={[space.lat, space.lng]} icon={communityIcon}>
                  <Popup>{space.name}</Popup>
                </Marker>
              ))}

              {/* Community Spaces Near NGOs */}
              {communitySpacesNearNGOs.map((space, index) => (
                <Marker key={index} position={[space.lat, space.lng]} icon={communityIcon}>
                  <Popup>{space.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;