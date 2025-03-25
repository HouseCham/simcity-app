import { Building } from "./Building";

/**
 * @typedef {CityTile}
 * @property {number} x - The x coordinate of the tile.
 * @property {number} y - The y coordinate of the tile.
 * @description Represents a tile in the city grid.
 * Each tile has an x and y coordinate representing its position in the grid.
 */
export type CityTile = {
    x: number;
    z: number;
    building?: Building;
    update: () => void;
}