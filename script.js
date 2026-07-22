const API_URL = "https://jarvis-ai-production-9272.up.railway.app/chat";

const btn = document.getElementById("start-btn");

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
}

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.continuous = false;

btn.addEventListener("click", () => {
  recognition.start();
});

recognition.onresult = async (event) => {
  const message = event.results[0][0].transcript;
  console.log("You:", message);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await res.json();

    console.log("Jarvis:", data.reply);
    speak(data.reply);

  } catch (err) {
    console.error(err);
    speak("Sorry, I cannot connect to the server.");
  }
};