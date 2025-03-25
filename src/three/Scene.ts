import {
    Scene as ThreeScene,
    Color,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    Object3DEventMap,
    AmbientLight,
    DirectionalLight,
    MeshLambertMaterial,
} from 'three';
import { Camera } from './Camera';
import { Mouse } from './Mouse';
import { City } from '@/three/models/City';
/**
 * Scene class handles the rendering of a 3D scene using Three.js.
 * It initializes the WebGL renderer, camera, and scene.
 */
export class Scene {
    private city: City;
    private gameWindow: HTMLElement | null;
    private renderer: WebGLRenderer
    private scene: ThreeScene;
    private camera: Camera | undefined;

    // models
    private terrains: Mesh<BoxGeometry, MeshLambertMaterial, Object3DEventMap>[][] = [];
    private buildings: Mesh<BoxGeometry, MeshLambertMaterial, Object3DEventMap>[][] = [];

    public mouse: Mouse;
    /**
     * Constructor initializes the scene, renderer, camera, and mouse.
     * It sets the background color of the scene and creates a simple geometry.
     */
    constructor() {
        this.gameWindow = document.getElementById('render-target');
        this.renderer = new WebGLRenderer();
        this.mouse = new Mouse();
        this.city = new City();

        this.scene = new ThreeScene();
        this.scene.background = new Color(0x777777);

        if (this.gameWindow) {
            this.camera = new Camera(this.gameWindow.offsetWidth / this.gameWindow.offsetHeight);
            this.camera.updateCameraPosition();

            this.renderer.setSize(this.gameWindow.offsetWidth, this.gameWindow.offsetHeight);
            this.gameWindow.appendChild(this.renderer.domElement);
            this.createGeometry();
        };

        this.initializeScene();
    }
    private initializeScene(): void {
        this.scene.clear();
        this.terrains = [];
        for (let x = 0; x < this.city.size; x++) {
            const column: Mesh<BoxGeometry, MeshLambertMaterial, Object3DEventMap>[] = [];
            for (let z = 0; z < this.city.size; z++) {
                // === GRASS GEOMETRY ===
                // 1. Load the mesh/3d object corresponding to the tile (x, z)
                const geometry = new BoxGeometry(1, 1, 1);
                const material = new MeshLambertMaterial({ color: 0x00ff00 });
                const mesh = new Mesh(geometry, material);
                // 2. Add the mesh to the scene
                mesh.position.set(x, -0.5, z); // Set the position based on the tile coordinates
                this.scene.add(mesh);
                // 3. Add that mesh to the terrains array
                column.push(mesh);
            }
            this.terrains.push(column);
            this.buildings.push([...Array(this.city.size)])
        }

        this.setUpLights();
    };

    private setUpLights(): void {
        const lights = [
            new AmbientLight(0xffffff, 0.2),
            new DirectionalLight(0xffffff, 0.3),
            new DirectionalLight(0xffffff, 0.3),
            new DirectionalLight(0xffffff, 0.3),
        ]

        lights[1].position.set(0, 1, 0);
        lights[2].position.set(1, 1, 0);
        lights[3].position.set(0, 1, 1);

        this.scene.add(...lights);
    };
    /**
     * Render the scene using the camera.
     * The render method is called in the animation loop to continuously update the scene.
     * @returns void
     */
    private draw(): void {
        if (!this.camera) return;
        this.renderer.render(this.scene, this.camera);
    }
    /**
     * Start the animation loop.
     */
    public start(): void {
        this.renderer.setAnimationLoop(this.draw.bind(this));
    };
    /**
     * Stop the animation loop.
     */
    public stop(): void {
        this.renderer.setAnimationLoop(null);
    };
    /**
     * Create a simple geometry (a box) and add it to the scene.
     * The geometry is created using BoxGeometry and a basic material.
     * @returns void
     */
    private createGeometry(): void {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        this.scene.add(new Mesh(geometry, material));
    };
    /**
     * Handle mouse move event to update camera azimuth and elevation.
     * If the mouse is not down or the camera is not defined, return early.
     * @param event - The mouse event.
     * @returns void
     */
    public onMouseMove(event: MouseEvent): void {
        if (!this.camera) return;
        if (this.mouse.isLeftBtnDown) {
            this.camera.updateCameraAzimuth(this.mouse.lastMouseX, this.mouse.lastMouseY, event);
        } else if (this.mouse.isRightBtnDown) {
            this.camera.handleCameraZoom(this.mouse.lastMouseY, event);
        } else if (this.mouse.isMiddleBtnDown) {
            this.camera.handlePanning(this.mouse.lastMouseX, this.mouse.lastMouseY, event);
        };
        this.mouse.setMousePosition(event);
    };
    /**
     * Updates the scene data.
     * This method is called in the animation loop to update the scene data.
     * @returns void
     */
    public updateSceneData(): void {
        this.city.updateCityData();
        this.updateBuildings();
    }

    private updateBuildings(): void {
        for (let x = 0; x < this.city.size; x++) {
            for (let z = 0; z < this.city.size; z++) {
                const tile = this.city.cityData[x][z];

                if (tile.building && tile.building.startsWith("building")) {
                    const heigh = Number(tile.building.slice(-1));
                    const buildingGeometry = new BoxGeometry(1, heigh, 1);
                    const buildingMaterial = new MeshLambertMaterial({ color: 0x777777 });
                    const buildingMesh = new Mesh(buildingGeometry, buildingMaterial);
                    buildingMesh.position.set(x, heigh / 2, z);

                    if (this.buildings[x][z]) {
                        this.scene.remove(this.buildings[x][z]);
                    }

                    this.scene.add(buildingMesh);
                    this.buildings[x][z] = buildingMesh;
                }

            }
        }
    }
}