/**
 * JSON-Tree Logic
 * Handles recursive parsing of JSON objects into DOM elements.
 */

// DOM Elements
const inputEl = document.getElementById('json-input');
const treeContainer = document.getElementById('tree-container');
const btnFormat = document.getElementById('btn-format');
const btnVisualize = document.getElementById('btn-visualize');
const statusEl = document.getElementById('status-indicator');
const searchEl = document.getElementById('search-input');

// Initial Data
let currentData = null;

// Event Listeners
btnFormat.addEventListener('click', formatJSON);
btnVisualize.addEventListener('click', renderTree);
searchEl.addEventListener('input', handleSearch);

inputEl.addEventListener('input', () => {
    try {
        JSON.parse(inputEl.value);
        statusEl.innerText = "Valid JSON";
        statusEl.className = "status-indicator valid";
    } catch (e) {
        statusEl.innerText = "Invalid JSON";
        statusEl.className = "status-indicator error";
    }
});

// --- Core Logic ---

function formatJSON() {
    try {
        const raw = inputEl.value;
        if (!raw) return;
        const obj = JSON.parse(raw);
        inputEl.value = JSON.stringify(obj, null, 2);
        statusEl.innerText = "Valid JSON";
        statusEl.className = "status-indicator valid";
    } catch (e) {
        alert("Cannot format: Invalid JSON");
    }
}

function renderTree() {
    try {
        const raw = inputEl.value;
        if (!raw) return;
        currentData = JSON.parse(raw);
        
        treeContainer.innerHTML = '';
        const root = buildNode(currentData, 'root');
        treeContainer.appendChild(root);
        
        // Auto-expand root
        const rootToggler = root.querySelector('.toggler');
        if(rootToggler) rootToggler.click();

    } catch (e) {
        treeContainer.innerHTML = `<div class="placeholder-text" style="color:var(--color-string)">Error: ${e.message}</div>`;
    }
}

/**
 * Recursive function to build DOM nodes
 */
function buildNode(data, keyName = null) {
    const container = document.createElement('div');
    
    // Determine type
    const type = Array.isArray(data) ? 'array' : (data === null ? 'null' : typeof data);
    
    // Create Row Wrapper
    const row = document.createElement('div');
    row.className = 'tree-row';
    
    // Toggler Icon
    const toggler = document.createElement('span');
    toggler.className = 'toggler';
    if (type === 'object' || type === 'array') {
        toggler.innerText = '▶';
        toggler.onclick = (e) => {
            e.stopPropagation();
            toggleNode(container, toggler);
        };
    } else {
        toggler.className = 'toggler hidden';
        toggler.innerText = '▶';
    }
    row.appendChild(toggler);

    // Key (if exists)
    if (keyName !== null && keyName !== 'root') {
        const keySpan = document.createElement('span');
        keySpan.className = 'key';
        keySpan.innerText = `"${keyName}"`;
        row.appendChild(keySpan);
        
        const sep = document.createElement('span');
        sep.className = 'sep';
        sep.innerText = ':';
        row.appendChild(sep);
    }

    // Value
    if (type === 'object' || type === 'array') {
        const size = Array.isArray(data) ? data.length : Object.keys(data).length;
        const bracketOpen = document.createElement('span');
        bracketOpen.className = 'bracket';
        bracketOpen.innerText = type === 'array' ? '[' : '{';
        
        const meta = document.createElement('span');
        meta.style.color = '#888';
        meta.style.fontSize = '0.8rem';
        meta.style.marginLeft = '5px';
        meta.innerText = `${size} items`;
        
        row.appendChild(bracketOpen);
        row.appendChild(meta);

        // Append Row
        container.appendChild(row);

        // Children Container
        const childrenDiv = document.createElement('div');
        childrenDiv.className = 'tree-node'; // Hidden by default
        
        // Recursion
        if (type === 'array') {
            data.forEach((item, index) => {
                childrenDiv.appendChild(buildNode(item, index));
            });
        } else {
            Object.keys(data).forEach(key => {
                childrenDiv.appendChild(buildNode(data[key], key));
            });
        }
        
        // Closing Bracket
        const closeRow = document.createElement('div');
        closeRow.className = 'tree-row';
        closeRow.style.marginLeft = '15px'; // Indent
        closeRow.innerHTML = `<span class="bracket">${type === 'array' ? ']' : '}'}</span>`;
        childrenDiv.appendChild(closeRow);

        container.appendChild(childrenDiv);
    } 
    else {
        // Primitive Value
        const valSpan = document.createElement('span');
        valSpan.className = `val-${type}`;
        
        if (type === 'string') valSpan.innerText = `"${data}"`;
        else valSpan.innerText = String(data);
        
        row.appendChild(valSpan);
        container.appendChild(row);
    }

    return container;
}

function toggleNode(container, toggler) {
    const childNode = container.querySelector('.tree-node');
    if (!childNode) return;
    
    if (childNode.classList.contains('expanded')) {
        childNode.classList.remove('expanded');
        toggler.classList.remove('open');
    } else {
        childNode.classList.add('expanded');
        toggler.classList.add('open');
    }
}

function handleSearch() {
    const term = searchEl.value.toLowerCase();
    const allSpans = treeContainer.querySelectorAll('.key, .val-string, .val-number, .val-bool');
    
    // Clear previous
    allSpans.forEach(span => span.classList.remove('highlight'));
    
    if (!term) return;

    allSpans.forEach(span => {
        if (span.innerText.toLowerCase().includes(term)) {
            span.classList.add('highlight');
            
            // Auto expand parents
            let parent = span.closest('.tree-node');
            while(parent) {
                parent.classList.add('expanded');
                // Find associated toggler in previous sibling row
                const prevRow = parent.previousElementSibling;
                if(prevRow) {
                    const toggler = prevRow.querySelector('.toggler');
                    if(toggler) toggler.classList.add('open');
                }
                parent = parent.parentElement.closest('.tree-node');
            }
        }
    });
}

// Initial Sample
renderTree();