// "use client";

// import { useEffect, useRef } from "react";
// import L from "leaflet";
// import * as turf from "@turf/turf";
// import "leaflet/dist/leaflet.css";
// import "leaflet-draw/dist/leaflet.draw.css";
// import type { Id } from "@/convex/_generated/dataModel";

// interface Zone {
//   _id: Id<"zones">;
//   name: string;
//   coordinates: number[][];
//   area: number;
//   isActive: boolean;
//   description?: string;
// }

// interface LeafletMapComponentProps {
//   zones: Zone[];
//   focusedZoneId?: Id<"zones"> | null;
//   onZoneCreate: (
//     coordinates: number[][],
//     name: string,
//     description: string,
//   ) => Promise<void>;
//   onZoneUpdate: (id: Id<"zones">, coordinates: number[][]) => Promise<void>;
//   onZoneDelete: (id: Id<"zones">) => Promise<void>;
//   onShowDialog: () => void;
//   onSetNewZoneData: (data: {
//     coordinates: number[][];
//     name: string;
//     description: string;
//   }) => void;
// }

// export default function LeafletMapComponent({
//   zones,
//   focusedZoneId,
//   onZoneCreate,
//   onZoneUpdate,
//   onZoneDelete,
//   onShowDialog,
//   onSetNewZoneData,
// }: LeafletMapComponentProps) {
//   const mapRef = useRef<L.Map | null>(null);
//   const drawnItemsRef = useRef<L.FeatureGroup | null>(null);

//   useEffect(() => {
//     require("leaflet-draw");

//     const map = L.map("map").setView([51.505, -0.09], 13);
//     mapRef.current = map;

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "© OpenStreetMap contributors",
//     }).addTo(map);

//     const drawnItems = new L.FeatureGroup();
//     drawnItemsRef.current = drawnItems;
//     map.addLayer(drawnItems);

//     const drawControl = new L.Control.Draw({
//       draw: {
//         marker: false,
//         circle: false,
//         circlemarker: false,
//         rectangle: false,
//         polyline: false,
//         polygon: {
//           allowIntersection: false,
//           drawError: {
//             color: "#e1e100",
//             message: "<strong>Zones cannot overlap!</strong>",
//           },
//           shapeOptions: {
//             color: "#6366f1",
//             fillOpacity: 0.2,
//           },
//         },
//       },
//       edit: {
//         featureGroup: drawnItems,
//       },
//     });
//     map.addControl(drawControl);

//     // Load existing zones
//     drawnItems.clearLayers();
//     for (const zone of zones) {
//       const turfPolygon = turf.polygon([zone.coordinates]);
//       const polygon = L.polygon(zone.coordinates as L.LatLngExpression[], {
//         color: zone.isActive ? "#6366f1" : "#94a3b8",
//         fillOpacity: 0.2,
//       });

//       polygon.bindPopup(`
//         <div class="p-3 space-y-2">
//           <h3 class="text-lg font-semibold">${zone.name}</h3>
//           ${zone.description ? `<p class="text-sm text-gray-600">${zone.description}</p>` : ""}
//           <p class="text-sm font-medium">Area: ${turf.area(turfPolygon).toFixed(2)} m²</p>
//         </div>
//       `);

//       polygon.addTo(drawnItems);
//       (polygon as any).zoneId = zone._id;
//     }

//     // Focus on selected zone if any
//     if (focusedZoneId) {
//       const focusedZone = zones.find((z) => z._id === focusedZoneId);
//       if (focusedZone) {
//         const bounds = L.latLngBounds(
//           focusedZone.coordinates.map(([lat, lng]) => [lat, lng]),
//         );
//         map.fitBounds(bounds, { padding: [50, 50] });
//       }
//     }

//     // Handle new zones
//     map.on("draw:created", (e: L.LeafletEvent) => {
//       const layer = (e as L.DrawEvents.Created).layer;

