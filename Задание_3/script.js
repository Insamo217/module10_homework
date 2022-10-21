const form = document.getElementById("form");
const chat = document.getElementById("chat");
const info = document.getElementById("info");
const send = document.getElementById("send");
const geo = document.getElementById("geo");
const clear = document.getElementById("clear");
const restart = document.getElementById("restart");
const text = form.querySelector('[name="message"]');

function pageLoaded() {
  const websocket = new WebSocket("wss://echo-ws-service.herokuapp.com/");

  //кнопка отправки текста
  send.addEventListener("click", () => {
    const message = text.value;
    writeToScreen(message, false);
    websocket.send(message);
  });

  //кнопка геолокации
  geo.addEventListener("click", () => {
    const geoHref = document.createElement("a");
    geoHref.href = "";
    geoHref.textContent = "";
    if (!navigator.geolocation) {
      info.textContent = "Geolocation не поддерживается вашим браузером";
    } else {
      info.textContent = "Определение местоположения…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  });

  //кнопка перезагрузки страницы
  restart.addEventListener("click", () => {
    location.reload();
  });

  //функция вывода текста в чат
  function writeToScreen(message, echo) {
    let pre = document.createElement("p");
    pre.innerHTML = message;
    if (echo) {
      pre.className = "echo";
    } else {
      pre.className = "user";
    }
    if (message) {
      chat.appendChild(pre);
    }
    //кнопка очистки
    clear.addEventListener("click", () => {
      pre.remove();
    });

    form.reset();
  }

  // Функция, выводящая текст об ошибке
  const error = () => {
    info.textContent = "Невозможно получить ваше местоположение";
  };

  // Функция, срабатывающая при успешном получении геолокации
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    info.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
    const geoHref = document.createElement("a");
    geoHref.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    geoHref.textContent = "Ссылка на карту";
    geoHref.target = "_blank";
    chat.appendChild(geoHref);
    clear.addEventListener("click", () => {
      geoHref.remove();
    });
  };

  //отправка ответа
  websocket.onmessage = function (event) {
    writeToScreen(event.data, true);
  };

  //статусы вебсокета
  websocket.onopen = () => {
    info.innerText = "Соединение установлено";
  };

  websocket.onerror = () => {
    info.innerText = "Сервер не работает";
  };

  websocket.onclose = () => {
    info.innerText = "Соединение закрыто, нажмите на перезагрузку";
  };
}

document.addEventListener("DOMContentLoaded", pageLoaded);
