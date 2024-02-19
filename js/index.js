const form = document.querySelector("form");
const url = "https://psychologybackend.pythonanywhere.com/";
const divResponse = document.querySelector(".response");

async function sendPostRequest(url, data) {
  divResponse.textContent = "Loading...";
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    divResponse.textContent = responseData["message"];
    // Установка таймера для исчезновения сообщения через пару секунд
    setTimeout(() => {
      divResponse.textContent = "";
    }, 4000);
    return responseData;
  } catch (error) {
    console.error("Произошла ошибка:", error);
    throw error;
  }
}
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = {};

  const inputs = event.target.querySelectorAll("input");
  const textArea = event.target.querySelector("textarea");

  inputs.forEach((element) => {
    formData[element.id] = element.value;
  });
  if (textArea.value) {
    formData["text"] = textArea.value;
    // Вызов функции для выполнения POST-запроса
    sendPostRequest(url, formData)
      .then((data) => {
        console.log("Успешный ответ:", data);
        // Здесь вы можете обрабатывать успешный ответ
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error);
        // Здесь вы можете обрабатывать ошибки запроса
      });
  } else {
    formData["text"] = "";
    // Вызов функции для выполнения POST-запроса
    sendPostRequest(url, formData)
      .then((data) => {
        console.log("Успешный ответ:", data);
        // Здесь вы можете обрабатывать успешный ответ
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error);
        // Здесь вы можете обрабатывать ошибки запроса
      });
  }
});

// main menu

// switch the background on the menu buttons
const menuElement = document.querySelector(".main__name-menu");
const scrollHeight = 131; // Высота, при которой меню станет фиксированным
const menuLinks = document.querySelectorAll(".main__name-link");

for (const menuLink of menuLinks) {
  menuLink.addEventListener("click", function () {
    const activeLinks = document.querySelectorAll(".main__name-link.active");
    activeLinks.forEach((link) => link.classList.remove("active"));

    this.classList.add("active");
  });
}
// listen to the screen and turn fixed on  the menu position
let scrollTimeout;

window.addEventListener("scroll", function () {
  clearTimeout(scrollTimeout);
  if (window.scrollY <= scrollHeight) {
    menuElement.classList.remove("fixed");
  }
  scrollTimeout = setTimeout(() => {
    menuElement.classList.remove("fixed");
  }, 1000);
  menuLinks.forEach((link) => link.classList.remove("active"));

  if (window.scrollY >= scrollHeight) {
    menuElement.classList.add("fixed");
  }
});

window.addEventListener("wheel", function () {
  if (window.scrollY >= scrollHeight) {
    menuElement.classList.add("fixed");
  }
});

const plussvgs = document.querySelectorAll(".info-box__plus");

plussvgs.forEach((svg) => {
  svg.addEventListener("click", () => {
    const isCurrentlyActive = svg.classList.contains("active");
    const currentActive = document.querySelector(".info-box__plus.active");
    const currentDropdown = svg.closest(".inner1__info-box");
    const allDropdowns = document.querySelectorAll(".info-box__drop-down-menu");
    const allArrows = document.querySelectorAll(".info-box__arrow");
    const currentArrow = svg
      .closest(".inner1__info-box")
      .querySelector(".info-box__arrow");
    // Закрыть другие открытые элементы
    if (currentActive && currentActive !== svg) {
      currentActive.classList.remove("active");
      currentActive.querySelector("#second").style.display = "block";
      allDropdowns.forEach((drop) => {
        drop.classList.add("hidden");
      });
      allArrows.forEach((arrow) => {
        arrow.classList.add("hidden");
      });
    }

    svg.classList.toggle("active");
    const secondLine = svg.querySelector("#second");
    secondLine.style.display = isCurrentlyActive ? "block" : "none";

    currentDropdown
      .querySelector(".info-box__drop-down-menu")
      .classList.toggle("hidden");

    currentArrow.classList.toggle("hidden");
  });
});
// burger menu
// let ifBurger = false;
// const burgerBtn = document.querySelector(".main-burger-menu");
// burgerBtn.addEventListener("click", () => {
//   if (ifBurger) {
//     burgerBtn.querySelector(".line2").classList.remove("hidden");
//     burgerBtn.querySelector(".line1").style.transformOrigin = "none";
//     burgerBtn.querySelector(".line1").style.transform = "none";
//     burgerBtn.querySelector(".line3").style.transformOrigin = "none";
//     burgerBtn.querySelector(".line3").style.transform = "none";
//     ifBurger = !ifBurger;
//   }
//   else {

//     burgerBtn.querySelector(".line2").classList.add("hidden");

//     burgerBtn.querySelector(".line1").style.transformOrigin = "0%";
//     burgerBtn.querySelector(".line1").style.transform = "rotate(45deg)";
//     burgerBtn.querySelector(".line3").style.transformOrigin = "15%";
//     burgerBtn.querySelector(".line3").style.transform = "rotate(-45deg)";
//     ifBurger = !ifBurger;
//   }
// });
