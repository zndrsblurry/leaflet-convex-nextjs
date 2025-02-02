import { createContext, useContext, useEffect, useState } from "react";

interface GoogleMapsContextType {
  isLoaded: boolean;
  placesService: google.maps.places.PlacesService | null;
  autocompleteService: google.maps.places.AutocompleteService | null;
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false,
  placesService: null,
  autocompleteService: null,
});

export const useGoogleMaps = () => useContext(GoogleMapsContext);

interface GoogleMapsProviderProps {
  apiKey: string;
  children: React.ReactNode;
}

export function GoogleMapsProvider({
  apiKey,
  children,
}: GoogleMapsProviderProps) {
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
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
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
  }, [apiKey]);

  return (
    <GoogleMapsContext.Provider
      value={{ isLoaded, placesService, autocompleteService }}
    >
      {children}
    </GoogleMapsContext.Provider>
  );
}
