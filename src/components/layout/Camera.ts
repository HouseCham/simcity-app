import { PerspectiveCamera } from "three";
/**
 * Camera class extends the PerspectiveCamera from three.js.
 * It handles the camera's position and orientation in a 3D scene.
 */
export class Camera extends PerspectiveCamera {
    private cameraRadius: number = 4;
    private cameraAzimuth: number = 0;
    private cameraElevation: number = 0;
    /**
     * Constructor for the Camera class.
     * Initializes the camera with a field of view, aspect ratio, near and far clipping planes.
     * @param aspect - The aspect ratio of the camera.
     */
    constructor(aspect: number) {
        super(75, aspect, 0.1, 1000);
        this.position.z = 5;
    };
    /**
     * Handle mouse down event to initiate camera movement.
     * Sets the isMouseDown flag to true and stores the last mouse position.
     * @param lastMouseX - The last mouse X position.
     * @param lastMouseY - The last mouse Y position.
     * @param event - The mouse event.
     * @returns void
     */
    public updateCameraAzimuth(lastMouseX: number, lastMouseY: number, event: MouseEvent): void {
        this.cameraAzimuth += -((event.clientX - lastMouseX) * 0.5);
        this.cameraElevation += ((event.clientY - lastMouseY) * 0.5);
        this.cameraElevation = Math.min(90, Math.max(0, this.cameraElevation));

        this.updateCameraPosition();
    };
    /**
     * Update the camera position based on the current azimuth and elevation angles.
     * The camera radius is fixed at 4 units.
     * The camera position is calculated using spherical coordinates.
     * The camera looks at the origin (0, 0, 0).
     */
    public updateCameraPosition(): void {
        this.position.x = this.cameraRadius * Math.sin(this.cameraAzimuth * Math.PI / 180) * Math.cos(this.cameraElevation * Math.PI / 180);
        this.position.y = this.cameraRadius * Math.sin(this.cameraElevation * Math.PI / 180);
        this.position.z = this.cameraRadius * Math.cos(this.cameraAzimuth * Math.PI / 180) * Math.cos(this.cameraElevation * Math.PI / 180);
        this.lookAt(0, 0, 0);
        this.updateMatrix();
    }
}