//       if (layer instanceof L.Polygon) {
//         const latLngs = layer.getLatLngs()[0] as L.LatLng[];
//         let coordinates = latLngs.map((latLng) => [latLng.lat, latLng.lng]);

//         if (coordinates.length < 3) {
//           alert("Please draw at least 3 points to create a zone");
//           map.removeLayer(layer);
//           return;
//         }

//         const first = coordinates[0];
//         const last = coordinates[coordinates.length - 1];
//         if (first[0] !== last[0] || first[1] !== last[1]) {
//           coordinates.push([first[0], first[1]]);
//         }

//         if (coordinates.length < 4) {
//           alert("A zone must have at least 3 distinct points");
//           map.removeLayer(layer);
//           return;
//         }

//         const newPolygon = turf.polygon([coordinates]);
//         const hasIntersection = zones.some((zone) => {
//           const existingPolygon = turf.polygon([zone.coordinates]);
//           return turf.booleanIntersects(newPolygon, existingPolygon);
//         });

//         if (hasIntersection) {
//           alert("New zone cannot overlap with existing zones!");
//           map.removeLayer(layer);
//           return;
//         }

//         onSetNewZoneData({ coordinates, name: "", description: "" });
//         onShowDialog();
//       }
//     });

//     map.on("draw:edited", (e: L.LeafletEvent) => {
//       const layers = (e as L.DrawEvents.Edited).layers;
//       layers.eachLayer((layer: L.Layer) => {
//         if (layer instanceof L.Polygon) {
//           const latLngs = layer.getLatLngs()[0] as L.LatLng[];
//           let coordinates = latLngs.map((latLng) => [latLng.lat, latLng.lng]);

//           const first = coordinates[0];
//           const last = coordinates[coordinates.length - 1];
//           if (first[0] !== last[0] || first[1] !== last[1]) {
//             coordinates.push([first[0], first[1]]);
//           }

//           if (coordinates.length < 4) {
//             alert("A zone must have at least 3 distinct points");
//             map.removeLayer(layer);
//             return;
//           }

//           const editedPolygon = turf.polygon([coordinates]);
//           const hasIntersection = zones.some((zone) => {
//             if (zone._id === (layer as any).zoneId) return false;
//             const existingPolygon = turf.polygon([zone.coordinates]);
//             return turf.booleanIntersects(editedPolygon, existingPolygon);
//           });

//           if (hasIntersection) {
//             alert("Zones cannot overlap!");
//             map.removeLayer(layer);
//             return;
//           }

//           if ((layer as any).zoneId) {
//             onZoneUpdate((layer as any).zoneId, coordinates);
//           }
//         }
//       });
//     });

//     map.on("draw:deleted", (e: L.LeafletEvent) => {
//       const layers = (e as L.DrawEvents.Deleted).layers;
//       layers.eachLayer((layer: L.Layer) => {
//         if ((layer as any).zoneId) {
//           onZoneDelete((layer as any).zoneId);
//         }
//       });
//     });

//     return () => {
//       map.remove();
//     };
//   }, [
//     zones,
//     focusedZoneId,
//     onZoneCreate,
//     onZoneUpdate,
//     onZoneDelete,
//     onShowDialog,
//     onSetNewZoneData,
//   ]);

//   return <div id="map" className="h-[600px] w-full" />;
// }
// v2-working
// "use client";

// import { useEffect, useRef } from "react";
// import L from "leaflet";
// import * as turf from "@turf/turf";
// import "leaflet/dist/leaflet.css";
// import "leaflet-draw/dist/leaflet.draw.css";
// import "leaflet-draw";
// import type { Id } from "@/convex/_generated/dataModel";
// import LocationSearch from "./LocationSearch";

// interface Zone {
//   _id: Id<"zones">;
//   name: string;
//   coordinates: number[][];
//   area: number;
//   isActive: boolean;
//   description?: string;
// }

