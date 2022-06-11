import { circleOfFifths } from "./circle_of_fifths.js";
import { majorKeys, majorIntervals, majorColors } from "./major.js";
import { minorKeys, minorIntervals, minorColors } from "./natural_minor.js";

let data = {
    keys: minorKeys, //majorKeys,
    intervals: minorIntervals,// majorIntervals,
    colors: minorColors// majorColors
}

let circle = circleOfFifths(
    document.getElementById("circle_of_fifhts"),
    data.keys,
    data.intervals,
    data.colors
);

circle.draw();

document.getElementById("rotate").addEventListener("click", 
() => {
    circle.rotateL();
    circle.draw();
});
