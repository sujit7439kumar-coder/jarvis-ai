const startBtn = document.getElementById("start");
const status = document.getElementById("status");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  status.innerText = "Speech Recognition not supported!";
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;

  function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  }

  startBtn.addEventListener("click", () => {
    recognition.start();
    status.innerText = "Listening...";
  });

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    status.innerText = "You said: " + command;

    if (command.includes("hello")) {
      speak("Hello Sujit!");
    } else if (command.includes("time")) {
      speak("The time is " + new Date().toLocaleTimeString());
    } else if (command.includes("youtube")) {
      speak("Opening YouTube");
      window.open("https://www.youtube.com", "_blank");
    } else if (command.includes("google")) {
      speak("Opening Google");
      window.open("https://www.google.com", "_blank");
    } else {
      speak("Searching Google");
      window.open(
        "https://www.google.com/search?q=" +
          encodeURIComponent(command),
        "_blank"
      );
    }
  };

  recognition.onerror = () => {
    status.innerText = "Try Again";
  };
}