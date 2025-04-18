# Introduction

I decided to make a platformer prototype for this challenge. Overall, thanks to my prior experience with TypeScript and Unity, learning the engine was intuitive. But still, I did encounter a some challenges during the development process.

# Technical challenges

## Collision Detection

In the game I use collision detection to determine when the player is on the ground. Initially, I defined `onBeginContact` and `onEndContact` methods, but these were not automatically called as expected.

After searching the documentation, I discovered that I needed to explicitly register these callbacks for the collider. To make it work correctly, I added the following code in the start() method:

```ts
    let collider = this.getComponent(BoxCollider2D);
    if (collider) {
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }
```


## Collision on Children Node

At one point I tried to add a collision to child node of the `Player`,
when I did this I noticed that the game was behaving in weird ways,
It took me a while to realize that when you add a collision to a child Node, 
it does not automatically move with the parent. 
To fix this I simply made sure all the colliders I needed were on the Parent Node.

## Set Position

When the player hits the Button it gets teleported to defined position, 
at first I tried to do this in a `Button.ts` inside a `onBeginContact` method, but changing the position of the player from there did not work.
I used chat gpt to understand why it was not working and it told me that the physics overrides the position if you do it inside of `onBeginContact`, 
so the work around I made was creating a boolean variable in the `Player.ts` script and make it `true` when I needed to do the teleportation of the player, and inside the `update` function of the player i set the position.

# Conclusion

Getting started with the engine was quite smooth, especially since I had some experience with TypeScript and other game engines like Unity. That said, there were still a few parts that took me by surprise,like how collision callbacks need to be manually registered or how setting the position needs to be done in a specific way. These differences compared to Unity were a bit confusing at first, but by going through the documentation and experimenting on my own, I was able to find solutions and understand the engine’s workflow. Overall, it was a great learning experience that gave me a good starting point for future projects.


# Showcase


https://github.com/user-attachments/assets/bde06424-3b6e-4156-82ef-cf4401a7aa5d



