const chatBox = document.getElementById("chatBox");
const suggestionsDiv = document.getElementById("suggestions");
const input = document.getElementById("userInput");

input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

/* MESSAGE HELPERS */
function addUser(text) {
  chatBox.innerHTML += `<div class="user-msg">${text}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addBot(text) {
  chatBox.innerHTML += `<div class="bot-msg">${text}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* SUGGESTION ENGINE */
function showSuggestions(list) {
  suggestionsDiv.innerHTML = "";
  list.slice(0,5).forEach((q,i) => {
    const btn = document.createElement("button");
    btn.innerText = q;
    btn.style.animationDelay = `${i * 0.05}s`;
    btn.onclick = () => sendMessage(q);
    suggestionsDiv.appendChild(btn);
  });
}

/* GREETING DETECTION */
function isGreeting(msg) {
  return ["hi","hello","namaste","hey","good morning"]
    .some(g => msg.toLowerCase().includes(g));
}

/* INTENT DETECTION (AI-LIKE) */
function detectIntent(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("admission")) return "admission";
  if (msg.includes("fee")) return "fees";
  if (msg.includes("syllabus")) return "syllabus";
  if (msg.includes("sessional") || msg.includes("put") || msg.includes("exam")) return "exams";
  if (msg.includes("hostel")) return "hostel";
  if (msg.includes("placement")) return "placement";
  if (msg.includes("campus")) return "campus";

  return "general";
}

/* MAIN FUNCTION */
function showTypingIndicator() {
  const div = document.createElement("div");
  div.className = "bot-msg";
  div.id = "typingIndicator";

  div.innerHTML = `
    <div class="typing">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;

  
}




function removeTypingIndicator() {
  const t = document.getElementById("typingIndicator");
  if (t) t.remove();
}

function typeBotMessage(text, callback) {
  const div = document.createElement("div");
  div.className = "bot-msg";
  chatBox.appendChild(div);

  let i = 0;
  const words = text.split(" ");

  const interval = setInterval(() => {
    div.innerHTML += words[i] + " ";
    chatBox.scrollTop = chatBox.scrollHeight;
    i++;
    if (i >= words.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 120);
}


function sendMessage(forced=null) {
  const msg = forced || input.value.trim();
  if (!msg) return;

  addUser(msg);
  input.value = "";
  suggestionsDiv.innerHTML = "";

  if (isGreeting(msg)) {

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();

    typeBotMessage(
      "Welcome to the Virtual Helpdesk for KCC Institute of Technology and Management. How can I assist you today?",
      () => {
        showSuggestions([
          "Can you tell me about KCCITM?",
          "I have a query regarding new admissions.",
          "Can you explain the fee structure?",
          "I want information about hostel facilities.",
          "I want information about placements."
        ]);
      }
    );

  }, 1000);

  return;
}


  const intent = detectIntent(msg);

  /* RESPONSES + FOLLOW-UP SUGGESTIONS */
 if (intent === "admission") {

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();

    typeBotMessage(
      "Students must have 60% or more in 12th with PCM from Science stream. Admission is through counselling or direct admission, and JEE score is not mandatory.",
      () => {
        showSuggestions([
          "What is the eligibility criteria for admission?",
          "Is admission through counselling or direct?",
          "Is JEE mandatory for admission?"
        ]);
      }
    );

  }, 1000);
}



else if (intent === "fees") {

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();

    typeBotMessage(
      "For the 2026–27 batch, the fee is ₹60,000 per semester for B.Tech and ₹65,000 per semester for MBA.",
      () => {
        showSuggestions([
          "What is the fee for B.Tech?",
          "What is the fee for MBA?"
        ]);
      }
    );

  }, 1000);
}



else if (intent === "hostel") {

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();

    typeBotMessage(
      "KCCITM provides separate hostels for boys and girls. Mess facilities include both veg and non-veg food, and Wi-Fi is available.",
      () => {
        showSuggestions([
          "Are there separate hostels for boys and girls?",
          "Is Wi-Fi available in hostels?",
          "Does the mess provide non-veg food?"
        ]);
      }
    );

  }, 1000);
}


  else if (intent === "placement") {
  addBot(
    "As per recent placement records, KCCITM has an active placement cell with multiple recruiters visiting the campus."
  );

  showSuggestions([
    "Does KCCITM have a placement cell?",
    "Is placement support provided to students?"
  ]);
}


  else if (intent === "campus") {

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();

    // Add text message first
    typeBotMessage(
      "You can explore campus life, student activities, and events of KCC Institute of Technology and Management through its official Instagram page.",
      () => {
        // Add clickable link as a separate bot message
        const div = document.createElement("div");
        div.className = "bot-msg";
        div.innerHTML = `<a href="https://www.instagram.com/kccinstitutes/" target="_blank">Visit Instagram</a>`;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;

        showSuggestions([
          "Where can I see campus life of KCCITM?",
          "Is there any official social media page of the college?"
        ]);
      }
    );

  }, 1000);
}




 else {

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();

    typeBotMessage(
      "I can help you with admissions, fee structure, hostel facilities, placements, and campus information. Please choose a topic from the suggestions below.",
      () => {
        showSuggestions([
          "Admission related queries",
          "Fee structure information",
          "Hostel facilities",
          "Placement support",
          "Campus and infrastructure"
        ]);
      }
    );

  }, 1000);
}
}