# Bouncing Ball Scene

## Key Points in the Code

###	Physics Integration:
- `useSphere` is used to create the ball with dynamic physics properties.
- `usePlane` is used to create the static ground.

###	Physics Properties:
-	`mass`: Defines the weight of the object.
-	`restitution`: Determines bounciness.
-	`position`: Sets the initial position.

### Canvas:
-	The `<Canvas>` component is the root of the React Three Fiber scene.
-	`shadows` enables shadow rendering.

### Lights:
-	`ambientLight` provides general lighting.
-	`spotLight` adds more focused light with shadows.

### OrbitControls:
-	Enables camera controls for zooming and rotating around the scene.
