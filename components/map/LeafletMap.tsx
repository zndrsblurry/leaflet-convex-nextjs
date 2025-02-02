// "use client";

// import { useEffect, useRef, useState } from "react";
// import dynamic from "next/dynamic";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent } from "@/components/ui/card";
// import type { Id } from "@/convex/_generated/dataModel";

// // Dynamically import Leaflet with no SSR
// const LeafletMapComponent = dynamic(() => import("./LeafletMapComponent"), {
//   ssr: false,
// });

// interface Zone {
//   _id: Id<"zones">;
//   name: string;
//   coordinates: number[][];
//   area: number;
//   isActive: boolean;
//   description?: string;
// }

// interface LeafletMapProps {
//   zones: Zone[];
//   focusedZoneId?: Id<"zones"> | null;
//   onZoneCreate: (
//     coordinates: number[][],
//     name: string,
//     description: string,
//   ) => Promise<void>;
//   onZoneUpdate: (id: Id<"zones">, coordinates: number[][]) => Promise<void>;
//   onZoneDelete: (id: Id<"zones">) => Promise<void>;
// }

// export default function LeafletMap(props: LeafletMapProps) {
//   const [showDialog, setShowDialog] = useState(false);
//   const [newZoneData, setNewZoneData] = useState({
//     coordinates: [] as number[][],
//     name: "",
//     description: "",
//   });

//   const handleCreateZone = () => {
//     props.onZoneCreate(
//       newZoneData.coordinates,
//       newZoneData.name,
//       newZoneData.description,
//     );
//     setShowDialog(false);
//     setNewZoneData({ coordinates: [], name: "", description: "" });
//   };

//   return (
//     <Card className="overflow-hidden">
//       <CardContent className="p-0">
//         <LeafletMapComponent
//           {...props}
//           onShowDialog={() => setShowDialog(true)}
//           onSetNewZoneData={setNewZoneData}
//         />
//       </CardContent>

//       <Dialog open={showDialog} onOpenChange={setShowDialog}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle className="text-xl">Create New Zone</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="name" className="text-sm font-medium">
//                 Zone Name
//               </Label>
//               <Input
//                 id="name"
//                 placeholder="Enter zone name"
//                 value={newZoneData.name}
//                 onChange={(e) =>
//                   setNewZoneData({ ...newZoneData, name: e.target.value })
//                 }
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="description" className="text-sm font-medium">
//                 Description
//               </Label>
//               <Textarea
//                 id="description"
//                 placeholder="Enter zone description"
//                 value={newZoneData.description}
//                 onChange={(e) =>
//                   setNewZoneData({
//                     ...newZoneData,
//                     description: e.target.value,
//                   })
//                 }
//               />
//             </div>
//           </div>
//           <DialogFooter className="gap-2">
//             <Button variant="outline" onClick={() => setShowDialog(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleCreateZone} disabled={!newZoneData.name}>
//               Create Zone
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// }
// v2 test
"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { Map as LMap, FeatureGroup, LatLngExpression } from "leaflet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import type { Id } from "@/convex/_generated/dataModel";

// Dynamically import Leaflet with no SSR
const LeafletMapComponent = dynamic(() => import("./LeafletMapComponent"), {
  ssr: false,
});

interface Zone {
  _id: Id<"zones">;
  name: string;
  coordinates: number[][];
  area: number;
  isActive: boolean;
  description?: string;
}

interface LeafletMapProps {
  zones: Zone[];
  focusedZoneId?: Id<"zones"> | null;
  onZoneCreate: (
    coordinates: number[][],
    name: string,
    description: string,
  ) => Promise<void>;
  onZoneUpdate: (id: Id<"zones">, coordinates: number[][]) => Promise<void>;
  onZoneDelete: (id: Id<"zones">) => Promise<void>;
}

export default function LeafletMap(props: LeafletMapProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [newZoneData, setNewZoneData] = useState({
    coordinates: [] as number[][],
    name: "",
    description: "",
  });

  const handleCreateZone = () => {
    props.onZoneCreate(
      newZoneData.coordinates,
      newZoneData.name,
      newZoneData.description,
    );
    setShowDialog(false);
    setNewZoneData({ coordinates: [], name: "", description: "" });
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <LeafletMapComponent
          {...props}
          onShowDialog={() => setShowDialog(true)}
          onSetNewZoneData={setNewZoneData}
        />
      </CardContent>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Zone</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Zone Name
              </Label>
              <Input
                id="name"
                placeholder="Enter zone name"
                value={newZoneData.name}
                onChange={(e) =>
                  setNewZoneData({ ...newZoneData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter zone description"
                value={newZoneData.description}
                onChange={(e) =>
                  setNewZoneData({
                    ...newZoneData,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateZone} disabled={!newZoneData.name}>
              Create Zone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
