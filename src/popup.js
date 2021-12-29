import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app.js";
import KeyboardBehaviors from "./keyboard_behaviors.js"

var bg = chrome.extension.getBackgroundPage();

function filterEntitlements() {
    let filter, entitlements, entitlement, a, i, txtValue;
    filter = document.getElementById("appSearch").value.toUpperCase();
    entitlements = document.getElementById("results");
    entitlement = entitlements.getElementsByTagName('tr');

    for (i = 0; i < entitlement.length; i++) {
        a = entitlement[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            entitlement[i].style.display = "";
        } else {
            entitlement[i].style.display = "none";
        }
    }
}
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.msg === "close_appfinder_extension") {
            window.close();
        }
    }
);

$(document).ready(function () {
    $('body').on('click', 'a', function () {
        chrome.tabs.create({ url: $(this).attr('href') });
        return false;
    });

    $('#go-to-options').on('click', function (e) {
        e.preventDefault();

        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
        return false;
    });

    bg.baseURL(function (url) {
        document.getElementById("ws1-url").href = url;
    });

    const launchAndClose = function (createProperties) {
        chrome.tabs.create(createProperties);
        window.close();
    };

    const keyboardBehaviors = new KeyboardBehaviors(launchAndClose, $);
    keyboardBehaviors.bindBehaviors($(document));

    const input = $('#appSearch');

    input.on({ 'keyup': filterEntitlements });

    input.focus();
});

ReactDOM.render(
    <App entitlementLoader={bg.onPopupLoad}/>,
    document.getElementById('app')
);