// 🔐 Login check
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}

// 👤 Current user
let user = JSON.parse(localStorage.getItem("currentUser"));
document.getElementById("welcome").innerText = "Welcome " + user.name;

// 🔥 Unique key for each user
let historyKey = "history_" + user.email;

// 📦 Data (per user)
let history = JSON.parse(localStorage.getItem(historyKey)) || [];
let list = document.getElementById("history");

// 🔓 Logout
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// 🎯 Event select (Date + Time)
function selectEvent(eventName) {
  let popup = document.getElementById("popup");

  let date = document.getElementById("eventDate").value;
  let time = document.getElementById("eventTime").value;

  // ❌ Validation
  if (!date || !time) {
    popup.innerText = "⚠️ Please select date & time";
    popup.className = "error show";
    setTimeout(() => popup.classList.remove("show"), 2000);
    return;
  }

  // 📌 Save record (NO user field needed now)
  let record = {
    event: eventName,
    date: date,
    time: time
  };

  history.push(record);

  // 🔥 Save per user
  localStorage.setItem(historyKey, JSON.stringify(history));

  // 🎉 Popup
  popup.innerText = `✅ Registered for ${eventName}`;
  popup.className = "success show";
  setTimeout(() => popup.classList.remove("show"), 2000);

  showHistory();
  showStats();
}

// 📜 User History (only current user)
function showHistory() {
  list.innerHTML = "";

  history.forEach(h => {
    let li = document.createElement("li");
    li.innerText = `${h.event} - ${h.date} (${h.time})`;
    list.appendChild(li);
  });
}

// 📊 Stats (only current user data)
function showStats() {
  let statsBox = document.getElementById("stats");
  statsBox.innerHTML = "";

  let eventCount = {};
  let dateCount = {};

  history.forEach(h => {
    eventCount[h.event] = (eventCount[h.event] || 0) + 1;
    dateCount[h.date] = (dateCount[h.date] || 0) + 1;
  });

  // Event-wise
  for (let e in eventCount) {
    statsBox.innerHTML += `<p>${e}: ${eventCount[e]} bookings</p>`;
  }

  statsBox.innerHTML += "<br>";

  // Date-wise
  for (let d in dateCount) {
    statsBox.innerHTML += `<p>${d}: ${dateCount[d]} bookings</p>`;
  }
}

// 🚀 Initial load
showHistory();
showStats();