import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app.js";
import KeyboardBehaviors from "./keyboard_behaviors.js"

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.msg === "close_appfinder_extension") {
            window.close();
        }
    }
);

$(document).ready(function () {
    const launchAndClose = function (createProperties) {
        chrome.tabs.create(createProperties);
        window.close();
    };

    const keyboardBehaviors = new KeyboardBehaviors(launchAndClose, $);
    keyboardBehaviors.bindBehaviors($(document));
});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);