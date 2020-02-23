var bg = chrome.extension.getBackgroundPage();

function filterEntitlements(input) {
    // Declare variables
    let filter, entitlements, entitlement, a, i, txtValue;
    filter = input.toUpperCase();
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

$(document).ready(function () {
    $('body').on('click', 'a', function () {
        chrome.tabs.create({url: $(this).attr('href')});
        return false;
    });

    bg.onPopupLoad(function (entitlements) {
        const list = $("#results");
        list.empty();
        entitlements.forEach(function (entitlement) {
            list.append('<tr><td><img width="40" src="' + entitlement._links.icon.href + '"></td><td><a href="' + entitlement._links.launch.href + '">' + entitlement.name + '</a></td></tr>');
        });
    });
    const input = $('#appSearch');

    input.on({
        'keyup': function () {
            let str = $("#appSearch").val();
            filterEntitlements(str);
        }
    });

    input.focus();
});