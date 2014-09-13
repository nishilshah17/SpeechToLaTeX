var speech;

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en";

function start() {
  speech = "";
  recognition.start();
}

function stop() {
  recognition.stop();
}

recognition.onresult = function (event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
          var text = event.results[i][0].transcript;
          insertAtCaret('textarea', text);
          speech+= text;
      }
  }
}

function insertAtCaret(id, text) {
  document.getElementById(id).value = text;
}

function handleSpeech() {
  convertText(speech);
}
