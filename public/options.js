var bg = chrome.extension.getBackgroundPage();

function save_options(vmwareOneUrl) {
    chrome.storage.sync.set({
        vmwareOneUrl: vmwareOneUrl
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function originURL(url) {
    return cleanURL(url)+ "/*";
}
function cleanURL(url) {
    return url.replace(/\/?\*?$/,"");
}


// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        vmwareOneUrl: 'https://myvmware.workspaceair.com'
    }, function(items) {
        document.getElementById('vmware-one-url').value = items.vmwareOneUrl;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    function() {
        var vmwareOneUrl = document.getElementById('vmware-one-url').value;

        chrome.permissions.request({
            origins: [originURL(vmwareOneUrl)]
        }, function(granted) {
            if (granted) {
                save_options(cleanURL(vmwareOneUrl));
            } else {
                var status = document.getElementById('status');
                status.textContent = 'Permission not granted, options not saved!';
            }
        });
    });