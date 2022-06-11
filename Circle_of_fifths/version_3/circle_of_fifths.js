export { circleOfFifths };

/********       CIRCLE OF FIFTHS FOR MAJOR KEYS     ***********/

function circleOfFifths(svgElement, keys, intervals, colors) {
    let bbox = { width: 700, height: 700 };
    let current_key = 0;
    
    let circle_of_keys = {
        cx: bbox.width * (3 / 4),
        cy: bbox.height * (1 / 2),
        in_radius: bbox.width * (10 / 27),
        little_circle_radius: 30,
        elements: []
    };

    let circle_of_notes = {
        cx: bbox.width * (3 / 4),
        cy: bbox.height * (1 / 2),
        in_radius: bbox.width * (7 / 27),
        little_circle_radius: 30,
        elements: []
    };

    let circle_of_labels = {
        cx: circle_of_notes.cx,
        cy: circle_of_notes.cy - (11 / 32) * circle_of_notes.in_radius,
        radius: circle_of_notes.in_radius * (5 / 16),
        intervals: intervals
    };

    for (let i = 0; i < 12; i++) {
        let z = -Math.PI / 2 + (i * Math.PI / 6);
        circle_of_keys.elements[i] = {
            index: i,
            angle: z,
            diff: i * Math.PI / 6,
            cx: circle_of_keys.cx + circle_of_keys.in_radius * Math.cos(z), // center point
            cy: circle_of_keys.cy + circle_of_keys.in_radius * Math.sin(z),
            ax: circle_of_keys.cx + (circle_of_keys.in_radius - circle_of_keys.little_circle_radius) * Math.cos(z), // connection point
            ay: circle_of_keys.cy + (circle_of_keys.in_radius - circle_of_keys.little_circle_radius) * Math.sin(z),
            color: '#FFFFFF',
            note: keys[i].root
        };
    }

    for (let i = 0; i < 12; i++) {
        let z = -Math.PI / 2 + (i * Math.PI / 6);
        circle_of_notes.elements[i] = {
            index: i,
            angle: z,
            diff: i * Math.PI / 6,
            cx: circle_of_notes.cx + circle_of_notes.in_radius * Math.cos(z), // center point
            cy: circle_of_notes.cy + circle_of_notes.in_radius * Math.sin(z),
            ax: circle_of_notes.cx + (circle_of_notes.in_radius - circle_of_notes.little_circle_radius) * Math.cos(z), // connection point
            ay: circle_of_notes.cy + (circle_of_notes.in_radius - circle_of_notes.little_circle_radius) * Math.sin(z),
            interval: intervals[i],
            color: colors[i]
        };
    }

    let svgNamespace = 'http://www.w3.org/2000/svg';

    let rotateL = () => {
        current_key = (current_key + 1)%12;
    };

    let draw = () => {
        let k = 0;
        for (const pos of circle_of_keys.elements) {
            let circle = document.createElementNS(svgNamespace, 'circle');
            circle.setAttribute("cx", pos.cx);
            circle.setAttribute("cy", pos.cy);
            circle.setAttribute("r", circle_of_keys.little_circle_radius);
            circle.setAttribute("stroke", "black");
            circle.setAttribute("stroke-width", "2");
            circle.setAttribute("fill", (k == current_key) ? '#F7E721' : '#FFFFFF');
            svgElement.appendChild(circle);
            let text = document.createElementNS(svgNamespace, 'text');
            text.setAttribute("x", pos.cx);
            text.setAttribute("y", pos.cy);
            text.innerHTML = pos.note;
            svgElement.appendChild(text);
            k++;
        }
        let i = 0;
        for (const pos of circle_of_notes.elements) {
            let circle = document.createElementNS(svgNamespace, 'circle');
            circle.setAttribute("cx", pos.cx);
            circle.setAttribute("cy", pos.cy);
            circle.setAttribute("r", circle_of_notes.little_circle_radius);
            circle.setAttribute("stroke", "black");
            circle.setAttribute("stroke-width", "2");
            circle.setAttribute("fill", pos.color);
            svgElement.appendChild(circle);
            if (pos.interval != null) {
                let text = document.createElementNS(svgNamespace, 'text');
                text.setAttribute("x", pos.cx);
                text.setAttribute("y", pos.cy);
                text.innerHTML = keys[current_key].notes[i];
                svgElement.appendChild(text);
            }
            if (pos.interval != null && pos.interval != '1') {
                let cp_distance = (5 / 2) * circle_of_notes.little_circle_radius;// * diff;
                let start = `${circle_of_notes.elements[0].ax},${circle_of_notes.elements[0].ay}`;
                let c1x = circle_of_notes.cx + (circle_of_notes.in_radius - cp_distance) * Math.cos(circle_of_notes.elements[0].angle);
                let c1y = circle_of_notes.cy + (circle_of_notes.in_radius - cp_distance) * Math.sin(circle_of_notes.elements[0].angle);
                let c2x = circle_of_notes.cx + (circle_of_notes.in_radius - cp_distance) * Math.cos(pos.angle);
                let c2y = circle_of_notes.cy + (circle_of_notes.in_radius - cp_distance) * Math.sin(pos.angle);
                let end = `${pos.ax},${pos.ay}`;
                let path = document.createElementNS(svgNamespace, 'path');
                path.setAttribute("d", `M${start} C${c1x},${c1y} ${c2x},${c2y} ${end}`);
                path.setAttribute("stroke", "#000000");
                path.setAttribute("fill", "transparent");
                path.setAttribute("stroke-width", "1px");
                svgElement.appendChild(path);
                let text = document.createElementNS(svgNamespace, 'text');
                text.setAttribute("x", circle_of_labels.cx + circle_of_labels.radius * Math.cos(pos.angle));
                text.setAttribute("y", circle_of_labels.cy + circle_of_labels.radius * Math.sin(pos.angle));
                text.innerHTML = pos.interval;
                svgElement.appendChild(text);
            }
            i++;
        }

    };
    return {
        draw : draw,
        rotateL: rotateL
    };
}