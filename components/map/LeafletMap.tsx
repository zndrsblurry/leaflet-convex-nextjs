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

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Id } from "@/convex/_generated/dataModel";
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

// Import map component dynamically to avoid SSR issues
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newZone, setNewZone] = useState({
    coordinates: [] as number[][],
    name: "",
    description: "",
  });

  const handleCreateZone = async () => {
    if (!newZone.name) return;

    try {
      await props.onZoneCreate(
        newZone.coordinates,
        newZone.name,
        newZone.description,
      );
      setDialogOpen(false);
      setNewZone({ coordinates: [], name: "", description: "" });
    } catch (error) {
      console.error("Failed to create zone:", error);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <LeafletMapComponent
          {...props}
          onCreateDrawing={(coordinates) => {
            setNewZone((prev) => ({ ...prev, coordinates }));
            setDialogOpen(true);
          }}
        />
      </CardContent>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setNewZone({ coordinates: [], name: "", description: "" });
          }
          setDialogOpen(open);
        }}
      >
        <DialogContent className="z-[9999] fixed shadow-lg sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Zone</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Zone Name</Label>
              <Input
                id="name"
                value={newZone.name}
                onChange={(e) =>
                  setNewZone((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter zone name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newZone.description}
                onChange={(e) =>
                  setNewZone((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter zone description"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
                setNewZone({ coordinates: [], name: "", description: "" });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateZone}
              disabled={!newZone.name || newZone.coordinates.length < 3}
            >
              Create Zone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
