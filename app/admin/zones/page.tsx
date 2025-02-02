// // // "use client";

// // // import { Card } from "@/components/ui/card";
// // // import LeafletMap from "@/components/map/LeafletMap";
// // // import ZoneList from "@/components/map/ZoneList";
// // // import { useZones } from "@/hooks/useZones";
// // // import { Alert, AlertDescription } from "@/components/ui/alert";
// // // import { Loader2 } from "lucide-react";
// // // import type { Id } from "@/convex/_generated/dataModel";

// // // interface Zone {
// // //   _id: Id<"zones">; // Changed from 'id' to '_id'
// // //   name: string;
// // //   coordinates: number[][];
// // //   area: number;
// // //   isActive: boolean;
// // //   description?: string;
// // //   createdAt: number;
// // //   updatedAt: number;
// // //   _creationTime: number;
// // // }

// // // export default function ZonesPage() {
// // //   const {
// // //     zones,
// // //     isLoading,
// // //     error,
// // //     createZone,
// // //     updateZone,
// // //     deleteZone,
// // //     toggleZoneActive,
// // //   } = useZones();

// // //   if (isLoading) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-[400px]">
// // //         <Loader2 className="h-8 w-8 animate-spin" />
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <Alert variant="destructive">
// // //         <AlertDescription>{error}</AlertDescription>
// // //       </Alert>
// // //     );
// // //   }

// // //   const handleZoneDelete = async (id: Id<"zones">) => {
// // //     // Updated type and made async
// // //     await deleteZone(id);
// // //   };

// // //   return (
// // //     <div className="space-y-8">
// // //       <div>
// // //         <h1 className="text-2xl font-bold tracking-tight">Dating Zones</h1>
// // //         <p className="text-muted-foreground">
// // //           Create and manage exclusive dating zones for your users.
// // //         </p>
// // //       </div>

// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //         <div className="md:col-span-2">
// // //           <Card>
// // //             <LeafletMap
// // //               zones={zones || []}
// // //               onZoneCreate={createZone}
// // //               onZoneUpdate={updateZone}
// // //               onZoneDelete={handleZoneDelete}
// // //             />
// // //           </Card>
// // //         </div>
// // //         <div>
// // //           <ZoneList zones={zones || []} onToggleActive={toggleZoneActive} />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import { Card } from "@/components/ui/card";
// // import LeafletMap from "@/components/map/LeafletMap";
// // import ZoneList from "@/components/map/ZoneList";
// // import { useZones } from "@/hooks/useZones";
// // import { Alert, AlertDescription } from "@/components/ui/alert";
// // import { Loader2 } from "lucide-react";
// // import type { Id } from "@/convex/_generated/dataModel";

// // interface Zone {
// //   _id: Id<"zones">;
// //   name: string;
// //   coordinates: number[][];
// //   area: number;
// //   isActive: boolean;
// //   description?: string;
// //   createdAt: number;
// //   updatedAt: number;
// //   _creationTime: number;
// // }

// // export default function ZonesPage() {
// //   const {
// //     zones,
// //     isLoading,
// //     error,
// //     createZone,
// //     updateZone,
// //     deleteZone,
// //     toggleZoneActive,
// //   } = useZones();

// //   if (isLoading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-[400px]">
// //         <Loader2 className="h-8 w-8 animate-spin text-primary" />
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
// //         <AlertDescription>{error}</AlertDescription>
// //       </Alert>
// //     );
// //   }

// //   const handleZoneDelete = async (id: Id<"zones">) => {
// //     await deleteZone(id);
// //   };

// //   return (
// //     <div className="container mx-auto py-8 px-4 space-y-8 max-w-7xl">
// //       <div className="space-y-2">
// //         <h1 className="text-3xl font-bold tracking-tight">Dating Zones</h1>
// //         <p className="text-muted-foreground text-lg">
// //           Create and manage exclusive dating zones for your users.
// //         </p>
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //         <div className="lg:col-span-2">
// //           <LeafletMap
// //             zones={zones || []}
// //             onZoneCreate={createZone}
// //             onZoneUpdate={updateZone}
// //             onZoneDelete={handleZoneDelete}
// //           />
// //         </div>
// //         <div className="space-y-6">
// //           <ZoneList zones={zones || []} onToggleActive={toggleZoneActive} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { Card } from "@/components/ui/card";
// import LeafletMap from "@/components/map/LeafletMap";
// import ZoneList from "@/components/map/ZoneList";
// import { useZones } from "@/hooks/useZones";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Loader2 } from "lucide-react";
// import type { Id } from "@/convex/_generated/dataModel";

// interface Zone {
//   _id: Id<"zones">;
//   name: string;
//   coordinates: number[][];
//   area: number;
//   isActive: boolean;
//   description?: string;
//   createdAt: number;
//   updatedAt: number;
//   _creationTime: number;
// }

// export default function ZonesPage() {
//   const {
//     zones,
//     isLoading,
//     error,
//     createZone,
//     updateZone,
//     deleteZone,
//     toggleZoneActive,
//   } = useZones();

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
//         <AlertDescription>{error}</AlertDescription>
//       </Alert>
//     );
//   }

//   const handleZoneDelete = async (id: Id<"zones">) => {
//     await deleteZone(id);
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//       <div className="lg:col-span-2">
//         <LeafletMap
//           zones={zones || []}
//           onZoneCreate={createZone}
//           onZoneUpdate={updateZone}
//           onZoneDelete={handleZoneDelete}
//         />
//       </div>
//       <div>
//         <ZoneList zones={zones || []} onToggleActive={toggleZoneActive} />
//       </div>
//     </div>
//   );
// }
"use client";

import { Card } from "@/components/ui/card";
import LeafletMap from "@/components/map/LeafletMap";
import ZoneList from "@/components/map/ZoneList";
import { useZones } from "@/hooks/useZones";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import type { Id } from "@/convex/_generated/dataModel";

interface Zone {
  _id: Id<"zones">;
  name: string;
  coordinates: number[][];
  area: number;
  isActive: boolean;
  description?: string;
  createdAt: number;
  updatedAt: number;
  _creationTime: number;
}

export default function ZonesPage() {
  const {
    zones,
    isLoading,
    error,
    createZone,
    updateZone,
    deleteZone,
    toggleZoneActive,
  } = useZones();
  const [focusedZoneId, setFocusedZoneId] = useState<Id<"zones"> | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const handleZoneDelete = async (id: Id<"zones">) => {
    await deleteZone(id);
    if (focusedZoneId === id) {
      setFocusedZoneId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <LeafletMap
          zones={zones || []}
          focusedZoneId={focusedZoneId}
          onZoneCreate={createZone}
          onZoneUpdate={updateZone}
          onZoneDelete={handleZoneDelete}
        />
      </div>
      <div>
        <ZoneList
          zones={zones || []}
          focusedZoneId={focusedZoneId}
          onZoneSelect={setFocusedZoneId}
          onToggleActive={toggleZoneActive}
        />
      </div>
    </div>
  );
}
