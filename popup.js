'use strict';

// ucs-2 string to base64 encoded ascii
function _encode(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}
// base64 encoded ascii to ucs-2 string
function _decode(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

// Copy text
function copyClipboard() {
  var elm = document.getElementById("text");
  if (elm.innerText.length <= 0 ) return;
  // for Internet Explorer

  if (document.body.createTextRange) {
    var range = document.body.createTextRange();
    range.moveToElementText(elm);
    range.select();
    document.execCommand("Copy");
    showSnackbar();
  } else if (window.getSelection) {
    // other browsers

    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(elm);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("Copy");
    showSnackbar();
  }
}

// Snackbar
function showSnackbar() {
  var x = document.getElementById("snackbar");
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
}

var text = document.getElementById("text");
var btnEncode = document.getElementById("btn-encode");
var btnDecode = document.getElementById("btn-decode");
var btnCopy = document.getElementById("btn-copy");
var btnClear = document.getElementById("clear-content");

// Encode content
btnEncode.addEventListener("click", function() {
  var encodedText = _encode(text.innerText);
  text.innerText = encodedText;
  text.focus();
});

// Decode content
btnDecode.addEventListener("click", function() {
  var decodedText = _decode(text.innerText);
  text.innerText = decodedText;
  text.focus();
});

// Copy content to clipboard
btnCopy.addEventListener("click", function() {
  return copyClipboard();
});

// Clear content
btnClear.addEventListener("click", function() {
  text.innerText = "";
  text.focus();
})
