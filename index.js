const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const grade = document.querySelector("#class");
const dob = document.querySelector("#dob");
const parentName = document.querySelector("#parentName");
const address = document.querySelector("#address");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const submit = document.querySelector("#submit");

const data = [];
let student = {};

firstName.addEventListener(
  "change",
  (e) => (student.firstName = e.target.value)
);
lastName.addEventListener("change", (e) => (student.lastName = e.target.value));
grade.addEventListener("change", (e) => (student.grade = e.target.value));
dob.addEventListener("change", (e) => (student.dob = e.target.value));
address.addEventListener("change", (e) => (student.address = e.target.value));
phone.addEventListener("change", (e) => (student.phone = e.target.value));
email.addEventListener("change", (e) => (student.email = e.target.value));
parentName.addEventListener(
  "change",
  (e) => (student.parentName = e.target.value)
);

submit.addEventListener("click", (e) => {
  e.preventDefault();
  data.push(student);
  student = {};
  firstName.value = "";
  lastName.value = "";
  grade.value = "";
  dob.value = "";
  parentName.value = "";
  address.value = "";
  phone.value = "";
  email.value = "";
  console.log(data);
  console.log(student);
});
