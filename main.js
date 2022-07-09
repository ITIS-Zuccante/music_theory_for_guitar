import { Key } from "./key.js";
import mustache from "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js"

let template = await fetch('image.svg')
    .then(response => response.text())
    .then(response => {
        mustache.parse(response);
        let output = mustache.render(response, {});
        document.querySelector('div.container').innerHTML = output;
    }).catch(error => console.log('Unable to get template data: ', error.message));

const major_formula = [true,false,true,false,true,true,false,true,false,true,false,true];
const natural_minor_formula = [true,false,true,true,false,true,false,true,true,false,true,false];
const harmonic_minor_formula = [true,false,true,true,false,true,false,true,true,false,false,true];
const harmonic_major_formula = [
    true,// 1
    false,
    true, //2
    false,
    true, //3
    true, //4
    false,
    true, //5
    true, //b6
    false,
    false,
    true // 7
];
const melodic_minor_formula = [true,false,true,true,false,true,false,true,false,true,false,true];
let major_circle_of_fifths = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
let harmonic_major_circle_of_fifths = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'F', 'Ab', 'Eb', 'Bb', 'F'];
let harmonic_minor_circle_of_fifths = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
let melodic_minor_circle_of_fifths = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
let natural_minor_circle_of_fifths = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];

const circles = [
    { key_list: major_circle_of_fifths, formula: major_formula},
    { key_list: harmonic_major_circle_of_fifths, formula: harmonic_major_formula},
    { key_list: harmonic_minor_circle_of_fifths, formula: harmonic_minor_formula},
    { key_list: melodic_minor_circle_of_fifths, formula: melodic_minor_formula},
    { key_list: natural_minor_circle_of_fifths, formula: natural_minor_formula}
 ];

const allKeys = [...document.querySelectorAll('g[class="key"]')].map(el => {
    return {
        key: null,
        ellipse: el.children[0],
        text: el.children[1],
        index: 0
    };
});

const allModes = [...document.querySelectorAll('g[class="degree"]')].map(el => {
    return {
        ellipse: el.children[0],
        text: el.children[1],
        index: 0
    };
});

const allNotes = [...document.querySelectorAll('g[class="note"]')].map(el => {
    return {
        ellipse: el.children[0],
        text: el.children[1],
        index: 0
    };
});

const allNoteLinks = [...document.querySelectorAll('g[class="note-link"]')].map(el => {
    return {
        path: el.children[0],
        text: el.children[1],
        index: 0
    };
});

/*
stroke-width: 2;
fill: rgb(247 231 33);
*/

let currentModeIndex = null
let currentKeyIndex = null;
let currentCircleIndex = null;

(function init(){
    setCurrentCircleIndex();
    computeKeys();
    currentKeyIndex = 0;
    currentModeIndex = 0;
    paintComponents();
})();

function paintComponents() {
    writeTitle();
    writeKeys(allKeys, circles[currentCircleIndex].key_list);
    writeModes(allModes, allKeys[currentKeyIndex].key);
    writeNotes(allNotes, allNoteLinks, allKeys[currentKeyIndex].key, currentModeIndex);
    logCurrentIndices();
}

function computeKeys() {
    let min = Math.min(circles[currentCircleIndex].key_list.length, allKeys.length, allModes.length, allNotes.length);
    for (let i = 0; i < min; i++) {
        allModes[i].index = i;
        allKeys[i].key = Key(circles[currentCircleIndex].key_list[i], circles[currentCircleIndex].formula);
        console.log(allKeys[i].key.root);
        allKeys[i].index = i;
        allNotes[i].index = i;
        if (i < allNoteLinks.length) {
            allNoteLinks[i].index = i;
        }
    }
}

function logCurrentIndices() {
    console.log(`currentCircleIndex ${currentCircleIndex}`);
    console.log(`currentKeyIndex ${currentKeyIndex}`);
    console.log(`currentModeIndex ${currentModeIndex}`);
    console.log(allKeys[currentKeyIndex].key.matrix[currentModeIndex]);
}


function setCurrentCircleIndex() {
    let select = document.getElementById('select-circles');
    let value = select.options[select.selectedIndex].value;
    currentCircleIndex = parseInt(value);
}

