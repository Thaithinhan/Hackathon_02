//Bài tập 1
function reverse() {
  let string = document.querySelector("#input_string").value;
  let array = string.split("");
  let new_array = [];
  for (let i = 0; i < array.length; i++) {
    new_array[i] = array[array.length - 1 - i];
  }
  string = new_array.join("");
  document.querySelector(
    "#result_string_reverse"
  ).innerHTML = ` Chuỗi đã đảo ngược thành ${string}`;
}

//Bài tập 2
function capitalText() {
  let string = document.querySelector("#input_string1").value;
  let array = string.split(" ");

  array.forEach((word, index) => {
    array[index] = array[index].charAt(0).toUpperCase() + array[index].slice(1);
  });
  string = array.join(" ");
  document.querySelector(
    "#result_string_capital"
  ).innerHTML = ` Chuỗi đã viết hoa ký tự đầu ${string}`;
}

//bài tập 3
function removeDublicate() {
  let string = document.querySelector("#input_string2").value;
  let array = string.split(",");
  console.log(array);
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] == array[j]) {
        array.splice(j, 1);
      }
    }
  }
  document.querySelector(
    "#result_new_aray"
  ).innerHTML = ` Mảng đã bỏ viết trùng là: ${array}`;
}
//Bài tập 4

function sort_AtoZ() {
  let string = document.querySelector("#input_string3").value.trim();
  let array = string.split(" ");
  let new_array = [];
  for (let i = 0; i < array.length; i++) {
    array[i] = Number(array[i]);
  }
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] <= array[j]) {
        new_array.push(array[i]);
      }
    }
  }
  console.log(new_array);
}

//BAI TẬP 5

const employees = [
  {
    id: 1,
    fullname: "Thái Thị Nhàn",
    dept: "Kế toán",
  },
  {
    id: 2,
    fullname: "Lê Thiên Ngọc Trâm",
    dept: "Kho",
  },
  {
    id: 3,
    fullname: "Trần Đăng Khoa",
    dept: "IT",
  },
];

//TẠO FUNCTION RENDER

let tbody = document.querySelector("tbody");

function render(data) {
  let tbodyContent = "";
  data.forEach((employee, index) => {
    tbodyContent += `  <tr>
            <td>${index + 1}</td>
            <td>${employee.fullname}</td>
            <td>${employee.dept}</td>
            <td class="edit_remove">
              <button onclick="edit_employee(this, ${
                employee.id
              })">Edit</button>
              <button onclick="remove_employee(this, ${
                employee.id
              })">Remove</button>
            </td>
          </tr>`;
  });
  tbody.innerHTML = tbodyContent;
}
render(employees);

//TẠO FUNCTION ADD NHÂN VIÊN
const formElement = document.querySelector("form");
let isEdit = false;
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const fullname = formElement.querySelector("#fullname").value;
  const dept = formElement.querySelector("#dept").value;
  const id = formElement.querySelector("#id").value;
  if (!isEdit) {
    const new_employ = {
      id: employees[employees.length - 1].id + 1,
      fullname: fullname,
      dept: dept,
    };
    employees.push(new_employ);
    formElement.querySelector("#fullname").value = "";
    formElement.querySelector("#dept").value = "";
  } else {
    const edit_employ = {
      fullname: fullname,
      dept: dept,
    };
    employees.forEach((employ, index) => {
      if (employ.id == Number(id)) {
        employees.splice(index, 1, edit_employ);
      }
    });
  }

  render(employees);
});

//Tạo function xoá sản phẩm
function remove_employee(e, id) {
  employees.forEach((employ, index) => {
    if (employ.id == id) {
      employees.splice(index, 1);
    }
  });
  render(employees);
}

//Tạo function edit
function edit_employee(e, id) {
  employees.forEach((employ, index) => {
    if (employ.id == id) {
      formElement.querySelector("#fullname").value = employ.fullname;
      formElement.querySelector("#dept").value = employ.dept;
      formElement.querySelector("#id").value = employ.id;
    }
  });
  isEdit = true;
  formElement.dataset.edit = id;
}
