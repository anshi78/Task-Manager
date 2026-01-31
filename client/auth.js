console.log("✅ auth.js loaded");

const API_BASE_URL = "http://localhost:5000/api/auth";

// ================= LOGIN =================
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("👉 Login form submitted");

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login successful!");
    window.location.href = "index.html";

  } catch (err) {
    console.error(err);
    alert("Backend not running");
  }
});

// ================= REGISTER =================
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("👉 Register form submitted");

  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  try {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Registration successful!");
    window.location.href = "index.html";

  } catch (err) {
    console.error(err);
    alert("Backend not running");
  }
});