// interface LeafletMapComponentProps {
//   zones: Zone[];
//   focusedZoneId?: Id<"zones"> | null;
//   onZoneUpdate: (id: Id<"zones">, coordinates: number[][]) => Promise<void>;
//   onZoneDelete: (id: Id<"zones">) => Promise<void>;
//   onCreateDrawing: (coordinates: number[][]) => void;
// }

// export default function LeafletMapComponent({
//   zones,
//   focusedZoneId,
//   onZoneUpdate,
//   onZoneDelete,
//   onCreateDrawing,
// }: LeafletMapComponentProps) {
//   const mapRef = useRef<L.Map | null>(null);
//   const drawnItemsRef = useRef<L.FeatureGroup | null>(null);

//   // Initialize map and draw controls
//   useEffect(() => {
//     if (mapRef.current) return;

//     // Initialize map
//     const map = L.map("map").setView([51.505, -0.09], 13);
//     mapRef.current = map;

//     // Add tile layer
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "© OpenStreetMap contributors",
//     }).addTo(map);

//     // Initialize draw feature group
//     const drawnItems = new L.FeatureGroup();
//     drawnItemsRef.current = drawnItems;
//     map.addLayer(drawnItems);

//     // Initialize draw controls
//     const drawControl = new L.Control.Draw({
//       draw: {
//         marker: false,
//         circle: false,
//         circlemarker: false,
//         rectangle: false,
//         polyline: false,
//         polygon: {
//           allowIntersection: false,
//           drawError: {
//             color: "#e1e100",
//             message: "<strong>Zones cannot overlap!</strong>",
//           },
//           shapeOptions: {
//             color: "#6366f1",
//             fillOpacity: 0.2,
//           },
//         },
//       },
//       edit: {
//         featureGroup: drawnItems,
//       },
//     });
//     map.addControl(drawControl);

//     // Handle drawing creation
//     map.on(L.Draw.Event.CREATED, (e: any) => {
//       const layer = e.layer as L.Polygon;
//       const latLngs = layer.getLatLngs()[0] as L.LatLng[];
//       let coordinates = latLngs.map((latLng: L.LatLng) => [
//         latLng.lat,
//         latLng.lng,
//       ]);

//       // Close the polygon if needed
//       const first = coordinates[0];
//       const last = coordinates[coordinates.length - 1];
//       if (first[0] !== last[0] || first[1] !== last[1]) {
//         coordinates.push([first[0], first[1]]);
//       }

//       // Check for intersections
//       const newPolygon = turf.polygon([coordinates]);
//       const hasIntersection = zones.some((zone) => {
//         const existingPolygon = turf.polygon([zone.coordinates]);
//         return turf.booleanIntersects(newPolygon, existingPolygon);
//       });

//       if (hasIntersection) {
//         alert("New zone cannot overlap with existing zones!");
//         return;
//       }

//       drawnItems.addLayer(layer);
//       onCreateDrawing(coordinates);
//     });

//     // Handle editing
//     map.on(L.Draw.Event.EDITED, (e: any) => {
//       const layers = e.layers;
//       layers.eachLayer((layer: any) => {
//         if (layer instanceof L.Polygon && layer.zoneId) {
//           const latLngs = layer.getLatLngs()[0] as L.LatLng[];
//           let coordinates = latLngs.map((latLng: L.LatLng) => [
//             latLng.lat,
//             latLng.lng,
//           ]);

//           // Close the polygon if needed
//           const first = coordinates[0];
//           const last = coordinates[coordinates.length - 1];
//           if (first[0] !== last[0] || first[1] !== last[1]) {
//             coordinates.push([first[0], first[1]]);
//           }

//           onZoneUpdate(layer.zoneId, coordinates);
//         }
//       });
//     });

//     // Handle deletion
//     map.on(L.Draw.Event.DELETED, (e: any) => {
//       const layers = e.layers;
//       layers.eachLayer((layer: any) => {
//         if (layer.zoneId) {
//           onZoneDelete(layer.zoneId);
//         }
//       });
//     });

