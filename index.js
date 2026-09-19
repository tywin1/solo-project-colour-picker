const getColorScheme = document.getElementById('getColorScheme');
const colorPicker = document.getElementById('colorPicker');
const colorSelect = document.querySelector('.color-select');
const colorsWrapper = document.querySelector('#colorSchemeWrapper');
const hexWrapper = document.querySelector('#hexWrapper');
const colorModeSelect = document.getElementById('colorModeSelect');


const colorModes = [
    'monochrome',
    'monochrome-dark',
    'monochrome-light',
    'analogic',
    'complement',
    'analogic-complement',
    'triad',
    'quad'
];

colorModes.forEach(mode => {
    const option = document.createElement('option');
    option.value = mode;
    option.textContent = mode
        .replace(/-/g, ' ') // / / forward slashes indicate start and end of a regular expression, - matches hyphens, g means global (find all hyphens in the string), replace them with spaces ' '
        .replace(/\b\w/g, letter => letter.toUpperCase()); // \b matches a word boundary, \w matches any word character, g means global (find all matches), replace each match with its uppercase version
    colorSelect.appendChild(option); //append the option element to the color select dropdown
});

const requestColors = {
                        method: "GET",
                        headers: {
                        "content-type": "application/json",
                                }
                    }

getColorScheme.addEventListener('click', () => {
    colorsWrapper.innerHTML = '';
    hexWrapper.innerHTML = '';
    fetch('https://www.thecolorapi.com/scheme?hex=' + colorPicker.value.slice(1) + '&count=5&format=json&mode=' + colorModeSelect.value, requestColors)
        .then(res => res.json())
        .then(data => {
            data.colors.forEach(color => {
                colorsWrapper.innerHTML += `
                    <div class="color-scheme" style="background-color: ${color.hex.value}">
                    </div>`
                hexWrapper.innerHTML += `
                    <div class="hex">
                        ${color.hex.value}
                        <button class="copy-hex" data-hex="${color.hex.value}">
                            Copy
                        </button>
                    </div>`
            });
        });
});

function getContrastColor (hex) {
    const red = parseInt(hex.slice(1, 3), 16);
    const green = parseInt(hex.slice( 3, 5), 16);
    const blue = parseInt(hex.slice(5, 7), 16);
    return (red * 0.299 + green * 0.587 + blue * 0.114) > 186 ? '#000' : '#fff';
}

let activeCopyButton = null;

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('copy-hex') && !e.target.disabled) {
    const button = e.target;
    const hex = button.dataset.hex;

    if (activeCopyButton) {
        activeCopyButton.disabled = false;
        activeCopyButton.textContent = "Copy";
        activeCopyButton.style.backgroundColor = "transparent";
        activeCopyButton.style.color = "#fff";
    }
    activeCopyButton = button;
    button.disabled = true;

    navigator.clipboard.writeText(hex)
        .then(() => {
            button.style.backgroundColor = hex;
            button.style.color = getContrastColor(hex);
            button.textContent = "Copied"

        })
        .catch(() => {
            button.disabled = false;
            activeCopyButton = null;
        });
    }
});
