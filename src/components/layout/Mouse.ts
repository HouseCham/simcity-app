/**
 * Class representing the mouse state and events.
 * It tracks the mouse button state and the last mouse position.
 */
export class Mouse {
    public isDown: boolean;
    public lastMouseX: number;
    public lastMouseY: number;

    constructor() {
        this.isDown = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
    }
    /**
     * Handle mouse down event to initiate camera movement.
     * Sets the isMouseDown flag to true and stores the last mouse position.
     * @param event - The mouse event.
     * @returns void
     */
    public onMouseDown(event: MouseEvent): void {
        this.isDown = true;
        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
    };
    /**
     * Handle mouse up event to stop camera movement.
     * Sets the isMouseDown flag to false.
     * @returns void
     */
    public onMouseUp(): void {
        this.isDown = false;
    };
    /**
     * Set the last mouse position.
     * @param event - The mouse event.
     * @returns void
     */
    public setMousePosition(event: MouseEvent): void {
        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
    }
}