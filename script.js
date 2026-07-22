const API_URL = "https://jarvis-ai-production-9272.up.railway.app/chat";

const btn = document.getElementById("start-btn");
const status = document.getElementById("status");
const userText = document.getElementById("user-text");
const aiText = document.getElementById("ai-text");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  status.innerText = "Speech Recognition is not supported in this browser.";
} else {
  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  btn.addEventListener("click", () => {
    status.innerText = "🎤 Listening...";
    recognition.start();
  });

  recognition.onresult = async (event) => {
    const message = event.results[0][0].transcript;

    userText.innerText = message;
    aiText.innerText = "🤖 Thinking...";
    status.innerText = "Processing...";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: message
        })
      });

      const data = await response.json();

      aiText.innerText = data.reply;
      status.innerText = "Ready";

      const speech = new SpeechSynthesisUtterance(data.reply);
      speech.lang = "en-US";
      speech.rate = 1;
      speech.pitch = 1;

      window.speechSynthesis.speak(speech);

    } catch (err) {
      console.error(err);
      aiText.innerText = "❌ Server Error";
      status.innerText = "Connection Failed";
    }
  };

  recognition.onerror = () => {
    status.innerText = "Microphone Error";
  };
}