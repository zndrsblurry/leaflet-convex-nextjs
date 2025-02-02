import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import * as turf from "@turf/turf";
import type { Id } from "../convex/_generated/dataModel";

export function useZones() {
  const zones = useQuery(api.zones.list);
  const create = useMutation(api.zones.create);
  const update = useMutation(api.zones.update);
  const remove = useMutation(api.zones.remove);

  const createZone = async (
    coordinates: number[][],
    name: string,
    description?: string,
  ) => {
    try {
      // Calculate area using turf.js
      const polygon = turf.polygon([coordinates]);
      const area = turf.area(polygon);

      await create({
        name,
        coordinates,
        description,
        area,
      });
    } catch (error) {
      console.error("Failed to create zone:", error);
      throw error;
    }
  };

  const updateZone = async (id: Id<"zones">, coordinates: number[][]) => {
    try {
      // Recalculate area if coordinates changed
      const polygon = turf.polygon([coordinates]);
      const area = turf.area(polygon);

      await update({
        id,
        coordinates,
        area,
      });
    } catch (error) {
      console.error("Failed to update zone:", error);
      throw error;
    }
  };

  const deleteZone = async (id: Id<"zones">) => {
    try {
      await remove({ id });
    } catch (error) {
      console.error("Failed to delete zone:", error);
      throw error;
    }
  };

  const toggleZoneActive = async (id: Id<"zones">, isActive: boolean) => {
    try {
      await update({
        id,
        isActive,
      });
    } catch (error) {
      console.error("Failed to toggle zone:", error);
      throw error;
    }
  };

  return {
    zones,
    isLoading: zones === undefined,
    error: null,
    createZone,
    updateZone,
    deleteZone,
    toggleZoneActive,
  };
}
