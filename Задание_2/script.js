const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  alert(
    `ширина экрана: ${window.screen.availWidth}px, \nвысота экрана: ${window.screen.availHeight}px`
  );
});
