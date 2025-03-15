document.addEventListener("DOMContentLoaded", () => {
  function copy(id, button) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => {
      const originalText = button.innerText;
      button.innerText = "Copied!";
      button.disabled = true;
      button.classList.add("opacity-50", "cursor-not-allowed");

      setTimeout(() => {
        button.innerText = originalText;
        button.disabled = false;
        button.classList.remove("opacity-50", "cursor-not-allowed");
      }, 3000);
    }).catch(err => {
      console.error("Error copying text: ", err);
    });
  }

  // Making the function accessible globally
  window.copy = copy;
});



if (document.querySelector("#previewText")) {
  document.addEventListener("DOMContentLoaded", () => {
    const previewText = document.getElementById("previewText");
    const fontSizeDropdown = document.getElementById("fontSizeDropdown");
    const fontSizeSlider = document.getElementById("fontSizeSlider");
    const italicToggle = document.getElementById("italicToggle");
    const fontPreviews = document.querySelectorAll(".fhs-font-preview");
    let isItalic = false;

    function updateFontPreview() {
      const text = previewText.value || "আমার সোনার বাংলা";
      const fontSize = fontSizeSlider.value + "px";

      fontPreviews.forEach(el => {
        el.textContent = text;
        el.style.fontSize = fontSize;
        el.style.fontStyle = isItalic ? "italic" : "normal";
      });

      if (![24, 32, 40, 48, 64].includes(parseInt(fontSizeSlider.value))) {
        fontSizeDropdown.value = "custom";
        fontSizeDropdown.querySelector("option[value='custom']").textContent = fontSize;
      } else {
        fontSizeDropdown.value = fontSizeSlider.value;
      }
    }

    previewText.addEventListener("input", updateFontPreview);
    fontSizeDropdown.addEventListener("change", (e) => {
      fontSizeSlider.value = e.target.value === "custom" ? fontSizeSlider.value : e.target.value;
      updateFontPreview();
    });
    fontSizeSlider.addEventListener("input", updateFontPreview);

    italicToggle.addEventListener("click", () => {
      isItalic = !isItalic;
      italicToggle.classList.toggle("bg-gray-900");
      italicToggle.classList.toggle("text-white");
      italicToggle.classList.toggle("bg-transparent");
      italicToggle.classList.toggle("text-black");
      updateFontPreview();
    });

    updateFontPreview();
  });
}