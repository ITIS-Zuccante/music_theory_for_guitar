import mustache from "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js"

const template = await fetch('SVGtemplate.js')
    .then(response => response.text())
    .then(response => {
        mustache.parse(response);
        let output = mustache.render(response, {});
        document.querySelector('div.container').innerHTML = output;
    }).catch(error => console.log('Unable to get template data: ', error.message));

