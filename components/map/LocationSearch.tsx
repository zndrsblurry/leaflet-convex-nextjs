// // // "use client";

// // // import { useState } from "react";
// // // import { Search } from "lucide-react";
// // // import { Input } from "@/components/ui/input";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // //   Command,
// // //   CommandEmpty,
// // //   CommandGroup,
// // //   CommandInput,
// // //   CommandItem,
// // //   CommandList,
// // // } from "@/components/ui/command";
// // // import {
// // //   Popover,
// // //   PopoverContent,
// // //   PopoverTrigger,
// // // } from "@/components/ui/popover";
// // // import type { Map as LeafletMap } from "leaflet";

// // // interface SearchResult {
// // //   place_id: number;
// // //   display_name: string;
// // //   lat: string;
// // //   lon: string;
// // //   boundingbox: string[];
// // // }

// // // interface LocationSearchProps {
// // //   map: LeafletMap | null;
// // // }

// // // export default function LocationSearch({ map }: LocationSearchProps) {
// // //   const [open, setOpen] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [results, setResults] = useState<SearchResult[]>([]);

// // //   const handleSearch = async (search: string) => {
// // //     if (!search || search.length < 3) {
// // //       setResults([]);
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     try {
// // //       const response = await fetch(
// // //         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
// // //           search,
// // //         )}&limit=5`,
// // //       );
// // //       const data = await response.json();
// // //       setResults(data);
// // //     } catch (error) {
// // //       console.error("Failed to search location:", error);
// // //       setResults([]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleSelect = (result: SearchResult) => {
// // //     if (!map) return;

// // //     const lat = parseFloat(result.lat);
// // //     const lon = parseFloat(result.lon);

// // //     // Get the bounding box if available
// // //     if (result.boundingbox) {
// // //       const [south, north, west, east] = result.boundingbox.map(parseFloat);
// // //       map.fitBounds([
// // //         [south, west],
// // //         [north, east],
// // //       ]);
// // //     } else {
// // //       // If no bounding box, just center on the point
// // //       map.setView([lat, lon], 13);
// // //     }

// // //     setOpen(false);
// // //   };

// // //   return (
// // //     <div className="absolute top-4 left-4 z-[1000] w-[300px]">
// // //       <Popover open={open} onOpenChange={setOpen}>
// // //         <PopoverTrigger asChild>
// // //           <Button
// // //             variant="outline"
// // //             role="combobox"
// // //             aria-expanded={open}
// // //             className="w-full justify-between bg-white"
// // //           >
// // //             <Search className="mr-2 h-4 w-4" />
// // //             Search locations...
// // //           </Button>
// // //         </PopoverTrigger>
// // //         <PopoverContent className="w-[300px] p-0">
// // //           <Command>
// // //             <CommandInput
// // //               placeholder="Type a location..."
// // //               onValueChange={handleSearch}
// // //             />
// // //             <CommandList>
// // //               <CommandEmpty>
// // //                 {loading ? "Searching..." : "No results found."}
// // //               </CommandEmpty>
// // //               <CommandGroup>
// // //                 {results.map((result) => (
// // //                   <CommandItem
// // //                     key={result.place_id}
// // //                     onSelect={() => handleSelect(result)}
// // //                   >
// // //                     {result.display_name}
// // //                   </CommandItem>
// // //                 ))}
// // //               </CommandGroup>
// // //             </CommandList>
// // //           </Command>
// // //         </PopoverContent>
// // //       </Popover>
// // //     </div>
// // //   );
// // // }
// // import { useState, useCallback } from "react";
// // import { Search } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Command,
// //   CommandEmpty,
// //   CommandGroup,
// //   CommandInput,
// //   CommandItem,
// //   CommandList,
// // } from "@/components/ui/command";
// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from "@/components/ui/popover";
// // import type { Map as LeafletMap } from "leaflet";

// // interface SearchResult {
// //   place_id: number;
// //   display_name: string;
// //   lat: string;
// //   lon: string;
// //   boundingbox: string[];
// // }

// // interface LocationSearchProps {
// //   map: LeafletMap | null;
// // }

// // export default function LocationSearch({ map }: LocationSearchProps) {
// //   const [open, setOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [searchValue, setSearchValue] = useState("");
// //   const [results, setResults] = useState<SearchResult[]>([]);

// //   const handleSearch = useCallback(async (search: string) => {
// //     setSearchValue(search);

// //     if (!search || search.length < 3) {
// //       setResults([]);
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const response = await fetch(
// //         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}&limit=5`,
// //       );
// //       const data = await response.json();
// //       setResults(data);
// //     } catch (error) {
// //       console.error("Failed to search location:", error);
// //       setResults([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   const handleSelect = (result: SearchResult) => {
// //     if (!map) return;

// //     const lat = Number.parseFloat(result.lat);
// //     const lon = Number.parseFloat(result.lon);
// //     setSearchValue(result.display_name);

// //     // Get the bounding box if available
// //     if (result.boundingbox) {
// //       const [south, north, west, east] = result.boundingbox.map(
// //         Number.parseFloat,
// //       );
// //       map.fitBounds([
// //         [south, west],
// //         [north, east],
// //       ]);
// //     } else {
// //       // If no bounding box, just center on the point
// //       map.setView([lat, lon], 13);
// //     }

// //     setOpen(false);
// //   };

// //   return (
// //     <div className="absolute top-4 left-4 z-[1000] w-[300px]">
// //       <Popover open={open} onOpenChange={setOpen}>
// //         <PopoverTrigger asChild>
// //           <Button
// //             variant="outline"
// //             role="combobox"
// //             aria-expanded={open}
// //             className="w-full justify-between bg-white"
// //             onClick={() => setOpen(true)}
// //           >
// //             <Search className="mr-2 h-4 w-4" />
// //             {searchValue || "Search locations..."}
// //           </Button>
// //         </PopoverTrigger>
// //         <PopoverContent className="w-[300px] p-0">
// //           <Command shouldFilter={false}>
// //             <CommandInput
// //               value={searchValue}
// //               onValueChange={handleSearch}
// //               placeholder="Type a location..."
// //             />
// //             <CommandList>
// //               <CommandEmpty>
// //                 {loading ? "Searching..." : "No results found."}
// //               </CommandEmpty>
// //               <CommandGroup>
// //                 {results.map((result) => (
// //                   <CommandItem
// //                     key={result.place_id}
// //                     onSelect={() => handleSelect(result)}
// //                   >
// //                     {result.display_name}
// //                   </CommandItem>
// //                 ))}
// //               </CommandGroup>
// //             </CommandList>
// //           </Command>
// //         </PopoverContent>
// //       </Popover>
// //     </div>
// //   );
// // }
//v3
// "use client";

// import { useState, useCallback, useEffect } from "react";
// import { Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import type { Map as LeafletMap } from "leaflet";

// interface SearchResult {
//   place_id: number;
//   display_name: string;
//   lat: string;
//   lon: string;
//   boundingbox: string[];
// }

// interface LocationSearchProps {
//   map: LeafletMap | null;
// }

// export default function LocationSearch({ map }: LocationSearchProps) {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [searchValue, setSearchValue] = useState("");
//   const [results, setResults] = useState<SearchResult[]>([]);

//   const handleSearch = useCallback(async (search: string) => {
//     setSearchValue(search);

//     if (!search || search.length < 3) {
//       setResults([]);
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}&limit=5`,
//       );
//       const data = await response.json();
//       setResults(data);
//     } catch (error) {
//       console.error("Failed to search location:", error);
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const handleSelect = useCallback(
//     (result: SearchResult) => {
//       if (!map) return;

//       const lat = Number.parseFloat(result.lat);
//       const lon = Number.parseFloat(result.lon);
//       setSearchValue(result.display_name);

//       if (result.boundingbox) {
//         const [south, north, west, east] = result.boundingbox.map(
//           Number.parseFloat,
//         );
//         map.fitBounds([
//           [south, west],
//           [north, east],
//         ]);
//       } else {
//         map.setView([lat, lon], 13);
//       }

//       setOpen(false);
//     },
//     [map],
//   );

//   return (
//     <div className="w-[300px]">
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             aria-expanded={open}
//             className="w-full justify-between bg-white shadow-md"
//             onClick={() => setOpen(true)}
//           >
//             <Search className="mr-2 h-4 w-4" />
//             {searchValue || "Search locations..."}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-[300px] p-0" align="end">
//           <Command shouldFilter={false}>
//             <CommandInput
//               value={searchValue}
//               onValueChange={handleSearch}
//               placeholder="Type a location..."
//               className="border-none focus:ring-0"
//             />
//             <CommandList>
//               <CommandEmpty>
//                 {loading ? "Searching..." : "No results found."}
//               </CommandEmpty>
//               <CommandGroup>
//                 {results.map((result) => (
//                   <CommandItem
//                     key={result.place_id}
//                     onSelect={() => handleSelect(result)}
//                   >
//                     {result.display_name}
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }
//v4 working but no dropdown
// import React, { useState, useCallback, useEffect } from "react";
// import { Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import type { Map as LeafletMap } from "leaflet";

// interface SearchResult {
//   place_id: number;
//   display_name: string;
//   lat: string;
//   lon: string;
//   boundingbox: string[];
// }

// interface LocationSearchProps {
//   map: LeafletMap | null;
// }

// export default function LocationSearch({ map }: LocationSearchProps) {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [searchValue, setSearchValue] = useState("");
//   const [results, setResults] = useState<SearchResult[]>([]);
//   const [debouncedValue, setDebouncedValue] = useState(searchValue);

//   // Debounce search value
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedValue(searchValue);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchValue]);

//   // Perform search when debounced value changes
//   useEffect(() => {
//     const performSearch = async () => {
//       if (!debouncedValue || debouncedValue.length < 3) {
//         setResults([]);
//         setError(null);
//         return;
//       }

//       setLoading(true);
//       setError(null);

//       try {
//         const response = await fetch(
//           `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//             debouncedValue,
//           )}&limit=5`,
//           {
//             headers: {
//               Accept: "application/json",
//               "User-Agent": "MapSearchComponent/1.0",
//             },
//           },
//         );

//         if (!response.ok) {
//           throw new Error("Search request failed");
//         }

//         const data = await response.json();
//         setResults(data);
//       } catch (err) {
//         setError("Failed to search location. Please try again.");
//         setResults([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     performSearch();
//   }, [debouncedValue]);

//   const handleSelect = useCallback(
//     (result: SearchResult) => {
//       if (!map) return;

//       const lat = Number.parseFloat(result.lat);
//       const lon = Number.parseFloat(result.lon);

//       setSearchValue(result.display_name);

//       if (result.boundingbox) {
//         const [south, north, west, east] = result.boundingbox.map(
//           Number.parseFloat,
//         );
//         map.fitBounds(
//           [
//             [south, west],
//             [north, east],
//           ],
//           { padding: [50, 50] },
//         );
//       } else {
//         map.setView([lat, lon], 13);
//       }

//       setOpen(false);
//     },
//     [map],
//   );

//   return (
//     <div className="relative w-64">
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             aria-expanded={open}
//             className="w-full justify-between bg-white shadow-md"
//             onClick={() => setOpen(true)}
//           >
//             <div className="flex items-center text-sm truncate">
//               <Search className="mr-2 h-4 w-4 shrink-0" />
//               <span className="truncate">
//                 {searchValue || "Search locations..."}
//               </span>
//             </div>
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-64 p-0" align="start">
//           <Command shouldFilter={false}>
//             <CommandInput
//               value={searchValue}
//               onValueChange={setSearchValue}
//               placeholder="Type a location..."
//               className="border-none focus:ring-0"
//             />
//             <CommandList>
//               <CommandEmpty>
//                 {loading ? (
//                   <div className="p-2 text-sm text-gray-500">Searching...</div>
//                 ) : error ? (
//                   <div className="p-2 text-sm text-red-500">{error}</div>
//                 ) : (
//                   <div className="p-2 text-sm text-gray-500">
//                     {searchValue.length < 3
//                       ? "Type at least 3 characters..."
//                       : "No results found"}
//                   </div>
//                 )}
//               </CommandEmpty>
//               <CommandGroup>
//                 {results.map((result) => (
//                   <CommandItem
//                     key={result.place_id}
//                     onSelect={() => handleSelect(result)}
//                     className="cursor-pointer"
//                   >
//                     <div className="flex flex-col gap-1">
//                       <div className="text-sm">{result.display_name}</div>
//                     </div>
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }
//v5---popup not working
// import { useState, useCallback, useEffect } from "react";
// import { Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import type { Map as LeafletMap } from "leaflet";
// import nominatim from "nominatim-client";

