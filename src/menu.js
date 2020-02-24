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

function entryWithFocus() {
    return $(".withfocus");
}

function isFocusSet() {
    return entryWithFocus().length > 0;
}

function focus(elem) {
    entryWithFocus().removeClass('withfocus');
    elem.addClass('withfocus');
    scrollToFocus();
}

function focusFirst() {
    focus($(".item:visible:first"));
}

function focusLast() {
    focus($(".item:visible:last"))
}

function focusPrev(skip) {
    skip = skip || 1;
    entryWithFocus().removeClass('withfocus').prevAll(".item:visible").eq(skip - 1).addClass('withfocus');
    if (!isFocusSet()) {
        (skip === 1 ? focusLast : focusFirst)();
    }

    scrollToFocus();
}

function focusNext(skip) {
    skip = skip || 1;
    entryWithFocus().removeClass('withfocus').nextAll(".item:visible").eq(skip - 1).addClass('withfocus');
    if (!isFocusSet()) {
        (skip === 1 ? focusFirst : focusLast)();
    }

    scrollToFocus();
}


function scrollToFocus() {
    const element = entryWithFocus();

    // make sure we have an element to scroll to
    if (element.length > 0) {
        const offset = element.offset().top;
        const elementHeight = element.outerHeight(true) * 2;

        const visible_area_start = $(window).scrollTop();
        const visible_area_end = visible_area_start + window.innerHeight;

        if (offset < visible_area_start + elementHeight) {
            // scrolling up
            window.scroll({top: offset - elementHeight, left: 0, behavior: 'smooth'});
        } else if (offset > visible_area_end - elementHeight) {
            // scrolling down
            window.scroll({top: offset - window.innerHeight + elementHeight, left: 0, behavior: 'smooth'});
        }
    }
}


$(document).ready(function () {
    $('body').on('click', 'a', function () {
        chrome.tabs.create({url: $(this).attr('href')});
        return false;
    });

    $(document).on('keydown.down', function () {
        focusNext();
        return false;
    });

    $(document).on('keydown.up', function () {
        focusPrev();
        return false;
    });

    $(document).on('keydown.tab', function () {
        focusNext();
        return false;
    });

    $(document).on('keydown.shift_tab', function () {
        focusPrev();
        return false;
    });

    $(document).on('keydown.return', function () {
        if (!isFocusSet()) {
            focusFirst();
        }

        if (isFocusSet()) {
            chrome.tabs.create({url: $(entryWithFocus().find("a")[0]).attr('href')});
        }
    });

    $(document).on('keydown.home', function(e) {
        focusFirst();
        return false;
    });

    $(document).on('keydown.end', function(e) {
        focusLast();
        return false;
    });

    bg.onPopupLoad(function (entitlements) {
        const list = $("#results");
        list.empty();

        entitlements.forEach(function (entitlement) {
            list.append('<tr class="item"><td><img width="40" src="' + entitlement._links.icon.href + '"></td><td><a href="' + entitlement._links.launch.href + '">' + entitlement.name + '</a></td></tr>');
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