import { _decorator, Component, input, Input, EventKeyboard, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('InputManager')
export class InputManager extends Component {

    public moveLeft: boolean = false;
    public moveRight: boolean = false;
    public moveUp: boolean = false;
    public moveDown: boolean = false;
    public jump: boolean = false;

    start()
    {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.ARROW_UP:
                this.moveUp = true;
                break;
            case KeyCode.KEY_S:
            case KeyCode.ARROW_DOWN:
                this.moveDown = true;
                break;
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
                this.moveLeft = true;
                break;
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                this.moveRight = true;
                break;
            case KeyCode.SPACE:
                this.jump = true;
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.ARROW_UP:
                this.moveUp = false;
                break;
            case KeyCode.KEY_S:
            case KeyCode.ARROW_DOWN:
                this.moveDown = false;
                break;
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
                this.moveLeft = false;
                break;
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                this.moveRight = false;
                break;
            case KeyCode.SPACE:
                this.jump = false;
                break;
        }
    }
}


