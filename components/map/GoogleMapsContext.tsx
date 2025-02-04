import { createContext, useContext, useEffect, useState } from "react";

interface GoogleMapsContextType {
  isLoaded: boolean;
  placesService: google.maps.places.PlacesService | null;
  autocompleteService: google.maps.places.AutocompleteService | null;
}

// Declare the API key constant at the top
const GOOGLE_MAPS_API_KEY = process.env
  .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false,
  placesService: null,
  autocompleteService: null,
});

export const useGoogleMaps = () => useContext(GoogleMapsContext);

// Remove apiKey from props since we'll use the environment variable
interface GoogleMapsProviderProps {
  children: React.ReactNode;
}

export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  useEffect(() => {
    if (window.google?.maps) {
      initializeServices();
      return;
    }

    const existingScript = document.getElementById("google-maps-script");
    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    // Use the constant instead of the prop
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeServices;
    document.head.appendChild(script);

    function initializeServices() {
      const dummyDiv = document.createElement("div");
      setPlacesService(new google.maps.places.PlacesService(dummyDiv));
      setAutocompleteService(new google.maps.places.AutocompleteService());
      setIsLoaded(true);
    }
  }, []); // Remove apiKey from dependencies since we're using the constant

  return (
    <GoogleMapsContext.Provider
      value={{ isLoaded, placesService, autocompleteService }}
    >
      {children}
    </GoogleMapsContext.Provider>
  );
}
