export function Key(root, formula, colors) {
    const _allNotes = [
        { sharp: 'C', flat: 'C' },
        { sharp: 'C#', flat: 'Db'},
        { sharp: 'D', flat: 'D' },
        { sharp: 'D#', flat: 'Eb' },
        { sharp: 'E', flat: 'Fb' },
        { sharp: 'E#', flat: 'F' },
        { sharp: 'F#', flat: 'Gb' },
        { sharp: 'G', flat: 'G' },
        { sharp: 'G#', flat: 'Ab' },
        { sharp: 'A', flat: 'A' },
        { sharp: 'A#', flat: 'Bb' },
        { sharp: 'B', flat: 'Cb' }
    ];
    const _root = root;
    const _formula = formula;
    const _colors = colors;
    const maj_distances = [0, 2, 4, 5, 7, 9, 11];

    let enharmonicIndexOf = (note, list) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i] != null
                && list[i].hasOwnProperty('sharp')
                && list[i].hasOwnProperty('flat')
                && (note == list[i].sharp || note == list[i].flat)){
                    return i;
                }
            else if (list[i] != null && note == list[i]) {
                return i;
            }
        }
        return null;// not found
    }

    const _selectedNotes = (() => {
        let result = [];
        const p = enharmonicIndexOf(_root, _allNotes);
        if (p == null || p == -1){
            return [];
        }
        let last_note = null;
        for (let i = 0; i < _formula.length; i++) {
            let j = (p + i) % _allNotes.length;
            if (_formula[i]) {
                if (i == 0){
                    result[i] = _root;
                } else if (last_note.charAt(0) != _allNotes[j].sharp.charAt(0)) {
                    result[i] = _allNotes[j].sharp;
                } else if (last_note.charAt(0) != _allNotes[j].flat.charAt(0)) {
                    result[i] = _allNotes[j].flat;
                }
                last_note = result[i];
            } else {
                result[i] = null;
            }
        }
        return result;
    })();
    /*
_matrix == [
    [{ note: ..., interval: ... }, ..., { note: ..., interval: ... }],
    ...,
    [{ note: ..., interval: ... }, ..., { note: ..., interval: ... }]
]
*/
    const _matrix = (() => { 
        let result = [];
        for (let d = 0; d < _selectedNotes.length; d++) {
            if (_selectedNotes[d] != null) {
                result[d] = [];
                let lastInterval = 0;
                for (let n = 0; n < _selectedNotes.length; n++) {
                    const j = (d + n) % _selectedNotes.length;
                    if (_selectedNotes[j] != null) {
                        result[d][n] = {};
                        result[d][n].note = _selectedNotes[j];
                        switch (n - maj_distances[lastInterval]) {
                            case -2: 
                                result[d][n].interval = 'bb' + (lastInterval+1);
                                break;
                            case -1: 
                                result[d][n].interval = 'b' + (lastInterval + 1);
                                break;
                            case 0: 
                                result[d][n].interval = '' + (lastInterval + 1);
                                break;
                            case 1: 
                                result[d][n].interval = '#' + (lastInterval + 1);
                                break;
                            case 2: 
                                result[d][n].interval = '##' + (lastInterval + 1);
                                break;
                        }
                        lastInterval++;
                    } else {
                        result[d][n] = null;
                    }
                } 
            } else {
                result[d] = null;
            }
        }
        return result;
    })();

    

    const _print = () => {
        const major_formula = [true, false, true, false, true, true, false, true, false, true, false, true];
        const natural_minor_formula = [true, false, true, true, false, true, false, true, true, false, true, false];
        const harmonic_minor_formula = [true, false, true, true, false, true, false, true, true, false, false, true];
        const harmonic_major_formula = [true, false, true, false, true, true, false, true, true, false, false, true];
        const melodic_minor_formula = [true, false, true, true, false, true, false, true, false, true, false, true];
        if (formula.toString() == major_formula.toString()){
            console.log(`------- KEY OF ${_root} 'MAJOR' -------`);
        } else if (formula.toString() == natural_minor_formula.toString()) {
            console.log(`------- KEY OF ${_root} 'NATURAL MINOR' -------`);
        } else if (formula.toString() == harmonic_minor_formula.toString()) {
            console.log(`------- KEY OF ${_root} 'HARMONIC MINOR' -------`);
        } else if (formula.toString() == harmonic_major_formula.toString()) {
            console.log(`------- KEY OF ${_root} 'HARMONIC MAJOR' -------`);
        } else if (formula.toString() == melodic_minor_formula.toString()) {
            console.log(`------- KEY OF ${_root} 'MELODIC MINOR' -------`);
        }
        console.log(_matrix);
    };

    return {
        root: _root,
        matrix: _matrix,
        print: _print
    };

}// end of class