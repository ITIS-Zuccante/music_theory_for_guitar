import { circleOfFifths } from "./circle_of_fifths.js";
import { majorKeys, majorIntervals, majorColors } from "./major.js";

let circle = circleOfFifths(
    document.getElementById("circle_of_fifhts"),
    majorKeys,
    majorIntervals,
    majorColors
);

circle.draw();

document.getElementById("rotate").addEventListener("click", 
() => {
    circle.rotateL();
    circle.draw();
});
