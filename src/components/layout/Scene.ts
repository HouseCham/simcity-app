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

    private draw(): void {
        if (!this.camera) return;
        this.renderer.render(this.scene, this.camera);
    }

    public start(): void {
        this.renderer.setAnimationLoop(this.draw.bind(this));
    };

    public stop(): void {
        this.renderer.setAnimationLoop(null);
    };

    private createGeometry(): void {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        this.scene.add(new Mesh(geometry, material));
    };
    /**
     * Handle mouse move event to update camera azimuth and elevation.
     * If the mouse is not down or the camera is not defined, return early.
     * @param event - The mouse event.
     * @returns 
     */
    public onMouseMove(event: MouseEvent): void {
        if (!this.mouse.isDown || !this.camera) return;
        console.log(event.clientX, event.clientY);
        this.camera.updateCameraAzimuth(this.mouse.lastMouseX, this.mouse.lastMouseY, event);
        this.mouse.setMousePosition(event);
    };
}