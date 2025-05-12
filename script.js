document.getElementById('sales').addEventListener('change', updateSalesNumber);

const phoneBook = {
  "Aurel": "089509462888",
  "Fauzan": "081377696939"
};

function updateSalesNumber () {
  const salesName = document.getElementById('sales');
  const salesPhone = document.getElementById('salesPhone');
  const selectedName = salesName.value.toLowerCase().trim();

  if (phoneBook[selectedName]) {
    salesPhone.value = phoneBook[selectedName];
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById('submitButton').addEventListener('click', () => {
    const requiredFields = document.querySelectorAll('input[required], select[required]');

    // Check if any required field is empty
    let allFieldsFilled = true;
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            allFieldsFilled = false;
            field.style.borderColor = 'red'; // Optionally highlight the empty field
        } else {
            field.style.borderColor = ''; // Reset border color if filled
        }
    });

    // If any required field is empty, prevent submission and alert the user
    if (!allFieldsFilled) {
        alert('Please fill all required fields.');
        return;
    }

  const formData = new FormData();

  formData.append("entry.403788479", document.getElementById('customerName').value);
  formData.append("entry.372677485", document.getElementById('customerPhone').value);
  formData.append("entry.533089204", document.getElementById('customerEmail').value);
  formData.append("entry.668745681", document.getElementById('customerAddress').value);
  formData.append("entry.2022626583", document.getElementById('ringType').value);
  formData.append("entry.817393732", document.getElementById('sales').value);
  formData.append("entry.1928733728", document.getElementById('salesPhone').value);
  formData.append("entry.1798966034", document.getElementById('estimatedCompletion').value);
  formData.append("entry.1691521261", document.getElementById('womenRingMaterial').value);
  formData.append("entry.787146032", document.getElementById('womenRingGem').value);
  formData.append("entry.465737398", document.getElementById('womenRingWeight').value);
  formData.append("entry.255825511", document.getElementById('womenRingSize').value);
  formData.append("entry.1561675587", document.getElementById('womenRingColor').value);
  formData.append("entry.258612834", document.getElementById('womenRingFinish').value);
  formData.append("entry.1519526121", document.getElementById('womenRingEngravement').value);
  formData.append("entry.684344561", document.getElementById('womenRingModel').value);

  formData.append("entry.1993171059", document.getElementById('menRingMaterial').value);
  formData.append("entry.1090673640", document.getElementById('menRingGem').value);
  formData.append("entry.1365428160", document.getElementById('menRingWeight').value);
  formData.append("entry.1057159300", document.getElementById('menRingSize').value);
  formData.append("entry.389487441", document.getElementById('menRingColor').value);
  formData.append("entry.299224605", document.getElementById('menRingFinish').value);
  formData.append("entry.1452586399", document.getElementById('menRingEngravement').value);
  formData.append("entry.281323647", document.getElementById('menRingModel').value);
  
  formData.append("entry.262501710", document.getElementById('notesBox').value);
  formData.append("entry.443879785", document.getElementById('estimatedPrice').value);
  formData.append("entry.1527336053", document.getElementById('downPayment').value);
  formData.append("entry.153171518", document.getElementById('purchasedGold').value);

  fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSd3BbkTWkmq9BN4JsJPKdGgm_9feJElIz9iUJKFrkqjOYuHmQ/formResponse", {
    method: "POST",
    mode: "no-cors", // this is essential
    body: formData
  }).then(() => {
    alert("Order submitted successfully!");
  }).catch(() => {
    alert("Submission failed.");
  });
});

document.querySelectorAll('.currency').forEach(input => {
    input.addEventListener('input', function (e) {
        let value = e.target.value.replace(/[^,\d]/g, '').toString(); // remove non-numeric chars
        let split = value.split(',');
        let sisa = split[0].length % 3; // find the remainder when dividing by 3
        let rupiah = split[0].substr(0, sisa); // get the first part
        let ribuan = split[0].substr(sisa).match(/\d{3}/gi); // get the groups of 3 digits

        if (ribuan) {
            let separator = sisa ? '.' : ''; // if there's any remainder, add the separator
            rupiah += separator + ribuan.join('.'); // join the 3-digit groups with dots
        }

        rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah; // handle decimal part
        e.target.value = rupiah ? 'Rp ' + rupiah : ''; // add Rp and set the value
    });
});

document.querySelectorAll('.phone').forEach(input => {
    input.addEventListener('input', function (e) {
        let value = e.target.value.replace(/[^0-9]/g, '').slice(0, 13); // Allow max 13 digits only

        let part1 = value.slice(0, 4);
        let part2 = value.slice(4, 8);
        let part3 = value.slice(8, 13);

        let formatted = part1;
        if (part2) formatted += '-' + part2;
        if (part3) formatted += '-' + part3;

        e.target.value = formatted;
    });
});


});