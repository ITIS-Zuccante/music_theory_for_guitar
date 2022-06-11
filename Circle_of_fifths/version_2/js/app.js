const naturalNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const modesList = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'];
const chordTypes = [
            { id: 'I', type: 'maj7', mode: 'Ionian' },
            { id: 'II', type: 'm7', mode: 'Dorian' },
            { id: 'III', type: 'm7', mode: 'Phrygian' },
            { id: 'IV', type: 'maj7', mode: 'Lydian' },
            { id: 'V', type: '7', mode: 'Mixolydian' },
            { id: 'VI', type: 'm7', mode: 'Eolian' },
            { id: 'VII', type: 'm7(b5)', mode: 'Locrian' }];
const orderSharps = ['F', 'C', 'G', 'D', 'A', 'E'];
const orderFlats = ['B', 'E', 'A', 'D', 'G', 'C'];
const allKeys = {
            Gb: -6,
            Db: -5,
            Ab: -4,
            Eb: -3,
            Bb: -2,
            F: -1,
            C: 0,
            G: 1,
            D: 2,
            A: 3,
            E: 4,
            B: 5
        };

class Key {
    constructor(name) {
        this.name = name;
    }

    get sharpsOrFlats() {
        //combierte el valor a entero positivo.
        if (allKeys[this.name] < 0){
            return  Math.abs(allKeys[this.name]) + '♭';
        }
        if (allKeys[this.name] === 0) {
            return 'no flats or sharps.';
        }
        return allKeys[this.name] + '♯';
    }

    get accidentals() {
        let listAccidentals;
        if (allKeys[this.name] < 0) {
            // Crea un array con las alteraciones
            let accidentals = orderFlats.slice(0, Math.abs(allKeys[this.name]));
            // Combina el nombre de la alteración con el símbolo
            listAccidentals = accidentals.map(accidental => {
                return accidental + '♭';
            });
        } else {
            let accidentals = orderSharps.slice(0, allKeys[this.name]);
            listAccidentals = accidentals.map(accidental => {
                return accidental + '#';
            });
        };
        return listAccidentals;
    }

    get pitches() {
        //identifica el indice de la tónica en array de notas naturales [0] pasa el primer caracter. 
        let keyIndex = naturalNotes.indexOf(this.name[0]);
        //nuevo array con orden de notas naturales para esta tónica.
        let pitchCollection = naturalNotes.slice(keyIndex).concat(naturalNotes.slice(0, keyIndex));
        // define un array con los accidentes de la tonalidad llamando la propiedad.
        let accidentals = this.accidentals;

        // crea nueva familia con notas y sus alteraciones respectivas
        return pitchCollection.map(pitch => {
            for (const element of accidentals) {
                if (pitch === element[0]) {
                    return element;
                }
            }
            return pitch;
        });
    }

    get chords() {
        let obj = {};
        let pitchesTemp = this.pitches;
        let builder = pitchesTemp.map((pitch, index) => {
            obj[chordTypes[index].id] = pitch.concat(chordTypes[index].type);
        });
        return obj;
    }

    get modes() {
        let builder = [];
        let pitchesTemp = this.pitches;
        for (const element of pitchesTemp) {
            for (const mode of modesList) {
                builder.push(element + ' ' + mode);
                pitchesTemp.shift();
            }
        }
        return builder;
    }
} //class Key

///////////////////////////////////////
//////CIRCLE OUTPUT
///////////////////////////////////////

//Crear los buttons
(() => {
    //crea una variable con todas las tonalidades
    let extractAllKeySigantures = Object.keys(allKeys);
    //reorganiza el arraglo para adapartalo al diseño
    let reOrderKeys = extractAllKeySigantures.slice(9).concat(extractAllKeySigantures.slice(0, 9));
    //una variable ul que coniente el UL
    let ul = document.createElement('ul');
    ul.setAttribute('class', 'circle-container z-depth-4');

    reOrderKeys.forEach(k => {
        //crea los botones por cada tonica    
        let button = document.createElement('button');
        button.setAttribute('class', 'z-depth-1 waves-effect waves-light blue-grey-text text-darken-4');
        button.setAttribute('value', k);
        button.innerText = k;
        //imprime en ul el contenido de li
        //crea una lista por cada elemento del arreglo  
        let li = document.createElement('li');
        li.appendChild(button);
        ul.appendChild(li);
    });
    document.querySelector('#myList').appendChild(ul);
})();





        ///////////////////////////////////////
        //////INPUT
        ///////////////////////////////////////

        const buttons = document.querySelectorAll('ul.circle-container > li > button');
        let svgPaths = document.querySelectorAll('.staff svg > path');
        let newKey;

        //Set the new Key
        buttons.forEach(
            button => {
                button.onclick = () => {
                    newKey = new Key(button.value);
                    print();
                    staff();
                };
            }
        );

        //Print newKey results
        function print() {
            document.querySelector('#results').classList.add('active');
            document.querySelector('.card-title b').innerHTML = `${newKey.name} Major`;
            document.querySelector('#scale').innerHTML = `${newKey.pitches}`;
            document.querySelector('#modes').innerHTML = `<h4>Modes</h4> ${newKey.modes}`;
            //document.querySelector('#chords').innerHTML = `<h4>Chords</h4> ${newKey.chords};
        }

        //Print Staff
        function staff() {
            document.querySelector('.staff').classList.add('active');
            //reset de clase
            svgPaths.forEach(function (eachPath) {
                eachPath.setAttribute("class", "inactive");
            });
            //si el segundo caracter de la propiedad "accidentals" es "♭"
            if (newKey.accidentals != 0 && newKey.accidentals[0][1] === "♭") {
                for (let i = 0; i < svgPaths.length; i++) {
                    //i+7 para brincarse lo 7 sostenidos del SVG
                    svgPaths[i + 7].setAttribute("class", "active");
                    if (i === newKey.accidentals.length - 1) {
                        break;
                    }
                }
            } else if (newKey.accidentals != 0 && newKey.accidentals[0][1] === "#") {
                for (let i = 0; i < svgPaths.length; i++) {
                    svgPaths[i].setAttribute("class", "active");
                    if (i === newKey.accidentals.length - 1) {
                        break;
                    }
                }
            }
        }

        function init() {

            let list = document.querySelectorAll("ul.circle-container > li");

            for (let i = 0; i < list.length; i++) {

                (function (index) {
                    list[index].onclick = function () {
                        //llama a la funcion y le manda el indice
                        action(index);
                    };
                })(i);
            }

            function action(keySelected) {
                //reset
                list.forEach(function (elm) {
                    elm.className = "inactive";
                });
                //clase 'key' a seleccion
                list[keySelected].className = "key";
                //reoganiza la lista para hacerla un ciclo
                if (keySelected == 0) {
                    list[keySelected + 1].className = "dominant";
                    list[list.length - 1].className = "subdominant";
                } else if (keySelected == list.length - 1) {
                    list[keySelected - 1].className = "subdominant";
                    list[0].className = "dominant";
                } else {
                    list[keySelected - 1].className = "subdominant";
                    list[keySelected + 1].className = "dominant";
                }
            }

        } //init()

window.onload = init;
//# sourceURL=pen.js