const btn = document.querySelector(".btn");
const svgBtn1 = document.querySelector(".svgBtn.btn1");
const svgBtn2 = document.querySelector(".svgBtn.btn2");

btn.addEventListener("click", () => {
  if (svgBtn1.classList.contains("show")) {
    svgBtn1.classList.remove("show");
    svgBtn2.classList.add("show");
  } else {
    svgBtn2.classList.remove("show");
    svgBtn1.classList.add("show");
  }
});
