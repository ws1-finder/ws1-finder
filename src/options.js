var bg = chrome.extension.getBackgroundPage();

function save_options() {
    var vmwareOneUrl = document.getElementById('vmware-one-url').value;
    chrome.storage.sync.set({
        vmwareOneUrl: vmwareOneUrl
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        bg.clearCache();
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
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
    save_options);