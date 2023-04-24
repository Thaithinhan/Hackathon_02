let reviews = JSON.parse(localStorage.getItem("reviews")) ?? [];
let total_review = reviews.length;
// console.log(reviews);
// Tạo function render review
function render_review(data) {
  let list_reviews = document.querySelector("#list_review");
  //   console.log(list_reviews);
  let review_content = "";
  data.forEach((review) => {
    review_content += `<li class="review_item">
          <span class="rate">${review.rate}</span>
          ${review.content}
          <div class="edit_remove">
            <button class="edit" onclick="handleEdit(this,${review.id})">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="remove" onclick="handleDelete(this,${review.id})">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </li>`;
  });
  list_reviews.innerHTML = review_content;
  document.querySelector("#view_number").innerHTML = total_review;
}
render_review(reviews);

//LẤY DỮ LIỆU LÊN FORM SUBMIT
let rate;
function get_rating(e, value) {
  //   console.log(value);
  const ratings = document.querySelectorAll(".rating input");
  ratings.forEach((rating) => {
    rating.classList.remove("active");
  });
  e.classList.add("active");
  rate = value;
  //   console.log(rate);
}

// console.log(get_rating());
const formElement = document.querySelector("#form_review");
let isEdit = false;
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const review_content = formElement.querySelector("#review_content").value;
  let id;
  if (!isEdit) {
    if (reviews.length > 0) {
      id = reviews[reviews.length - 1].id + 1;
    } else {
      id = 1;
    }
    const new_review = {
      id: id,
      rate: Number(rate),
      content: review_content,
    };
    //   console.log(rate);
    reviews.push(new_review);
    total_review++;
    document.querySelector("#view_number").innerHTML = total_review;
  } else {
    id = Number(formElement.dataset.edit);
    const edit_review = {
      rate: Number(rate),
      content: review_content,
    };
    reviews.forEach((review, index) => {
      if (review.id == id) {
        reviews[index] = { ...review, ...edit_review };
      }
    });
    isEdit = false;
  }
  localStorage.setItem("reviews", JSON.stringify(reviews));
  render_review(reviews);
  formElement.querySelector("#review_content").value = "";
});

// Xoá review
function handleDelete(e, id) {
  reviews = JSON.parse(localStorage.getItem("reviews"));
  reviews.forEach((review, index) => {
    if (review.id == id) {
      reviews.splice(index, 1);
    }
  });
  localStorage.setItem("reviews", JSON.stringify(reviews));
  render_review(reviews);
  total_review--;
  document.querySelector("#view_number").innerHTML = total_review;
}

//edit review
function handleEdit(e, id) {
  reviews = JSON.parse(localStorage.getItem("reviews"));
  reviews.forEach((review, index) => {
    if (review.id == id) {
      rate = review.rate;
      formElement.querySelector("#review_content").value = review.content;
    }
  });
  formElement.dataset.edit = id;
  isEdit = true;
}
