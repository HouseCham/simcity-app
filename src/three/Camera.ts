import { PerspectiveCamera, Vector3 } from "three";
/**
 * Camera class extends the PerspectiveCamera from three.js.
 * It handles the camera's position and orientation in a 3D scene.
 */
export class Camera extends PerspectiveCamera {
    // Constants for camera movement and rotation
    private readonly DEGREE_TO_RADIAN: number = Math.PI / 180;
    private readonly MIN_CAMERA_RADIUS: number = 10;
    private readonly MAX_CAMERA_RADIUS: number = 20;
    private readonly Y_AXIS: Vector3 = new Vector3(0, 1, 0);
    private readonly ROTATION_SENSITIVITY: number = 0.5;
    private readonly ZOOM_SENSITIVITY: number = 0.02;
    private readonly PAN_SENSITIVITY: number = -0.01;
    private readonly MIN_CAMERA_ELEVATION: number = 0;
    private readonly MAX_CAMERA_ELEVATION: number = 90;

    private cameraOrigin: Vector3 = new Vector3();
    private cameraRadius: number = (this.MIN_CAMERA_RADIUS + this.MAX_CAMERA_RADIUS) / 2;
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
        this.cameraAzimuth += -((event.clientX - lastMouseX) * this.ROTATION_SENSITIVITY);
        this.cameraElevation += ((event.clientY - lastMouseY) * this.ROTATION_SENSITIVITY);
        this.cameraElevation = Math.min(this.MAX_CAMERA_ELEVATION, Math.max(this.MIN_CAMERA_ELEVATION, this.cameraElevation));

        this.updateCameraPosition();
    };
    /**
     * Update the camera position based on the current azimuth and elevation angles.
     * The camera radius is fixed at 4 units.
     * The camera position is calculated using spherical coordinates.
     * The camera looks at the origin (0, 0, 0).
     */
    public updateCameraPosition(): void {
        this.position.x = this.cameraRadius * Math.sin(this.cameraAzimuth * this.DEGREE_TO_RADIAN) * Math.cos(this.cameraElevation * this.DEGREE_TO_RADIAN);
        this.position.y = this.cameraRadius * Math.sin(this.cameraElevation * this.DEGREE_TO_RADIAN);
        this.position.z = this.cameraRadius * Math.cos(this.cameraAzimuth * this.DEGREE_TO_RADIAN) * Math.cos(this.cameraElevation * this.DEGREE_TO_RADIAN);
        this.position.add(this.cameraOrigin);
        this.lookAt(this.cameraOrigin);
        this.updateMatrix();
    }
    /**
     * Handle mouse wheel event to zoom the camera in and out.
     * The camera radius is adjusted based on the mouse wheel movement.
     * @param lastMouseY - The last mouse Y position.
     * @param event - The mouse event.
     * @returns void
     */
    public handleCameraZoom(lastMouseY: number, event: MouseEvent): void {
        this.cameraRadius += (event.clientY - lastMouseY) * this.ZOOM_SENSITIVITY;
        this.cameraRadius = Math.min(this.MAX_CAMERA_RADIUS, Math.max(this.MIN_CAMERA_RADIUS, this.cameraRadius));
        this.updateCameraPosition();
    }
    /**
     * Handle mouse move event to pan the camera.
     * The camera position is adjusted based on the mouse movement.
     * @param lastMouseX - The last mouse X position.
     * @param lastMouseY - The last mouse Y position.
     * @param event - The mouse event.
     * @returns void
     */
    public handlePanning(lastMouseX: number, lastMouseY: number, event: MouseEvent): void {
        const deltaX = event.clientX - lastMouseX;
        const deltaY = event.clientY - lastMouseY;

        const forward = new Vector3(0, 0, 1).applyAxisAngle(this.Y_AXIS, this.cameraAzimuth * this.DEGREE_TO_RADIAN);
        const left = new Vector3(1, 0, 0).applyAxisAngle(this.Y_AXIS, this.cameraAzimuth * this.DEGREE_TO_RADIAN);

        this.cameraOrigin.add(forward.multiplyScalar(this.PAN_SENSITIVITY * deltaY));
        this.cameraOrigin.add(left.multiplyScalar(this.PAN_SENSITIVITY * deltaX));

        this.updateCameraPosition();
    }
}