var bg = chrome.extension.getBackgroundPage();

function myFunction(input) {
  // Declare variables
  var filter, ul, li, a, i, txtValue;
  filter = input.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

$(document).ready(function() {
  console.log("here");
  $('#myInput').on({
    'keyup': function() {
      console.log("here");
      let str = $("#myInput").val();
      myFunction(str);
    }
  });
});
