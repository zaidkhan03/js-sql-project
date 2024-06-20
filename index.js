const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const grade = document.querySelector("#class");
const dob = document.querySelector("#dob");
const parentName = document.querySelector("#parentName");
const address = document.querySelector("#address");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const submit = document.querySelector("#submit");

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  if (
    !firstName.value ||
    !lastName.value ||
    !grade.value ||
    !dob.value ||
    !parentName.value ||
    !address.value ||
    !phone.value ||
    !email.value
  ) {
    alert("All fields are required.");
    return;
  }

  const person = {
    firstName: firstName.value,
    lastName: lastName.value,
    grade: grade.value,
    dob: dob.value,
    parentName: parentName.value,
    address: address.value,
    phone: phone.value,
    email: email.value,
  };

  await fetch("http://localhost:3005/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  })
    .then((response) => response.text())
    .then((data) => {
      firstName.value = "";
      lastName.value = "";
      grade.value = "";
      dob.value = "";
      parentName.value = "";
      address.value = "";
      phone.value = "";
      email.value = "";
    })
    .catch((error) => console.error("Error:", error));
});