// // Initialize the Nominatim client
// const client = nominatim.createClient({
//   useragent: "YourAppName", // Replace with your app name
//   referer: typeof window !== "undefined" ? window.location.origin : "", // Dynamically set referer
// });

// interface SearchResult {
//   place_id: number;
//   display_name: string;
//   lat: string;
//   lon: string;
//   boundingbox: string[];
//   address?: {
//     road?: string;
//     city?: string;
//     state?: string;
//     country?: string;
//   };
// }

// interface LocationSearchProps {
//   map: LeafletMap | null;
// }

// export default function LocationSearch({ map }: LocationSearchProps) {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [searchValue, setSearchValue] = useState("");
//   const [results, setResults] = useState<SearchResult[]>([]);
//   const [debouncedValue, setDebouncedValue] = useState(searchValue);

//   // Debounce search value
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedValue(searchValue);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchValue]);

//   // Perform search when debounced value changes
//   useEffect(() => {
//     const performSearch = async () => {
//       if (!debouncedValue || debouncedValue.length < 3) {
//         setResults([]);
//         setError(null);
//         return;
//       }

//       setLoading(true);
//       setError(null);

//       try {
//         const query = {
//           q: debouncedValue,
//           addressdetails: "1", // Changed to string "1" from number 1
//           limit: "5", // Changed to string "5" to match expected type
//           format: "json",
//         };

