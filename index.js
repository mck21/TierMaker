const $ = el => document.querySelector(el);
const $$ = els => document.querySelectorAll(els);

const imageInput = $('#image-input');
const itemsSection = $('#items');
const resetButton = $('#reset-tierlist-btn');


function createItem(src) {
    const img = new Image();
    img.draggable = true;
    img.src = src;
    img.className = 'item-image';

    img.addEventListener('dragstart', handleDragStart);
    img.addEventListener('dragend', handleDragEnd);

    itemsSection.appendChild(img);

    return img;
}

function dragFilesToItemsSection(files) {
    if (files && files.length > 0) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();

            reader.onload = (eventReader) => {
                createItem(eventReader.target.result);
            }

            reader.readAsDataURL(file);
        });
    }
}

imageInput.addEventListener('change', async event => {
    const { files } = event.target;

    dragFilesToItemsSection(files)
});

let draggedItem = null;
let srcContainer = null;

const rows = $$('.row');


rows.forEach(row => {
    row.addEventListener('dragover', handleDragOver);
    row.addEventListener('drop', handleDrop);
    row.addEventListener('dragleave', handleDragLeave);
});

itemsSection.addEventListener('dragover', handleDragOver);
itemsSection.addEventListener('drop', handleDrop);
itemsSection.addEventListener('dragleave', handleDragLeave);

function handleDrop(event) {
    event.preventDefault();

    const { currentTarget, dataTransfer } = event;

    if (srcContainer && draggedItem) {
        srcContainer.removeChild(draggedItem);
    }

    if (draggedItem) {
        const src = dataTransfer.getData('text/plain');
        const img = createItem(src);
        currentTarget.appendChild(img);
    }

    currentTarget.classList.remove('drag-over');
    currentTarget.querySelector('.drag-preview')?.remove();
}

function handleDragOver(event) {
    event.preventDefault();

    const { currentTarget } = event;

    if (srcContainer === currentTarget) {
        return;
    }

    currentTarget.classList.add('drag-over');

    const dragPreview = $('.drag-preview');

    if (draggedItem && !dragPreview) {
        const previewItem = draggedItem.cloneNode(true);
        previewItem.classList.add('drag-preview');
        currentTarget.appendChild(previewItem);
    }
}

function handleDragLeave(event) {
    event.preventDefault();

    const { currentTarget } = event;

    currentTarget.classList.remove('drag-over');

    currentTarget.querySelector('.drag-preview')?.remove();
}

function handleDragStart(event) {
    draggedItem = event.target;
    srcContainer = draggedItem.parentNode;
    event.dataTransfer.setData('text/plain', draggedItem.src);
}

function handleDragEnd(event) {
    draggedItem = null;
    srcContainer = null;
}

resetButton.addEventListener('click', () => {
    const items = $$('#tierlist .item-image');
    items.forEach(item => {
        item.remove()
        itemsSection.appendChild(item)
    });
});
