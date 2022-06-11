import { majCircleOfFifths } from "./maj_circle_of_fifths.js";
import {drawMinCircleOfFifths} from "./min_circle_of_fifths.js";

let majorKeys = [
    { root: 'C', notes: ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'] },
    { root: 'G', notes: ['G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C'] },
    { root: 'D', notes: ['D', 'A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G'] },
    { root: 'A', notes: ['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'] },
    { root: 'E', notes: ['E', 'B', 'F#', 'C#', 'G#', 'D#', 'Bb', 'F', 'C', 'G', 'D', 'A'] },
    { root: 'B', notes: ['B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F', 'C', 'G', 'D', 'A', 'E'] },
    { root: 'Gb', notes: ['Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B'] },
    { root: 'Db', notes: ['Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'Gb'] },
    { root: 'Ab', notes: ['Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db'] },
    { root: 'Eb', notes: ['Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab'] },
    { root: 'Bb', notes: ['Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb'] },
    { root: 'F', notes: ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb'] }
];
let majorIntervals = ['1', '5', '2', '6', '3', '7', null, null, null, null, null, '4'];
let majorColors = ['#F7E721', '#AA59BE', '#6BBE52', '#EF4142', '#00CBEF', '#FFAE21', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#0086CE'];

let minorKeys = [
    { root: 'C', notes: ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'] },
    { root: 'G', notes: ['G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C'] },
    { root: 'D', notes: ['D', 'A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G'] },
    { root: 'A', notes: ['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'] },
    { root: 'E', notes: ['E', 'B', 'F#', 'C#', 'G#', 'D#', 'Bb', 'F', 'C', 'G', 'D', 'A'] },
    { root: 'B', notes: ['B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F', 'C', 'G', 'D', 'A', 'E'] },
    { root: 'F#', notes: ['Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B'] },
    { root: 'C#', notes: ['Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'Gb'] },
    { root: 'G#', notes: ['Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db'] },
    { root: 'D#', notes: ['Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab'] },
    { root: 'A#', notes: ['Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb'] },
    { root: 'F', notes: ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb'] }
];
let minorIntervals = ['1', '5', '2', null, null, null, null, null, 'b6', 'b3', 'b7', '4'];
let minorColors = ['#F7E721', '#AA59BE', '#EF4142', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#00CBEF', '#FFAE21', '#6BBE52', '#0086CE'];

let maj = majCircleOfFifths(
    document.getElementById("majorCircleOfKeys"),
    minorKeys,
    minorIntervals,
    minorColors
);

/*
let maj = majCircleOfFifths(
    document.getElementById("majorCircleOfKeys"),
    majorKeys,
    majorIntervals,
    majorColors
);*/
maj.draw();

document.getElementById("rotate").addEventListener("click", 
() => {
    maj.rotateL();
    maj.draw();
});

/*drawMinCircleOfFifths(
    document.getElementById("minorCircleOfFifths")
);*/
