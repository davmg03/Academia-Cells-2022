let about = document.querySelector(".about");
let btns = document.querySelectorAll(".tab-btn");
let articles = document.querySelectorAll(".content");
about.addEventListener("click", function (e) {
  let id = e.target.dataset.id;
  if (id) {
    // remove selected from other buttons
    btns.forEach(function (btn) {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    // hide other articles
    articles.forEach(function (article) {
      article.classList.remove("active");
    });
    let element = document.getElementById(id);
    element.classList.add("active");
  }
});