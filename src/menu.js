var bg = chrome.extension.getBackgroundPage();

function myFunction(input) {
  // Declare variables
  var filter,results, row, a, i, txtValue;
  filter = input.toUpperCase();
  results = document.getElementById("results");
  row = results.getElementsByTagName('tr');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < row.length; i++) {
    a = row[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      row[i].style.display = "";
    } else {
      row[i].style.display = "none";
    }
  }
}

$(document).ready(function() {

  $('body').on('click', 'a', function(){
    chrome.tabs.create({url: $(this).attr('href')});
    return false;
  });

  bg.onPopupLoad(function(response) {
    const list = $("#results");
    list.empty();
    response._embedded.entitlements.forEach(function(entitlement) {
      if (entitlement._links.launch !== undefined) {
        list.append('<tr><td><img width="40" src="'+ entitlement._links.icon.href + '"></td><td><a href="' + entitlement._links.launch.href + '">'+entitlement.name+'</a></td></tr>');
      }
    });
  });
  const input = $('#appSearch');

  input.on({
    'keyup': function() {
      let str = $("#appSearch").val();
      myFunction(str);
    }
  });

  input.focus();
});