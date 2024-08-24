const $ = el => document.querySelector(el);
const $$ = els => document.querySelectorAll(els);

const imageInput = $('#image-input');
const itemsSection = $('#items');

imageInput.addEventListener('change', async event => {
    const [file] = event.target.files;

    if (file) {
        const reader = new FileReader();

        reader.onload = (eventReader) => {
            const img = new Image();
            img.draggable = true;
            img.src = eventReader.target.result;
            img.className = 'item-image';

          /*   img.addEventListener('dragstart', handleDragStart);
            img.addEventListener('dragend', handleDragEnd); */

            itemsSection.appendChild(img);
        }

        reader.readAsDataURL(file);
    }
});

let draggedItem = null;
let srcContainer = null;

function handleDragStart(event) {
    console.log('drag start', event.target);
    
    draggedItem = event.target;
    srcContainer = draggedItem.partentNode;
}

function handleDragEnd(event) {
    console.log('drag end', event.target);
    
    draggedItem = null;
    srcContainer = null;
}
