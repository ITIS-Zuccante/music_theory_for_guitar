export { minorKeys, minorIntervals, minorColors };

let minorKeys = [
    { root: 'C', notes: ['C', 'G', 'D', '', 'E', '', 'Gb', '', 'Ab', 'Eb', 'Bb', 'F'] },
    { root: 'G', notes: ['G', 'D', 'A', '', 'B', '', 'Db', '', 'Eb', 'Bb', 'F', 'C'] },
    { root: 'D', notes: ['D', 'A', 'E', '', 'F#', '', 'Ab', '', 'Bb', 'F', 'C', 'G'] },
    { root: 'A', notes: ['A', 'E', 'B', '', 'C#', '', 'Eb', '', 'F', 'C', 'G', 'D'] },
    { root: 'E', notes: ['E', 'B', 'F#', '', 'G#', '', 'Bb', '', 'C', 'G', 'D', 'A'] },
    { root: 'B', notes: ['B', 'F#', 'C#', '', 'D#', '', 'F', '', 'G', 'D', 'A', 'E'] },
    { root: 'F#', notes: ['F#', 'C#', 'G#', '', 'Bb', '', 'C', '', 'D', 'A', 'E', 'B'] },
    { root: 'C#', notes: ['C#', 'G#', 'D#', '', 'F', '', 'G', '', 'A', 'E', 'B', 'F#'] },
    { root: 'G#', notes: ['G#', 'D#', 'A#', '', 'C', '', 'D', '', 'E', 'B', 'F#', 'C#'] },
    { root: 'D#', notes: ['D#', 'A#', 'F', '', 'G', '', 'A', '', 'B', 'F#', 'C#', 'G#'] },
    { root: 'A#', notes: ['A#', 'F', 'C', '', 'D', '', '', '', 'F#', 'C#', 'G#', 'D#'] },
    { root: 'F',  notes: ['F', 'C', 'G', '', '', '', '', '', 'Db', 'Ab', 'Eb', 'Bb'] }
];
let minorIntervals = ['1', '5', '2', null, null, null, null, null, 'b6', 'b3', 'b7', '4'];
let minorColors = ['#F7E721', '#AA59BE', '#EF4142', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#00CBEF', '#FFAE21', '#6BBE52', '#0086CE'];
