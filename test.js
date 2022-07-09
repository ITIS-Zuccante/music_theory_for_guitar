/* TEST */
import { Key } from "./key.js";

let major_formula = [true, false, true, false, true, true, false, true, false, true, false, true];
let natural_minor_formula = [true, false, true, true, false, true, false, true, true, false, true, false];
let harmonic_minor_formula = [true, false, true, true, false, true, false, true, true, false, false, true];
let harmonic_major_formula = [true, false, true, false, true, true, false, true, true, false, false, true];
let melodic_minor_formula = [true, false, true, true, false, true, false, true, false, true, false, true];
let major_circle_of_fifths = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
let harmonic_major_circle_of_fifths = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'F', 'Ab', 'Eb', 'Bb', 'F'];
let harmonic_minor_circle_of_fifths = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
let melodic_minor_circle_of_fifths = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
let natural_minor_circle_of_fifths = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];

export let circles = [
    { key_list: major_circle_of_fifths, formula: major_formula},
    { key_list: harmonic_major_circle_of_fifths, formula: harmonic_major_formula},
    { key_list: harmonic_minor_circle_of_fifths, formula: harmonic_minor_formula},
    { key_list: melodic_minor_circle_of_fifths, formula: melodic_minor_formula},
    { key_list: natural_minor_circle_of_fifths, formula: natural_minor_formula}
];

circles.forEach((c) => {
    c.key_list.forEach((note) => {
        let k = Key(note, c.formula);
        k.print();
    });
});

(function init() {
    const template = fetch('image.svg').then(response => response.text());
    Promise.all(template).then(result => {
        let output = Mustache.render(result, {p: null});
        document.querySelector('div.container').innerHTML = output;
    }).catch(error => console.log('Unable to get template data: ', error.message));
})();