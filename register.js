let form = document.getElementById("registerForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let mobile = document.getElementById("mobile").value;
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;
  let cpass = document.getElementById("cpass").value;

  let popup = document.getElementById("popup");

  // ❌ Password check
  if (pass !== cpass) {
    popup.innerText = "❌ Password mismatch";
    popup.className = "error show";

    setTimeout(() => popup.classList.remove("show"), 2000);
    return;
  }

  let users = JSON.parse(localStorage.getItem("accounts")) || [];

  // ⚠️ Already exists
  if (users.find(u => u.email === email)) {
    popup.innerText = "⚠️ User already exists";
    popup.className = "error show";

    setTimeout(() => popup.classList.remove("show"), 2000);
    return;
  }

  // ✅ Save user
  users.push({ name, mobile, email, pass });
  localStorage.setItem("accounts", JSON.stringify(users));

  // 🎉 Success popup
  popup.innerText = "🎉 Registration Successful!";
  popup.className = "success show";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});