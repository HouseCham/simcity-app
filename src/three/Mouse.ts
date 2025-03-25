/**
 * Class representing the mouse state and events.
 * It tracks the mouse button state and the last mouse position.
 */
export class Mouse {
    private readonly LEFT_MOUSE_BUTTON: number = 0;
    private readonly MIDDLE_MOUSE_BUTTON: number = 1;
    private readonly RIGHT_MOUSE_BUTTON: number = 2;

    public isLeftBtnDown: boolean;
    public isRightBtnDown: boolean;
    public isMiddleBtnDown: boolean;
    public lastMouseX: number;
    public lastMouseY: number;

    constructor() {
        this.isLeftBtnDown = false;
        this.isRightBtnDown = false;
        this.isMiddleBtnDown = false;
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
        this.handleBtnClickedFlag(event.button, true);
        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
    };
    /**
     * Handle mouse up event to stop camera movement.
     * Sets the isMouseDown flag to false.
     * @returns void
     */
    public onMouseUp(event: MouseEvent): void {
        this.handleBtnClickedFlag(event.button, false);
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
    /**
     * Centralized method to handle mouse button press events.
     * This method updates the state of the mouse buttons based on the button clicked and the flag.
     * @param buttonClicked - The button that was clicked (0 for left, 1 for middle, 2 for right).
     * @param flag - The state of the button (true for down, false for up).
     * @returns void
     */
    private handleBtnClickedFlag(buttonClicked: number, flag: boolean): void {
        switch (buttonClicked) {
            case this.LEFT_MOUSE_BUTTON:
                this.isLeftBtnDown = flag;
                break;
            case this.MIDDLE_MOUSE_BUTTON:
                this.isMiddleBtnDown = flag;
                break;
            case this.RIGHT_MOUSE_BUTTON:
                this.isRightBtnDown = flag;
                break;
        }
    }
}