//     return () => {
//       map.remove();
//       mapRef.current = null;
//     };
//   }, []);

//   // Update zones on the map
//   useEffect(() => {
//     if (!mapRef.current || !drawnItemsRef.current) return;

//     const drawnItems = drawnItemsRef.current;
//     drawnItems.clearLayers();

//     zones.forEach((zone) => {
//       const polygon = L.polygon(zone.coordinates as L.LatLngExpression[], {
//         color: zone.isActive ? "#6366f1" : "#94a3b8",
//         fillOpacity: 0.2,
//       });

//       const area = turf.area(turf.polygon([zone.coordinates]));

//       polygon.bindPopup(`
//         <div class="p-3 space-y-2">
//           <h3 class="text-lg font-semibold">${zone.name}</h3>
//           ${zone.description ? `<p class="text-sm text-gray-600">${zone.description}</p>` : ""}
//           <p class="text-sm font-medium">Area: ${area.toFixed(2)} m²</p>
//         </div>
//       `);

//       polygon.addTo(drawnItems);
//       (polygon as any).zoneId = zone._id;
//     });

//     // Focus on selected zone if any
//     if (focusedZoneId) {
//       const focusedZone = zones.find((z) => z._id === focusedZoneId);
//       if (focusedZone) {
//         const bounds = L.latLngBounds(
//           focusedZone.coordinates.map(([lat, lng]) => [lat, lng]),
//         );
//         mapRef.current.fitBounds(bounds, { padding: [50, 50] });
//       }
//     }
//   }, [zones, focusedZoneId]);

//   return (
//     <div className="relative">
//       <LocationSearch map={mapRef.current} />
//       <div id="map" className="h-[600px] w-full" />
//     </div>
//   );
// }
//v3 test
"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import * as turf from "@turf/turf";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import type { Id } from "@/convex/_generated/dataModel";
import LocationSearch from "./LocationSearch";
import { Loader2 } from "lucide-react";

interface Zone {
  _id: Id<"zones">;
  name: string;
  coordinates: number[][];
  area: number;
  isActive: boolean;
  description?: string;
}

interface LeafletMapComponentProps {
  zones: Zone[];
  focusedZoneId?: Id<"zones"> | null;
  onZoneUpdate: (id: Id<"zones">, coordinates: number[][]) => Promise<void>;
  onZoneDelete: (id: Id<"zones">) => Promise<void>;
  onCreateDrawing: (coordinates: number[][]) => void;
}

