let form = document.getElementById("loginForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;

  let users = JSON.parse(localStorage.getItem("accounts")) || [];
  let popup = document.getElementById("popup");

  let user = users.find(u => u.email === email && u.pass === pass);

  if (user) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));

    // 🎉 Success popup
    popup.innerText = "🎉 Login Successful!";
    popup.className = "success show";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1200);
  } else {
    // ❌ Error popup
    popup.innerText = "❌ Invalid Credentials";
    popup.className = "error show";

    setTimeout(() => popup.classList.remove("show"), 2000);
  }
});