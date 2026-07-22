const API_URL = "https://jarvis-ai-production-9272.up.railway.app/chat";

const btn = document.getElementById("start-btn");
const userText = document.getElementById("user-text");
const aiText = document.getElementById("ai-text");

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.lang = "en-US";
recognition.interimResults = false;

btn.onclick = () => {
  recognition.start();
};

recognition.onresult = async (event) => {
  const message = event.results[0][0].transcript;

  userText.innerText = message;
  aiText.innerText = "Thinking...";

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

    const speech = new SpeechSynthesisUtterance(data.reply);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);

  } catch (e) {
    aiText.innerText = "Server Error!";
  }
};