//         const searchResults = await client.search(query);
//         setResults(searchResults);
//       } catch (err) {
//         console.error("Search error:", err);
//         setError("Failed to search location. Please try again.");
//         setResults([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     performSearch();
//   }, [debouncedValue]);

//   const handleSelect = useCallback(
//     (result: SearchResult) => {
//       if (!map) return;

//       const lat = Number.parseFloat(result.lat);
//       const lon = Number.parseFloat(result.lon);

//       setSearchValue(result.display_name);

//       if (result.boundingbox) {
//         const [south, north, west, east] = result.boundingbox.map(
//           Number.parseFloat,
//         );
//         map.fitBounds(
//           [
//             [south, west],
//             [north, east],
//           ],
//           { padding: [50, 50] },
//         );
//       } else {
//         map.setView([lat, lon], 13);
//       }

//       setOpen(false);
//     },
//     [map],
//   );

//   const formatDisplayResult = (result: SearchResult) => {
//     if (!result.address) return result.display_name;

//     const parts = [];
//     if (result.address.road) parts.push(result.address.road);
//     if (result.address.city) parts.push(result.address.city);
//     if (result.address.state) parts.push(result.address.state);
//     if (result.address.country) parts.push(result.address.country);

//     return parts.length > 0 ? parts.join(", ") : result.display_name;
//   };

