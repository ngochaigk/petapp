"use strict";

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const healthyBtn = document.getElementById("healthy-btn");
const tableData = document.getElementById("tbody");
const bmiBtn = document.getElementById("#bmi-btn");
const petArr = [];
let dataPet;

// display data
function renderTableData(petArr) {
  tableData.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    let row = document.createElement("tr");

    // get date
    let dateGet = new Date();
    let dateAdded = `${
      dateGet.getDate() < 10 ? `0${dateGet.getDate()}` : `${dateGet.getDate()}`
    }/${
      dateGet.getMonth() + 1 < 10
        ? `0${dateGet.getMonth() + 1}`
        : `${dateGet.getMonth() + 1}`
    }/${dateGet.getFullYear()}`;

    // insert data into table
    row.innerHTML = `
      <th scope="row">${petArr[i].petId}</th>
      <td>${petArr[i].petName}</td>
      <td>${petArr[i].age}</td>
      <td>${petArr[i].type}</td>
      <td>${petArr[i].weight} kg</td>
      <td>${petArr[i].petLength} cm</td>
      <td>${petArr[i].breed}</td>
      <td><i class="bi bi-square-fill" style="color: ${
        petArr[i].color
      }"></i></td>
      <td><i class = ${
        petArr[i].vaccinated === true
          ? `"bi bi-check-circle-fill"`
          : `"bi bi-x-circle-fill"`
      }></i></td>
      <td><i class = ${
        petArr[i].dewormed === true
          ? `"bi bi-check-circle-fill"`
          : `"bi bi-x-circle-fill"`
      }></i></td>
      <td><i class = ${
        petArr[i].sterilized === true
          ? `"bi bi-check-circle-fill"`
          : `"bi bi-x-circle-fill"`
      }></i></td>
      <td>${petArr[i].bmi ?? "?"}</td>
      <td>${dateAdded}</td>
      <td><button onclick="deletePet('${
        petArr[i].petId
      }')" type="button" class="btn btn-danger">Delete</button></td>`;
    tableData.appendChild(row);
  }
}

// validate data
function validateData(dataPet) {
  // check ID unique
  for (let i = 0; i < petArr.length; i++) {
    if (dataPet.petId === petArr[i].petId) {
      alert("ID must be unique!");
      return false;
    }
  }
  // check data format
  if (
    dataPet.petId === "" ||
    dataPet.petName === "" ||
    dataPet.age === "" ||
    dataPet.weight === "" ||
    dataPet.petLength === ""
  ) {
    alert("Please fill the blank!");
    return false;
  } else if (isNaN(dataPet.age) || dataPet.age < 1 || dataPet.age > 15) {
    alert("Age must be a number, between 1 and 15!");
    return false;
  } else if (
    isNaN(dataPet.weight) ||
    dataPet.weight < 1 ||
    dataPet.weight > 15
  ) {
    alert("Weight must be a number, and between 1 and 15!");
    return false;
  } else if (
    isNaN(dataPet.petLength) ||
    dataPet.petLength < 1 ||
    dataPet.petLength > 100
  ) {
    alert("Length must be a number, between 1 and 100!");
    return false;
  } else if (dataPet.type === "Select Type") {
    alert("Please select Type!");
    return false;
  } else if (dataPet.breed === "Select Breed") {
    alert("Please select Breed!");
    return false;
  } else {
    return true;
  }
}

// submit event
submitBtn.addEventListener("click", function () {
  dataPet = {
    petId: idInput.value,
    petName: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    petLength: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };

  if (validateData(dataPet)) {
    petArr.push(dataPet);
    renderTableData(petArr);
    document.querySelector("#form-data").reset();
  }
});

// delete pet
function deletePet(x) {
  let confirmDelete = confirm(`Do you want delete pet's ID ${x}?`);

  if (confirmDelete) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].petId === x) {
        let indexRow = i;
        document.getElementById("tbody").deleteRow(indexRow);
        petArr.splice(indexRow, 1);
        break;
      }
    }
  }
}

// show healthy pet
function healthyCheck() {
  let healthyPetArr = [];
  for (let i = 0; i < petArr.length; i++) {
    if (
      petArr[i].vaccinated === true &&
      petArr[i].dewormed === true &&
      petArr[i].sterilized === true
    ) {
      healthyPetArr.push(petArr[i]);
    } else {
      healthyPetArr.splice(i, 1);
    }
  }
  renderTableData(healthyPetArr);
}

healthyBtn.addEventListener("click", function () {
  tableData.innerHTML = "";
  if (healthyBtn.innerText === "Show Healthy Pet") {
    healthyCheck();
    healthyBtn.innerText = "Show All Pet";
  } else {
    renderTableData(petArr);
    healthyBtn.innerText = "Show Healthy Pet";
  }
});

// calculate BMI
document.querySelector("#bmi-btn").addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi =
      petArr[i].type === "Dog"
        ? ((petArr[i].weight * 703) / petArr[i].petLength ** 2).toFixed(2)
        : ((petArr[i].weight * 886) / petArr[i].petLength ** 2).toFixed(2);
  }
  renderTableData(petArr);
});
