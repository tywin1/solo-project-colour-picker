# solo-project-colour-picker

Had fun with this one.  

- figuring out the correct CSS to fine-tune the layout with grids was somewhat difficult

- was absolutely lost at first trying to comprehend in what order to start writing the javascript.

- loop functions for data were familiar but there was some new stuff - like option.textContent = mode and the .replace regex functions - super useful.

- actually writing the get request was easy (not much code) but building the get color scheme button click function was difficult, also the building of the fetch url was difficult but the API docs helped out there.

- setting the colorsWrapper.html to blank was fine, not setting the hexWrapper to blank as well caught me out for a bit though

- added the copy hex to clipboard stretch goal (had done a copy function on a way earlier password generator solo project) but had an idea to display the hex value as the button background colour - turned out nice I reckon

- using the hex as a button background caused issues with the font color - so a getContrastColor helper is in the js - this takes the hex, does some maths on the red/green/blue values and converts it from hexadecimal to decimal, and an if/else makes the font color black or white depending on the number returned

- the copy button is disabled after copying, until a different colour is copied.  little improvement to prevent spamming the button repeatedly
