import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import * as turf from "@turf/turf";
import { cn } from "@/lib/utils";
import type { Id } from "@/convex/_generated/dataModel";

interface Zone {
  _id: Id<"zones">;
  name: string;
  description?: string;
  isActive: boolean;
  coordinates: number[][];
}

interface ZoneListProps {
  zones: Zone[];
  focusedZoneId?: Id<"zones"> | null;
  onZoneSelect: (id: Id<"zones"> | null) => void;
  onToggleActive: (id: Id<"zones">, isActive: boolean) => Promise<void>;
}

export default function ZoneList({
  zones,
  focusedZoneId,
  onZoneSelect,
  onToggleActive,
}: ZoneListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Zones
          <Badge variant="outline">{zones.length} Total</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {zones.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No zones created yet. Draw a zone on the map to get started.
          </p>
        ) : (
          zones.map((zone) => {
            const polygon = turf.polygon([zone.coordinates]);
            const area = turf.area(polygon);
            const isSelected = zone._id === focusedZoneId;

            return (
              <div
                key={zone._id}
                className={cn(
                  "flex items-start justify-between p-4 rounded-lg space-x-4 cursor-pointer transition-colors",
                  isSelected
                    ? "bg-primary/10 hover:bg-primary/15"
                    : "bg-muted hover:bg-muted/70",
                )}
                onClick={() => onZoneSelect(isSelected ? null : zone._id)}
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <h3 className="font-medium truncate">{zone.name}</h3>
                  {zone.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {zone.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Area: {(area / 1000000).toFixed(2)} km²
                  </p>
                </div>
                <Toggle
                  pressed={zone.isActive}
                  onPressedChange={(pressed) => {
                    onToggleActive(zone._id, pressed);
                  }}
                  size="sm"
                  className="min-w-[80px]"
                  aria-label="Toggle zone active state"
                  onClick={(e) => e.stopPropagation()}
                >
                  {zone.isActive ? "Active" : "Inactive"}
                </Toggle>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
