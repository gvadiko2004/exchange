const checkbox = document.getElementById("rulesCheckbox");
const submitButton = document.getElementById("submitButton");

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    submitButton.style.opacity = "1";
    submitButton.style.pointerEvents = "auto"; 
  } else {
    submitButton.style.opacity = "0.6";
    submitButton.style.pointerEvents = "none"; 
  }
});


// 

