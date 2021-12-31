import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app.js";
import KeyboardBehaviors from "./keyboard_behaviors.js"

var bg = chrome.extension.getBackgroundPage();

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.msg === "close_appfinder_extension") {
            window.close();
        }
    }
);

$(document).ready(function () {
    bg.baseURL(function (url) {
        document.getElementById("ws1-url").href = url;
    });

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