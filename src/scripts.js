// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
const dayjs = require('dayjs')


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//GLOBAL VARIABLES:
const currentYear = dayjs().format('YYYY');

console.log('This is the JavaScript entry file - your code begins here.');