function writeTitle() {
    let title = document.getElementById("title");
    let currentKeyName = document.getElementById("current-key");
    let currentModeName = document.getElementById("current-mode");
    currentModeName.innerHTML = "Mode " + allKeys[currentKeyIndex].key.matrix[currentModeIndex][0].note;
    switch (currentCircleIndex){
        case 0: title.innerHTML = "Circle of fifths: major keys";
            currentKeyName.innerHTML = allKeys[currentKeyIndex].key.root + " major";
            break;
        case 1: title.innerHTML = "Circle of fifths: harmonic major keys";
            currentKeyName.innerHTML = allKeys[currentKeyIndex].key.root + " harmonic major";
            break; 
        case 2: title.innerHTML = "Circle of fifths: harmonic minor keys";
            currentKeyName.innerHTML = allKeys[currentKeyIndex].key.root + " harmonic minor";
            break; 
        case 3: title.innerHTML = "Circle of fifths: melodic minor keys";
            currentKeyName.innerHTML = allKeys[currentKeyIndex].key.root + " melodic minor";
            break; 
        case 4: title.innerHTML = "Circle of fifths: natural minor keys";
            currentKeyName.innerHTML = allKeys[currentKeyIndex].key.root + " natural minor";
    }
}

function writeKeys(keyList, circle) {
    for (let i = 0; i < Math.min(circle.length, keyList.length); i++) {
        keyList[i].text.innerHTML = keyList[i].key.root;
    }
}

function writeModes(degreeList, key){
    // matrix[0] is the list of all the notes of the key and is never null
    for (let i = 0; i < Math.min(degreeList.length, key.matrix[0].length); i++) {
        if (key.matrix[0][i] != null && key.matrix[0][i].note != null) {
            degreeList[i].text.innerHTML = key.matrix[0][i].note;
        } else {
            degreeList[i].text.innerHTML = "";
        }
    }
}

function writeNotes(noteList, noteLinkList, key, mode) {
    for (let i = 0; i < Math.min(noteList.length, key.matrix[mode].length); i++) {
        if (key.matrix[mode][i] != null && key.matrix[mode][i].note != null) {
            noteList[i].text.innerHTML = key.matrix[mode][i].note;
            noteList[i].ellipse.style.fill = key.matrix[mode][i].color;
        } else {
            noteList[i].text.innerHTML = "";
            noteList[i].ellipse.style.fill = "rgb(255, 255, 255)";
        }
    }
    for (let i = 0; i < noteLinkList.length && i + 1 < key.matrix[mode].length; i++) {
        if (key.matrix[mode][i + 1] != null && key.matrix[mode][i+1].interval != null) {
            noteLinkList[i].text.innerHTML = key.matrix[mode][i+1].interval;
            noteLinkList[i].path.style.visibility = 'visible';
            noteLinkList[i].text.style.visibility = 'visible';
        } else {
            noteLinkList[i].path.style.visibility = 'hidden';
            noteLinkList[i].text.style.visibility = 'hidden';
        }
    }
    (async() => {
        template = await fetch('mode_template.svg')
        .then(response => response.text())
        .then(response => {
            mustache.parse(response);
            let output = mustache.render(response, {});
            for (let i = 1; i <= 7; i++) {
                document.querySelector(`div.container_mode_${i}`).innerHTML = output;
            }
        }).catch(error => console.log('Unable to get template data: ', error.message));
    })();
}

allKeys.forEach((el) => {
    el.text.addEventListener('click',
        (event) => {
            allKeys[currentKeyIndex].ellipse.parentElement.classList.remove('selected-key');
            currentKeyIndex = el.index;
            event.target.parentElement.classList.add("selected-key");
            paintComponents();
        }
    );
});

allModes.forEach((el) => { 
    el.text.addEventListener('click',
        (event) => {
            allModes[currentModeIndex].ellipse.parentElement.classList.remove('selected-mode');
            currentModeIndex = el.index;
            event.target.parentElement.classList.add("selected-mode");
            paintComponents();
        }
    );
});


document.getElementById('select-circles').addEventListener('change', 
    (event) => {
        setCurrentCircleIndex();
        computeKeys();
        paintComponents();
    }
);