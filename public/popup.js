var bg = chrome.extension.getBackgroundPage();

function buildSearchEvent(filter) {
    const event = new CustomEvent('searchUpdated', {
        bubbles: true,
        detail: { text: () => filter.val().toLowerCase() }
    });

    document.body.addEventListener('searchUpdated', e => console.log(e.detail.text()));

    filter.on({'keyup': e => e.target.dispatchEvent(event)});
}

$(document).ready(function () {
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

    const input = $('#appSearch');

    buildSearchEvent(input)

    input.focus();
});
