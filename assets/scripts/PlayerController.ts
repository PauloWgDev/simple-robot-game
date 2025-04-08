import {
    _decorator, Component, Node, Vec2, Vec3, RigidBody2D, Collider2D, Animation, Contact2DType, IPhysics2DContact, BoxCollider2D
} from 'cc';

const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    @property({ type: Number })
    public speed: number = 40;

    @property({ type: Number })
    public jumpSpeed: number = 20;

    @property({ type: Number })
    public maxJumps: number = 2;

    private countJumps: number = 0;


    private isGrounded: boolean = false;

    @property({ type: Node })
    public inputManagerNode: Node = null;
    private inputManager: any = null;

    private rb!: RigidBody2D;

    private animationComponent: Animation;

    // handle animation

    private isMoving: boolean = false;
    private hasFlipped: boolean = false;

    public reset: boolean = false;


    start()
    {
        let collider = this.getComponent(BoxCollider2D);

        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }

        this.inputManager = this.inputManagerNode.getComponent('InputManager');
        this.rb = this.getComponent(RigidBody2D);
        this.animationComponent = this.getComponentInChildren(Animation);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

        if (otherCollider.tag === 1) {
            this.isGrounded = true;
            this.countJumps = 0;
        }
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

        if (otherCollider.tag === 1) {
            this.isGrounded = false;
        }
    }

    handleAnimation() {

        if (this.isMoving) {
            if (this.isGrounded == false) {
                this.animationComponent.play('move_jump');
                return;
            }
            this.animationComponent.play('move');
        }
        else {
            if (this.isGrounded == false) {
                this.animationComponent.play('jump');
                return;
            }
            console.log("idle");
            this.animationComponent.play('idle');
        }
    }

    update(deltaTime: number)
    {
        if (this.reset) {
            this.node.setWorldPosition(new Vec3(300, 1800, 0));
            this.reset = false;
        }

        // Horizontal Direction
        let dirX = 0;

        if (this.inputManager.moveLeft) dirX -= 1;
        if (this.inputManager.moveRight) dirX += 1;

        // Move
        this.rb.linearVelocity = new Vec2(dirX * this.speed, this.rb.linearVelocity.y);

        // Jumping
        if (this.inputManager.jump && this.countJumps < this.maxJumps) {

            this.rb.linearVelocity = new Vec2(this.rb.linearVelocity.x, this.jumpSpeed);
            this.isGrounded = false;
            this.inputManager.jump = false;
            this.countJumps++;
        }

        // Flip sprite based on movement direction:
        if (dirX < 0) {
            if (!this.hasFlipped) {
                let currentScale = this.node.scale;
                this.node.setScale(new Vec3(-Math.abs(currentScale.x), currentScale.y));
                this.hasFlipped = true;
            }
        } else if (dirX > 0) {
            if (this.hasFlipped) {
                let currentScale = this.node.scale;
                this.node.setScale(new Vec3(Math.abs(currentScale.x), currentScale.y));
                this.hasFlipped = false;
            }
        }

        this.isMoving = (dirX != 0) ? true : false;

        this.handleAnimation();
    }
}


