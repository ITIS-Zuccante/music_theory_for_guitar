import { circleOfFifths } from "./circle_of_fifths.js";
import { minorKeys, minorIntervals, minorColors } from "./natural_minor.js";

let circle = circleOfFifths(
    document.getElementById("circle_of_fifhts"),
    minorKeys,
    minorIntervals,
    minorColors
);

circle.draw();

document.getElementById("rotate").addEventListener("click", 
() => {
    circle.rotateL();
    circle.draw();
});
