import makeBrowserService from "../browser";

var bg = chrome.extension.getBackgroundPage();
const browserService = makeBrowserService();

function save_options(vmwareOneUrl) {
    browserService.setStorage('vmwareOneUrl', vmwareOneUrl).then(() => {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        bg.clear();
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

function originURL(url) {
    return cleanURL(url) + "/*";
}
function cleanURL(url) {
    return url.replace(/\/?\*?$/, "");
}

function restore_options() {
    browserService.getStorage('vmwareOneUrl', 'https://myvmware.workspaceair.com').then((url) => {
        document.getElementById('vmware-one-url').value = url;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    function () {
        var vmwareOneUrl = document.getElementById('vmware-one-url').value;

        chrome.permissions.request({
            origins: [originURL(vmwareOneUrl)]
        }, function (granted) {
            if (granted) {
                save_options(cleanURL(vmwareOneUrl));
            } else {
                var status = document.getElementById('status');
                status.textContent = 'Permission not granted, options not saved!';
            }
        });
    });