export default function LeafletMapComponent({
  zones,
  focusedZoneId,
  onZoneUpdate,
  onZoneDelete,
  onCreateDrawing,
}: LeafletMapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);
  const [isLocating, setIsLocating] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Initialize map and draw controls
  useEffect(() => {
    if (mapRef.current) return;

    // Initialize map with a default view
    const map = L.map("map").setView([0, 0], 2);
    mapRef.current = map;

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Get current location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 13);
          setIsLocating(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationError("Could not get your location. Using default view.");
          setIsLocating(false);
          map.setView([51.505, -0.09], 13); // Default fallback
        },
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      setIsLocating(false);
      map.setView([51.505, -0.09], 13); // Default fallback
    }

    // Initialize draw feature group
    const drawnItems = new L.FeatureGroup();
    drawnItemsRef.current = drawnItems;
    map.addLayer(drawnItems);

    // Initialize draw controls
    const drawControl = new L.Control.Draw({
      draw: {
        marker: false,
        circle: false,
        circlemarker: false,
        rectangle: false,
        polyline: false,
        polygon: {
          allowIntersection: false,
          drawError: {
            color: "#e1e100",
            message: "<strong>Zones cannot overlap!</strong>",
          },
          shapeOptions: {
            color: "#6366f1",
            fillOpacity: 0.2,
          },
        },
      },
      edit: {
        featureGroup: drawnItems,
      },
    });
    map.addControl(drawControl);

    // Handle drawing creation
    map.on(L.Draw.Event.CREATED, (e: any) => {
      const layer = e.layer as L.Polygon;
      const latLngs = layer.getLatLngs()[0] as L.LatLng[];
      let coordinates = latLngs.map((latLng: L.LatLng) => [
        latLng.lat,
        latLng.lng,
      ]);

      // Close the polygon if needed
      const first = coordinates[0];
      const last = coordinates[coordinates.length - 1];
      if (first[0] !== last[0] || first[1] !== last[1]) {
        coordinates.push([first[0], first[1]]);
      }

      // Check for intersections
      const newPolygon = turf.polygon([coordinates]);
      const hasIntersection = zones.some((zone) => {
        const existingPolygon = turf.polygon([zone.coordinates]);
        return turf.booleanIntersects(newPolygon, existingPolygon);
      });

      if (hasIntersection) {
        alert("New zone cannot overlap with existing zones!");
        return;
      }

      drawnItems.addLayer(layer);
      onCreateDrawing(coordinates);
    });

    // Handle editing
    map.on(L.Draw.Event.EDITED, (e: any) => {
      const layers = e.layers;
      layers.eachLayer((layer: any) => {
        if (layer instanceof L.Polygon && (layer as any).zoneId) {
          const latLngs = layer.getLatLngs()[0] as L.LatLng[];
          let coordinates = latLngs.map((latLng: L.LatLng) => [
            latLng.lat,
            latLng.lng,
          ]);

          // Close the polygon if needed
          const first = coordinates[0];
          const last = coordinates[coordinates.length - 1];
          if (first[0] !== last[0] || first[1] !== last[1]) {
            coordinates.push([first[0], first[1]]);
          }

          onZoneUpdate((layer as any).zoneId, coordinates);
        }
      });
    });

    // Handle deletion
    map.on(L.Draw.Event.DELETED, (e: any) => {
      const layers = e.layers;
      layers.eachLayer((layer: any) => {
        if (layer.zoneId) {
          onZoneDelete(layer.zoneId);
        }
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [zones, onCreateDrawing, onZoneUpdate, onZoneDelete]);

  // Update zones on the map
  useEffect(() => {
    if (!mapRef.current || !drawnItemsRef.current) return;

    const drawnItems = drawnItemsRef.current;
    drawnItems.clearLayers();

    zones.forEach((zone) => {
      const polygon = L.polygon(zone.coordinates as L.LatLngExpression[], {
        color: zone.isActive ? "#6366f1" : "#94a3b8",
        fillOpacity: 0.2,
      });

      const area = turf.area(turf.polygon([zone.coordinates]));

      polygon.bindPopup(`
        <div class="p-3 space-y-2">
          <h3 class="text-lg font-semibold">${zone.name}</h3>
          ${zone.description ? `<p class="text-sm text-gray-600">${zone.description}</p>` : ""}
          <p class="text-sm font-medium">Area: ${area.toFixed(2)} m²</p>
        </div>
      `);

      polygon.addTo(drawnItems);
      (polygon as any).zoneId = zone._id;
    });

    // Focus on selected zone if any
    if (focusedZoneId) {
      const focusedZone = zones.find((z) => z._id === focusedZoneId);
      if (focusedZone) {
        const bounds = L.latLngBounds(
          focusedZone.coordinates.map(([lat, lng]) => [lat, lng]),
        );
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [zones, focusedZoneId]);

  return (
    <div className="relative">
      <LocationSearch map={mapRef.current} />
      {isLocating && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-[1000]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span>Getting your location...</span>
          </div>
        </div>
      )}
      {locationError && (
        <div className="absolute top-4 left-4 right-4 z-[1000] bg-red-50 text-red-600 px-4 py-2 rounded-md">
          {locationError}
        </div>
      )}
      <div id="map" className="h-[600px] w-full" />
    </div>
  );
}
