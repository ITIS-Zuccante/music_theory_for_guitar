export { minorKeys, minorIntervals, minorColors };

let minorKeys = [
    { root: 'C', notes: ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'] },
    { root: 'G', notes: ['G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C'] },
    { root: 'D', notes: ['D', 'A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G'] },
    { root: 'A', notes: ['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'] },
    { root: 'E', notes: ['E', 'B', 'Gb', 'C#', 'G#', 'D#', 'Bb', 'F', 'C', 'G', 'D', 'A'] },
    { root: 'B', notes: ['B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F', 'C', 'G', 'D', 'A', 'E'] },
    { root: 'F#', notes: ['F#', 'C#', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B'] },
    { root: 'C#', notes: ['C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'Gb'] },
    { root: 'G#', notes: ['G#', 'D#', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db'] },
    { root: 'D#', notes: ['D#', 'A#', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'Ab'] },
    { root: 'A#', notes: ['A#', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#'] },
    { root: 'F', notes: ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb'] }
];
let minorIntervals = ['1', '5', '2', null, null, null, null, null, 'b6', 'b3', 'b7', '4'];
let minorColors = ['#F7E721', '#AA59BE', '#EF4142', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#00CBEF', '#FFAE21', '#6BBE52', '#0086CE'];
