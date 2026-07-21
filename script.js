const status = document.getElementById("status");
const btn = document.getElementById("talkBtn");

btn.addEventListener("click", () => {

  status.innerHTML = "🎙️ Listening...";

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    status.innerHTML = "❌ Speech Recognition not supported";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  recognition.start();

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;

    status.innerHTML = "🗣️ " + text;

    const speech = new SpeechSynthesisUtterance(
      "You said " + text
    );

    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  recognition.onerror = () => {
    status.innerHTML = "⚠️ Voice recognition failed";
  };

});