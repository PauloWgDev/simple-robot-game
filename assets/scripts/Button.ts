import { _decorator, Component, Node, BoxCollider2D, Contact2DType, RigidBody2D, Vec3, Vec2, Collider2D, IPhysics2DContact, UITransform } from 'cc';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

@ccclass('Button')
export class Button extends Component {


    @property({ type: Node })
    public Player: Node = null;

    @property({ type: Node })
    public SpawnPos: Node = null;

    start() {
        let collider = this.getComponent(BoxCollider2D);

        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag == 2) {
            console.log("Should TP");

            this.Player.getComponent(PlayerController).reset = true;
        }
    }
}


