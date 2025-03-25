import {
    Scene as ThreeScene,
    Color,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
} from 'three';
import { Camera } from './Camera';
import { Mouse } from './Mouse';
/**
 * Scene class handles the rendering of a 3D scene using Three.js.
 * It initializes the WebGL renderer, camera, and scene.
 */
export class Scene {
    private gameWindow: HTMLElement | null;
    private renderer: WebGLRenderer
    private scene: ThreeScene;
    private camera: Camera | undefined;
    public mouse: Mouse;

    constructor() {
        this.gameWindow = document.getElementById('render-target');
        this.renderer = new WebGLRenderer();
        this.mouse = new Mouse();

        this.scene = new ThreeScene();
        this.scene.background = new Color(0x777777);

        if (this.gameWindow) {
            this.camera = new Camera(this.gameWindow.offsetWidth / this.gameWindow.offsetHeight);
            this.camera.updateCameraPosition();

            this.renderer.setSize(this.gameWindow.offsetWidth, this.gameWindow.offsetHeight);
            this.gameWindow.appendChild(this.renderer.domElement);
            this.createGeometry();
        };
    }
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
}