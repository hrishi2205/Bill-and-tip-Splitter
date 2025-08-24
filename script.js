document.addEventListener("DOMContentLoaded", () => {
  function calculateTip() {
    const billAmount = parseFloat(document.getElementById("bill").value);
    const serviceQuality = parseFloat(document.getElementById("service").value);
    const numberOfPeople = parseFloat(document.getElementById("people").value);

    const tip = document.getElementById("tipAmount");
    const total = document.getElementById("totalAmount");
    const person = document.getElementById("perPerson");
    const tipPerson = document.getElementById("tipPerPerson");

    if (isNaN(billAmount) || billAmount <= 0) {
      alert("PLEASE ENTER A VALID BILL AMOUNT");
      return;
    }
    if (isNaN(serviceQuality)) {
      alert("PLEASE SELECT A SERVICE RATING");
      return;
    }
    if (isNaN(numberOfPeople) || numberOfPeople < 1) {
      alert("PLEASE ENTER A VALID NUMBER OF PEOPLE");
      return;
    }

    const tipAmount = billAmount * serviceQuality;
    const totalAmount = billAmount + tipAmount;
    const perPerson = totalAmount / numberOfPeople;
    const tipPerPerson = tipAmount / numberOfPeople;

    // Animate values (pass previous values as start, final values as end)
    animateValue(tip, tip.textContent, tipAmount, 1000, true);
    animateValue(total, total.textContent, totalAmount, 1000, true);
    animateValue(person, person.textContent, perPerson, 1000, true);
    animateValue(tipPerson, tipPerson.textContent, tipPerPerson, 1000, true);
  }

  function animateValue(
    element,
    startValue,
    endValue,
    duration,
    isMoney = false
  ) {
    // Extract only numbers from previous text
    let start = parseFloat(startValue.replace(/[^0-9.-]+/g, "")) || 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = start + (endValue - start) * progress;

      element.textContent = value.toFixed(2); // only number
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  document
    .getElementById("calculateBtn")
    .addEventListener("click", calculateTip);
});
