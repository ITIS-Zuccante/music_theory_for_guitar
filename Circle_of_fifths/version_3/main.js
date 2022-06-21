import { Key } from "./key.js";

const major_formula = [true,false,true,false,true,true,false,true,false,true,false,true];
const natural_minor_formula = [true,false,true,true,false,true,false,true,true,false,true,false];
const harmonic_minor_formula = [true,false,true,true,false,true,false,true,true,false,false,true];
const harmonic_major_formula = [true,false,true,false,true,true,false,true,true,false,false,true];
const melodic_minor_formula = [true,false,true,true,false,true,false,true,false,true,false,true];
let major_circle_of_fifths = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
let harmonic_major_circle_of_fifths = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'F', 'Ab', 'Eb', 'Bb', 'F'];
let harmonic_minor_circle_of_fifths = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
let melodic_minor_circle_of_fifths = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
let natural_minor_circle_of_fifths = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];

let major_colors = [
    "rgb(107, 190, 82)",
    "rgb(255, 255, 255)",
    "rgb(0, 203, 239)",
    "rgb(255, 255, 255)",
    "rgb(247, 231, 33)",
    "rgb(170, 89, 190)", 
    "rgb(255, 255, 255)",
    "rgb(239, 65, 66)", 
    "rgb(255, 255, 255)", 
    "rgb(255, 174, 33)"];

let circles = [
    { key_list: major_circle_of_fifths, formula: major_formula, name: 'MAJOR' },
    { key_list: harmonic_major_circle_of_fifths, formula: harmonic_major_formula, name: 'HARMONIC MAJOR' },
    { key_list: harmonic_minor_circle_of_fifths, formula: harmonic_minor_formula, name: 'HARMONIC MINOR' },
    { key_list: melodic_minor_circle_of_fifths, formula: melodic_minor_formula, name: 'MELODIC MINOR' },
    { key_list: natural_minor_circle_of_fifths, formula: natural_minor_formula, name: 'NATURAL MINOR' }
 ];

const allKeysText = document.querySelectorAll('g[class$="-key"] text');
for (let i = 0; i < allKeysText.length && i < major_circle_of_fifths.length; i++) {
    allKeysText[i].innerHTML = major_circle_of_fifths[i];
}
const allDegreesText = document.querySelectorAll('g[class$="-degree"] text');
const allKeys = document.querySelectorAll('g[class$="-key"]');
const allDegrees = document.querySelectorAll('g[class$="-degree"]');
const allNotes = document.querySelectorAll('g[class$="-note"]');
const svg = document.querySelector('svg');

let currentKey = Key(circles[0].key_list[3], circles[0].formula, major_colors);

function fillDegreeCircle(root){
    const offset = major_circle_of_fifths.indexOf(root);
    for (let i = 0; i < allDegreesText.length && i < major_circle_of_fifths.length; i++) {
        let p = (offset + i) % major_circle_of_fifths.length;
        allDegreesText[i].innerHTML = major_circle_of_fifths[p];
    }
}
fillDegreeCircle(currentKey.root);
let lastClickedElement = null;

function fillNoteCircle(degree) {
    let chordNotes = currentKey.chord(degree, currentKey.degrees());
    console.log(`chord ${degree} in the key of ${currentKey.root}: ${chordNotes}`);
}

svg.addEventListener('click', (ev) => {
    lastClickedElement = ev.target.parentNode;
    if (ev.target.tagName === 'ellipse') {
        for (let element of allDegrees) {
            if (element == ev.target.parentNode) {
                let d = ev.target.parentNode.children[1].innerHTML;
                fillNoteCircle(d);
            }
        }
        for (let element of allKeys) {
            if (element == ev.target.parentNode) {//element.id == ev.target.parentNode.id
                let k = ev.target.parentNode.children[1].innerHTML;
                /* 
                ev.target is the ellipse
                ev.target.parentNode is the group containint the ellipse
                ev.target.parentNode.children[1] is the text element in the same group as the ellipse
                */
                currentKey = Key(k, circles[0].formula, major_colors);
                element.classList.remove('unselected-key');
                element.classList.add('selected-key');
                fillDegreeCircle(currentKey.root);
            } else {
                element.classList.remove('selected-key');
                element.classList.add('unselected-key');
            }
        }
    }
});
