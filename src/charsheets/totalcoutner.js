"use strict";
function updateTotalRate() {
  let selectors = document.getElementsByClassName("rate-selector")
  let totalRate = 0;
  for (let selector = 0; selector < selectors.length; selector += 1) {
    let value = parseInt(selectors[selector].value);
    if(isNaN(value)) return;
    totalRate += value
  }
  totalRate = totalRate / selectors.length;
  document.getElementById("total-rate").value = Math.floor(totalRate);
}



document.getElementById("rate-block").addEventListener("input", (e) => {
  let value = e.target.value;
  let number = parseInt(value);
  if(number >= 10) {
    e.target.value = 10;
    return;
  }
  if(value === "" || isNaN(number)) {
    e.target.value = 0;
    return;
  }
  e.target.value = number
})

document.addEventListener('change', updateTotalRate);

