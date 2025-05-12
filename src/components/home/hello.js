// src/components/HelloComponent.js

export default function (element) {
  const message = element.getAttribute("data-message") || "Hello from vanilla JS!";

  const p = document.createElement("p");
  p.textContent = message;
  p.style.fontWeight = "bold";

  element.appendChild(p);
}
