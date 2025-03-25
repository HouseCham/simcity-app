import { CityTile } from "@/domain/types/CityTile";

export class City {
    private readonly CITY_SIZE: number = 16;
    public size: number;
    public cityData: CityTile[][];

    constructor() {
        this.size = this.CITY_SIZE;
        this.cityData = [];
        this.initializeCity();
    }

    private initializeCity(): void {
        for (let x = 0; x < this.size; x++) {
            const column: CityTile[] = [];
            for (let z = 0; z < this.size; z++) {
                const tile: CityTile = {
                    x, z, update: () => {
                        const random = Math.random();
                        if (random < 0.01) {
                            switch (tile.building) {
                                case undefined:
                                    tile.building = "building-1";
                                    break;
                                case "building-1":
                                    tile.building = "building-2";
                                    break;
                                case "building-2":
                                    tile.building = "building-3";
                                    break;
                            }
                        }
                    }
                };

                column.push(tile);
            };
            this.cityData.push(column);
        }
    }
    /**
     * Runs the update function for each tile in the city grid.
     */
    public updateCityData(): void {
        for (let x = 0; x < this.size; x++) {
            for (let z = 0; z < this.size; z++) {
                this.cityData[x][z].update();
            };
        }
    }
}