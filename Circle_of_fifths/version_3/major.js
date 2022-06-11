export { majorKeys, majorIntervals, majorColors };

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
