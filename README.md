Please create an interactive birthday card HTML webpage with the following functionalities and features:

**Overall Requirements:**

* The initial interface displays a clickable envelope.
* Upon clicking the envelope, use Three.js to display a 3D birthday cake model and birthday wishes.
* The entire page should be responsive, adapting to different screen sizes.
* this website should work well both in pc and in mobile phone

**Initial Envelope Interface:**

* Create a pink envelope (color code: #FFB6C1) with a width of 300px and a height of 200px.
* The envelope has a folded triangular flap on top (implemented using CSS ::before).
* The envelope displays the text "Click to Open" centered.
* The envelope has a slight enlargement effect when hovered over (transform: scale(1.05)).
* The background color code: #FFF5EE.
* after click, show confetti effect

**3D Scene Implementation:**

* Use Three.js to create a 3D scene, camera, and renderer.
* Add OrbitControls for interactive rotation and zooming functionality.
* The scene should include ambient light and directional light to illuminate the cake correctly.
* The Scene background should match the page background.

**Cake Model Details:**

* Three-layer cake structure:
    * Bottom layer: Cylinder with a diameter of 4 (radius 2) and a height of 0.5, color #CD5C5C.
    * Middle layer: Cylinder with a diameter of 3 (radius 1.5) and a height of 0.5, color #FFA07A	.
    * Top layer: Cylinder with a diameter of 2 (radius 1) and a height of 0.5, color #FFDAB9.
    * Each layer have no gap
* White frosting decorations:
    * Add ring-shaped (Torus) geometry as frosting to the edge of each cake layer.
    * Frosting color is papayaWhip (#FFEFD5).
* Decoration Details:
    * Randomly distribute approximately 20 colored small ball decorations on the cake surface.
    * Use multiple colors for the decorative balls (red, green, blue, yellow, purple, cyan).

**Animations and Interactions:**

* The cake should rotate continuously at a slow speed (rotate 0.005 radians per frame on the Y-axis).
* Implement adaptive adjustment for window size changes.
* Use OrbitControls to allow users to rotate the view and zoom using mouse dragging.

**Birthday Wishes Area:**

* Display a white card with a width of 300px on the right side of the 3D scene.
* The card includes a "Happy Birthday!" title and approximately 200 words of birthday wishes text.
* The card should have rounded corners and shadow effects.
* The text should contain good wishes for the birthday person Gao YuanYuan, formatted into 3 short paragraphs.

**Technical Requirements:**

* Use the latest version of the Three.js library.
* Ensure clear code structure with appropriate comments.
* Implement a smooth transition from clicking the envelope to displaying the 3D scene.
* Implement all content using HTML/CSS/JavaScript, without relying on other libraries.
