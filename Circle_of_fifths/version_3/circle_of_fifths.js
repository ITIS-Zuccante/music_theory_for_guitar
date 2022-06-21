export { circleOfFifths };

/********       CIRCLE OF FIFTHS FOR MAJOR KEYS     ***********/

function circleOfFifths(svgElement, keys, intervals, colors) {
    let N_notes = 12;
    let N_chords = 7;
    let N_degrees = 7;
    let bbox = { width: 700, height: 700 };
    let current_key = 0;
    let current_chord = 0;
    let svgNamespace = 'http://www.w3.org/2000/svg';

    let circle_of_keys = {
        cx: bbox.width * (3 / 4),
        cy: bbox.height * (1 / 2),
        radius: bbox.width * (10 / 27),
        elements: []
    };

    for (let i = 0; i < N_notes; i++) {
        let element = {};
        element.angle = -Math.PI / 2 + (i * Math.PI / 6);
        element.cx = circle_of_keys.cx + circle_of_keys.radius * Math.cos(element.angle); // center point
        element.cy = circle_of_keys.cy + circle_of_keys.radius * Math.sin(element.angle);
        element.radius = 30;
        element.circle = document.createElementNS(svgNamespace, 'circle');
        circle.setAttribute("stroke-width", 2);
        circle.setAttribute("fill", '#FFFFFF');
        circle.setAttribute("cx", element.cx);
        circle.setAttribute("cy", element.cy);
        circle.setAttribute("r", element.radius);
        svgElement.appendChild(circle);
        circle.setAttribute("class", "unselected-key");
        element.text = document.createElementNS(svgNamespace, 'text');
        text.setAttribute("x", element.cx);
        text.setAttribute("y", element.cy);
        svgElement.appendChild(text);
        circle_of_notes.elements.push(element);
    }

    let circle_of_chords = {
        cx: bbox.width * (3 / 4),
        cy: bbox.height * (1 / 2),
        radius: bbox.width * (7 / 27),
        elements: []
    };

    for (let i = 0; i < N_chords; i++) {
        let element = {};
        element.angle = -Math.PI / 2 + (i * Math.PI / 6);
        element.cx = circle_of_chords.cx + circle_of_chords.radius * Math.cos(element.angle); // center point
        element.cy = circle_of_chords.cy + circle_of_chords.radius * Math.sin(element.angle);
        element.radius = 30;
        element.ax = circle_of_chords.cx + (circle_of_chords.radius - element.radius) * Math.cos(element.angle); // connection point
        element.ay = circle_of_chords.cy + (circle_of_chords.radius - element.radius) * Math.sin(element.angle);
        element.circle = document.createElementNS(svgNamespace, 'circle');
        circle.setAttribute("stroke-width", 2);
        circle.setAttribute("fill", '#FFFFFF');
        circle.setAttribute("cx", element.cx);
        circle.setAttribute("cy", element.cy);
        circle.setAttribute("r", element.radius);
        svgElement.appendChild(circle);
        circle.setAttribute("class", "unselected-chord");
        element.text = document.createElementNS(svgNamespace, 'text');
        text.setAttribute("x", element.cx);
        text.setAttribute("y", element.cy);
        svgElement.appendChild(text);
        circle_of_chords.elements.push(element);
    }

    let circle_of_notes = {
        cx: circle_of_chords.cx * (3 / 4),
        cy: bbox.height * (3 / 2),
        radius: circle_of_chords.radius * (5 / 16),
        elements: []
    };

    let circle_of_labels = {
        cx: circle_of_chords.cx,
        cy: circle_of_chords.cy - (11 / 32) * circle_of_chords.radius,
        radius: circle_of_chords.radius * (5 / 16)
    };


    for (let i = 0; i < N_notes; i++) {
        let element = {};
        element.angle = -Math.PI / 2 + (i * Math.PI / 6);
        element.index = i;
        element.diff = i * Math.PI / 6;
        element.cx = circle_of_notes.cx + circle_of_notes.radius * Math.cos(element.angle); // center point
        element.cy = circle_of_notes.cy + circle_of_notes.radius * Math.sin(element.angle);
        element.radius = 30;
        element.ax = circle_of_notes.cx + (circle_of_notes.radius - element.radius) * Math.cos(element.angle); // connection point
        element.ay = circle_of_notes.cy + (circle_of_notes.radius - element.radius) * Math.sin(element.angle);
        element.color = colors[i];
        element.interval = intervals[i];
        element.text = 'p';
        element.class = "note";
        circle_of_notes.elements.push(element);
    }

    let rotateL = () => {
        current_key = (current_key + 1) % N_notes;
    };

    let draw = () => {
        for (const pos of circle_of_keys.elements) {
            
        }
        let i = 0;
        for (const pos of circle_of_chords.elements) {
            if (pos.interval != null) {
                let circle = document.createElementNS(svgNamespace, 'circle');
                circle.setAttribute("fill", pos.color);
                circle.setAttribute("class", pos.class);
                circle.setAttribute("cx", pos.cx);
                circle.setAttribute("cy", pos.cy);
                circle.setAttribute("r", pos.radius);
                svgElement.appendChild(circle);
                let text = document.createElementNS(svgNamespace, 'text');
                text.setAttribute("x", pos.cx);
                text.setAttribute("y", pos.cy);
                text.innerHTML = pos.text;
                svgElement.appendChild(text);
                if (pos.interval != '1') {
                    let cp_distance = (5 / 2) * pos.radius;// * diff;
                    let start = `${circle_of_chords.elements[0].ax},${circle_of_chords.elements[0].ay}`;
                    let c1x = circle_of_chords.cx + (circle_of_chords.radius - cp_distance) * Math.cos(circle_of_chords.elements[0].angle);
                    let c1y = circle_of_chords.cy + (circle_of_chords.radius - cp_distance) * Math.sin(circle_of_chords.elements[0].angle);
                    let c2x = circle_of_chords.cx + (circle_of_chords.radius - cp_distance) * Math.cos(pos.angle);
                    let c2y = circle_of_chords.cy + (circle_of_chords.radius - cp_distance) * Math.sin(pos.angle);
                    let end = `${pos.ax},${pos.ay}`;
                    let path = document.createElementNS(svgNamespace, 'path');
                    path.setAttribute("d", `M${start} C${c1x},${c1y} ${c2x},${c2y} ${end}`);
                    path.setAttribute("stroke", "#000000");
                    path.setAttribute("fill", "transparent");
                    path.setAttribute("stroke-width", "1px");
                    svgElement.appendChild(path);
                    text = document.createElementNS(svgNamespace, 'text');
                    text.setAttribute("x", circle_of_labels.cx + circle_of_labels.radius * Math.cos(pos.angle));
                    text.setAttribute("y", circle_of_labels.cy + circle_of_labels.radius * Math.sin(pos.angle));
                    text.innerHTML = pos.interval;
                    svgElement.appendChild(text);
                }
            }
            i++;
        }
    };
    return {
        draw : draw,
        rotateL: rotateL
    };
}

const sk = document.querySelectorAll(".selected-key");
const uk = document.querySelectorAll(".unselected-key");
const elements = sk.concat(uk);

elements.forEach(element => {
    element.addEventListener('click', (ev) => {
        sk.forEach((x) => {
            x.classList.remove(".selected-key");
            x.classList.add(".unselected-key");
        });
        ev = ev || window.event;
        let target = ev.target || ev.srcElement;
        if (target == element){
            element.classList.remove(".unselected-key");
            element.classList.add(".selected-key");
        }
    }, false);    
});