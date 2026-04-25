import React, { useState, useEffect, useCallback } from 'react';
import { getStorageData } from '../services/storageService';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Search, Star, Phone, Navigation, Package, IndianRupee, Loader2, AlertCircle, Mail, X } from 'lucide-react';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 26.9124,
  lng: 75.8172
};

const StorageLocator = () => {
  const [storages, setStorages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const fetchStorages = async () => {
    try {
      setLoading(true);
      const data = await getStorageData();
      setStorages(data);
    } catch (err) {
      setError('Could not load storage facilities.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStorages();
  }, []);

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          if (window.google && isLoaded) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
              if (status === "OK" && results[0]) {
                const addressComponents = results[0].address_components;
                let district = "";
                let state = "";

                addressComponents.forEach(component => {
                  if (component.types.includes("administrative_area_level_2")) {
                    district = component.long_name;
                  }
                  if (component.types.includes("administrative_area_level_1")) {
                    state = component.long_name;
                  }
                });

                if (district || state) {
                  setSearchTerm(`${district}${district && state ? ", " : ""}${state}`);
                }
              } else {
                console.error("Geocoder failed due to: " + status);
              }
              setLoading(false);
            });
          } else {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
          alert("Could not get your location. Please search manually.");
        }
      );
    }
  };

  const filteredStorages = storages.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 md:h-[calc(100vh-140px)] flex flex-col">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Storage Locator</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Find and book nearby cold storage facilities for your crops.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 outline-none transition-all dark:text-slate-200 dark:placeholder-slate-500"
            />
          </div>
          <button 
            onClick={handleUseMyLocation}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md shadow-primary-200 transition-all hover:bg-primary-700 active:scale-95 disabled:opacity-50"
            disabled={!isLoaded || loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Locating...</span>
              </div>
            ) : "Use My Location"}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        {/* List of facilities */}
        <div className="lg:col-span-1 space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin mb-2" />
                <p className="text-slate-500 text-sm font-medium">Searching facilities...</p>
             </div>
          ) : error ? (
            <div className="text-center py-10 space-y-2">
              <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
              <p className="text-slate-700 dark:text-slate-300 font-bold">{error}</p>
            </div>
          ) : filteredStorages.length === 0 ? (
            <div className="text-center py-20 px-6">
               <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
               <p className="text-slate-500 font-medium">No storage facilities found in this area.</p>
            </div>
          ) : (
            filteredStorages.map((item) => (
              <div key={item._id || item.id} className="glass-card p-5 hover:border-primary-200 dark:hover:border-primary-800 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">{item.name}</h3>
                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded text-amber-700 dark:text-amber-400 text-xs font-bold">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    {item.rating || '4.5'}
                  </div>
                </div>
                
                <div className="space-y-2 mt-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    {item.location} • {item.distance || '2.4 km'}
                  </p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                      <Package className="w-4 h-4 text-primary-500 dark:text-primary-400" />
                      {item.capacity} Tons
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                      <IndianRupee className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ₹{item.pricePerDay}/day
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button 
                    onClick={() => setBookingDetails(item)}
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-900/20 dark:shadow-none"
                  >
                    Book Storage
                  </button>
                  <a href={`tel:${item.phone}`} className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Map View */}
        <div className="lg:col-span-2 glass-card overflow-hidden bg-slate-100 dark:bg-slate-800 border-none relative group min-h-[400px]">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={12}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                styles: [
                  {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [{ "color": "#7c93a3" }, { "lightness": "-10" }]
                  }
                ]
              }}
            >
              {filteredStorages.map((storage) => (
                <Marker
                  key={storage._id || storage.id}
                  position={{ 
                    lat: storage.lat || center.lat + (Math.random() - 0.5) * 0.1, 
                    lng: storage.lng || center.lng + (Math.random() - 0.5) * 0.1 
                  }}
                  onClick={() => setSelectedStorage(storage)}
                  icon={{
                    url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                  }}
                />
              ))}

              {selectedStorage && (
                <InfoWindow
                  position={{ 
                    lat: selectedStorage.lat || center.lat, 
                    lng: selectedStorage.lng || center.lng 
                  }}
                  onCloseClick={() => setSelectedStorage(null)}
                >
                  <div className="p-2 min-w-[150px]">
                    <h4 className="font-bold text-slate-800 text-sm">{selectedStorage.name}</h4>
                    <p className="text-xs text-slate-500 mb-2">{selectedStorage.location}</p>
                    <div className="flex justify-between items-center border-t pt-2">
                       <span className="font-bold text-primary-600">₹{selectedStorage.pricePerDay}/day</span>
                       <button 
                        onClick={() => setBookingDetails(selectedStorage)}
                        className="bg-primary-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                       >
                         Book
                       </button>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {bookingDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                 <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 italic">Confirm Booking</h3>
                 <button onClick={() => setBookingDetails(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <X className="w-5 h-5 text-slate-400" />
                 </button>
              </div>
              <div className="p-8 space-y-6">
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-2xl border border-primary-100 dark:border-primary-800/50">
                       <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary-200">
                          <Package className="w-6 h-6" />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest">Selected Facility</p>
                          <p className="font-black text-slate-800 dark:text-white">{bookingDetails.name}</p>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                       <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                          <Phone className="w-5 h-5 text-primary-500" />
                          <span className="font-bold">{bookingDetails.phone || '+91 98765 43210'}</span>
                       </div>
                       <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                          <Mail className="w-5 h-5 text-primary-500" />
                          <span className="font-bold">{bookingDetails.email || 'contact@storage.com'}</span>
                       </div>
                    </div>
                 </div>

                 <div className="pt-4 space-y-3">
                    <button className="w-full bg-primary-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary-500/30 hover:bg-primary-700 hover:-translate-y-0.5 transition-all">
                       Proceed to Book
                    </button>
                    <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-tighter">By clicking above, you agree to the storage terms</p>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default StorageLocator;