//   return (
//     <div className="relative w-64 z-[9999]">
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             aria-expanded={open}
//             className="w-full justify-between bg-white shadow-md"
//           >
//             <div className="flex items-center text-sm truncate">
//               <Search className="mr-2 h-4 w-4 shrink-0" />
//               <span className="truncate">
//                 {searchValue || "Search locations..."}
//               </span>
//             </div>
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent
//           className="w-64 p-0 bg-white shadow-lg"
//           align="start"
//           sideOffset={5}
//           side="bottom"
//           avoidCollisions
//         >
//           <Command shouldFilter={false} className="max-h-[300px]">
//             <CommandInput
//               value={searchValue}
//               onValueChange={setSearchValue}
//               placeholder="Type a location..."
//               className="border-none focus:ring-0"
//             />
//             <CommandList className="max-h-[250px] overflow-y-auto">
//               <CommandEmpty>
//                 {loading ? (
//                   <div className="p-2 text-sm text-gray-500">Searching...</div>
//                 ) : error ? (
//                   <div className="p-2 text-sm text-red-500">{error}</div>
//                 ) : (
//                   <div className="p-2 text-sm text-gray-500">
//                     {searchValue.length < 3
//                       ? "Type at least 3 characters..."
//                       : "No results found"}
//                   </div>
//                 )}
//               </CommandEmpty>
//               <CommandGroup>
//                 {results.map((result) => (
//                   <CommandItem
//                     key={result.place_id}
//                     onSelect={() => handleSelect(result)}
//                     className="cursor-pointer hover:bg-gray-100"
//                   >
//                     <div className="flex flex-col gap-1">
//                       <div className="text-sm font-medium">
//                         {formatDisplayResult(result)}
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {result.display_name}
//                       </div>
//                     </div>
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }
// v6 google maps api
// import { useState, useCallback, useEffect } from "react";
// import { Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import type { Map as LeafletMap } from "leaflet";
// import { useGoogleMaps } from "./GoogleMapsContext";

