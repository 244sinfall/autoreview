"use strict";
function updateTotalRate() {
  let selectors = document.getElementsByClassName("selector")
  let totalRate = 0;
  for (let selector = 0; selector < selectors.length; selector += 1) {
    let value = parseInt(selectors[selector].value);
    if(value > 10) {
      selectors[selector].value = 10;
      value = 10;
    }
    totalRate += value
  }
  totalRate = totalRate / selectors.length;
  document.getElementById("total-rate").value = Math.round(totalRate);
}


document.addEventListener('change', updateTotalRate);

