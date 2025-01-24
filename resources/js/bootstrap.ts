import axios from "axios";
window.axios = axios;

window.axios.defaults.withCredentials = true;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

if (token) {
  window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
} else {
  console.error("CSRF token not found: Ensure you have a <meta name='csrf-token'> tag in your layout.");
}

// Ensure CSRF token is set automatically
axios.get('/sanctum/csrf-cookie').then(() => {
  console.log('CSRF cookie set successfully.');
});

// All Axios requests will now automatically include the CSRF token from cookies