// interface LocationSearchProps {
//   map: LeafletMap | null;
//   apiKey: string; // Google Maps API key
// }

// interface PlaceResult {
//   place_id: string;
//   description: string;
//   structured_formatting: {
//     main_text: string;
//     secondary_text: string;
//   };
//   geometry?: {
//     location: {
//       lat: number;
//       lng: number;
//     };
//     viewport?: {
//       northeast: { lat: number; lng: number };
//       southwest: { lat: number; lng: number };
//     };
//   };
// }

// export default function LocationSearch({ map }: { map: LeafletMap | null }) {
//   const { placesService, autocompleteService } = useGoogleMaps();
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [searchValue, setSearchValue] = useState("");
//   const [results, setResults] = useState<PlaceResult[]>([]);

//   // Debounced search
//   useEffect(() => {
//     if (!searchValue || !autocompleteService) return;

//     const timer = setTimeout(async () => {
//       setLoading(true);
//       try {
//         const request = {
//           input: searchValue,
//           types: ["geocode", "establishment"],
//         };

//         const predictions = await new Promise<
//           google.maps.places.AutocompletePrediction[]
//         >((resolve, reject) => {
//           autocompleteService.getPlacePredictions(
//             request,
//             (results, status) => {
//               if (
//                 status === google.maps.places.PlacesServiceStatus.OK &&
//                 results
//               ) {
//                 resolve(results);
//               } else {
//                 reject(new Error("Failed to get predictions"));
//               }
//             },
//           );
//         });

//         setResults(predictions as PlaceResult[]);
//       } catch (err) {
//         console.error("Search error:", err);
//         setError("Failed to search location");
//       } finally {
//         setLoading(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchValue, autocompleteService]);

//   const handleSelect = useCallback(
//     async (result: PlaceResult) => {
//       if (!map || !placesService) return;

//       try {
//         const placeDetails = await new Promise<google.maps.places.PlaceResult>(
//           (resolve, reject) => {
//             placesService.getDetails(
//               { placeId: result.place_id, fields: ["geometry"] },
//               (place, status) => {
//                 if (
//                   status === google.maps.places.PlacesServiceStatus.OK &&
//                   place
//                 ) {
//                   resolve(place);
//                 } else {
//                   reject(new Error("Failed to get place details"));
//                 }
//               },
//             );
//           },
//         );

//         if (placeDetails.geometry?.location) {
//           const lat = placeDetails.geometry.location.lat();
//           const lng = placeDetails.geometry.location.lng();

//           if (placeDetails.geometry.viewport) {
//             const bounds = new google.maps.LatLngBounds(
//               placeDetails.geometry.viewport.getSouthWest(),
//               placeDetails.geometry.viewport.getNorthEast(),
//             );
//             map.fitBounds([
//               [bounds.getSouthWest().lat(), bounds.getSouthWest().lng()],
//               [bounds.getNorthEast().lat(), bounds.getNorthEast().lng()],
//             ]);
//           } else {
//             map.setView([lat, lng], 13);
//           }

//           setSearchValue(result.description);
//           setOpen(false);
//         }
//       } catch (err) {
//         console.error("Error getting place details:", err);
//         setError("Failed to get location details");
//       }
//     },
//     [map, placesService],
//   );

//   return (
//     <div className="w-64">
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             aria-expanded={open}
//             className="w-full justify-between bg-white shadow-md"
//           >
//             <div className="flex items-center text-sm truncate">
//               <Search className="mr-2 h-4 w-4 shrink-0" />
//               <span className="truncate">
//                 {searchValue || "Search locations..."}
//               </span>
//             </div>
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent
//           className="w-64 p-0 bg-white shadow-lg"
//           align="start"
//           sideOffset={5}
//           side="bottom"
//           avoidCollisions
//         >
//           <Command shouldFilter={false} className="max-h-96">
//             <CommandInput
//               value={searchValue}
//               onValueChange={setSearchValue}
//               placeholder="Type a location..."
//               className="border-none focus:ring-0"
//             />
//             <CommandList className="max-h-80 overflow-y-auto">
//               <CommandEmpty>
//                 {loading ? (
//                   <div className="p-2 text-sm text-gray-500">Searching...</div>
//                 ) : error ? (
//                   <div className="p-2 text-sm text-red-500">{error}</div>
//                 ) : (
//                   <div className="p-2 text-sm text-gray-500">
//                     Type to search locations...
//                   </div>
//                 )}
//               </CommandEmpty>
//               <CommandGroup>
//                 {results.map((result) => (
//                   <CommandItem
//                     key={result.place_id}
//                     onSelect={() => handleSelect(result)}
//                     className="cursor-pointer hover:bg-gray-100"
//                   >
//                     <div className="flex flex-col gap-1">
//                       <div className="text-sm font-medium">
//                         {result.structured_formatting.main_text}
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {result.structured_formatting.secondary_text}
//                       </div>
//                     </div>
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }
//v7 test popover
import { useState, useCallback, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Map as LeafletMap } from "leaflet";
import { useGoogleMaps } from "./GoogleMapsContext";

