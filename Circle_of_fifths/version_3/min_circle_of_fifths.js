export { drawMinCircleOfFifths };

/********       CIRCLE OF FIFTHS FOR MINOR KEYS     ***********/

function drawMinCircleOfFifths(svg) {
    let bbox = { width: 700, height: 700 };

    let circle_of_fifths = {
        cx: bbox.width / 3,
        cy: bbox.height / 3,
        radius: bbox.width * (7 / 27),
        intervals: [],
        notes: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'],
        little_circle_radius: 30
    };


    for (let i = 0; i < 12; i++) {
        let z = -Math.PI / 2 + (i * Math.PI / 6);
        circle_of_fifths.intervals.push({
            index: i,
            angle: z,
            diff: i * Math.PI / 6,
            cx: circle_of_fifths.cx + circle_of_fifths.radius * Math.cos(z), // center point
            cy: circle_of_fifths.cy + circle_of_fifths.radius * Math.sin(z),
            ax: circle_of_fifths.cx + (circle_of_fifths.radius - circle_of_fifths.little_circle_radius) * Math.cos(z), // connection point
            ay: circle_of_fifths.cy + (circle_of_fifths.radius - circle_of_fifths.little_circle_radius) * Math.sin(z),
            val: null
        });
    }

    circle_of_fifths.intervals[1].val = "5";
    circle_of_fifths.intervals[2].val = "2";
    circle_of_fifths.intervals[8].val = "b6";
    circle_of_fifths.intervals[9].val = "b3";
    circle_of_fifths.intervals[10].val = "b7";
    circle_of_fifths.intervals[11].val = "4";

    let svgNamespace = 'http://www.w3.org/2000/svg';
    for (const pos of circle_of_fifths.intervals) {
        let circle = document.createElementNS(svgNamespace, 'circle');
        circle.setAttribute("cx", pos.cx);
        circle.setAttribute("cy", pos.cy);
        circle.setAttribute("r", circle_of_fifths.little_circle_radius);
        circle.setAttribute("stroke", "black");
        circle.setAttribute("stroke-width", "2");
        circle.setAttribute("fill", "red");
        svg.appendChild(circle);
    }
    for (let i = 0; i < circle_of_fifths.notes.length; i++) {
        let text = document.createElementNS(svgNamespace, 'text');
        text.setAttribute("x", circle_of_fifths.intervals[i].cx);
        text.setAttribute("y", circle_of_fifths.intervals[i].cy);
        text.innerHTML = circle_of_fifths.notes[i];
        svg.appendChild(text);
    }
    let circle_of_labels = {
        cx: circle_of_fifths.cx,
        cy: circle_of_fifths.cy - (11 / 32) * circle_of_fifths.radius,
        radius: circle_of_fifths.radius * (5 / 16),
        intervals: circle_of_fifths.intervals
    };
    for (const pos of circle_of_fifths.intervals) {
        if (pos.val != null) {
            let cp_distance = (5 / 2) * circle_of_fifths.little_circle_radius;// * diff;
            let start = `${circle_of_fifths.intervals[0].ax},${circle_of_fifths.intervals[0].ay}`;
            let c1x = circle_of_fifths.cx + (circle_of_fifths.radius - cp_distance) * Math.cos(circle_of_fifths.intervals[0].angle);
            let c1y = circle_of_fifths.cy + (circle_of_fifths.radius - cp_distance) * Math.sin(circle_of_fifths.intervals[0].angle);
            let c2x = circle_of_fifths.cx + (circle_of_fifths.radius - cp_distance) * Math.cos(pos.angle);
            let c2y = circle_of_fifths.cy + (circle_of_fifths.radius - cp_distance) * Math.sin(pos.angle);
            let end = `${pos.ax},${pos.ay}`;
            let path = document.createElementNS(svgNamespace, 'path');
            path.setAttribute("d", `M${start} C${c1x},${c1y} ${c2x},${c2y} ${end}`);
            path.setAttribute("stroke", "#000000");
            path.setAttribute("fill", "transparent");
            path.setAttribute("stroke-width", "1px");
            svg.appendChild(path);
            let text = document.createElementNS(svgNamespace, 'text');
            text.setAttribute("x", circle_of_labels.cx + circle_of_labels.radius * Math.cos(pos.angle));
            text.setAttribute("y", circle_of_labels.cy + circle_of_labels.radius * Math.sin(pos.angle));
            text.innerHTML = pos.val;
            svg.appendChild(text);
        }
    }
    
}