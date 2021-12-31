import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app.js";
import KeyboardBehaviors from "./keyboard_behaviors.js"

$(document).ready(function () {
    const keyboardBehaviors = new KeyboardBehaviors($);
    keyboardBehaviors.bindBehaviors($(document));
});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);