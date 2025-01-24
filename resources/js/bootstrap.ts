import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

if (token) {
  window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
} else {
  console.error("CSRF token not found: Ensure you have a <meta name='csrf-token'> tag in your layout.");
}