interface PlaceResult {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
    viewport?: {
      northeast: { lat: number; lng: number };
      southwest: { lat: number; lng: number };
    };
  };
}

export default function LocationSearch({ map }: { map: LeafletMap | null }) {
  const { placesService, autocompleteService } = useGoogleMaps();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<PlaceResult[]>([]);

  // Debounced search
  useEffect(() => {
    if (!searchValue || !autocompleteService) return;

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const request = {
          input: searchValue,
          types: ["geocode", "establishment"],
        };

        const predictions = await new Promise<
          google.maps.places.AutocompletePrediction[]
        >((resolve, reject) => {
          autocompleteService.getPlacePredictions(
            request,
            (results, status) => {
              if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                results
              ) {
                resolve(results);
              } else {
                reject(new Error("Failed to get predictions"));
              }
            },
          );
        });

        setResults(predictions as PlaceResult[]);
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to search location");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, autocompleteService]);

  const handleSelect = useCallback(
    async (result: PlaceResult) => {
      if (!map || !placesService) return;

      try {
        const placeDetails = await new Promise<google.maps.places.PlaceResult>(
          (resolve, reject) => {
            placesService.getDetails(
              { placeId: result.place_id, fields: ["geometry"] },
              (place, status) => {
                if (
                  status === google.maps.places.PlacesServiceStatus.OK &&
                  place
                ) {
                  resolve(place);
                } else {
                  reject(new Error("Failed to get place details"));
                }
              },
            );
          },
        );

        if (placeDetails.geometry?.location) {
          const lat = placeDetails.geometry.location.lat();
          const lng = placeDetails.geometry.location.lng();

          if (placeDetails.geometry.viewport) {
            const bounds = new google.maps.LatLngBounds(
              placeDetails.geometry.viewport.getSouthWest(),
              placeDetails.geometry.viewport.getNorthEast(),
            );
            map.fitBounds([
              [bounds.getSouthWest().lat(), bounds.getSouthWest().lng()],
              [bounds.getNorthEast().lat(), bounds.getNorthEast().lng()],
            ]);
          } else {
            map.setView([lat, lng], 13);
          }

          setSearchValue(result.description);
          setOpen(false);
        }
      } catch (err) {
        console.error("Error getting place details:", err);
        setError("Failed to get location details");
      }
    },
    [map, placesService],
  );

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 rounded-full bg-white shadow-md hover:bg-gray-50"
          >
            <Search className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 p-0 bg-white shadow-lg"
          align="end"
          sideOffset={5}
          style={{ zIndex: 2000 }}
        >
          <Command shouldFilter={false} className="max-h-[450px]">
            <CommandInput
              value={searchValue}
              onValueChange={setSearchValue}
              placeholder="Type a location..."
              className="border-none focus:ring-0"
            />
            <CommandList className="max-h-[400px] overflow-y-auto">
              <CommandEmpty>
                {loading ? (
                  <div className="p-2 text-sm text-gray-500">Searching...</div>
                ) : error ? (
                  <div className="p-2 text-sm text-red-500">{error}</div>
                ) : (
                  <div className="p-2 text-sm text-gray-500">
                    Type to search locations...
                  </div>
                )}
              </CommandEmpty>
              <CommandGroup>
                {results.map((result) => (
                  <CommandItem
                    key={result.place_id}
                    onSelect={() => handleSelect(result)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium">
                        {result.structured_formatting.main_text}
                      </div>
                      <div className="text-xs text-gray-500">
                        {result.structured_formatting.secondary_text}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
