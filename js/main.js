const select = document.querySelectorAll(".hero__option");

select.forEach((selectOption) => {
  const dropdown = selectOption.querySelector(".hero__dropdown");
  const svgIcon = selectOption.querySelector(".svg-icon");

  selectOption.addEventListener("click", function (event) {
    // Якщо це не поточний елемент, то скидаємо "active" в інших елементах
    select.forEach((otherSelectOption) => {
      if (otherSelectOption !== selectOption) {
        otherSelectOption
          .querySelector(".hero__dropdown")
          .classList.remove("active");
        otherSelectOption.querySelector(".svg-icon").classList.remove("active");
      }
    });

    // Перемикаємо клас "active" для поточного елемента
    dropdown.classList.toggle("active");
    svgIcon.classList.toggle("active");
  });
});

// Додаємо подію для закриття при кліку поза елементами
document.addEventListener("click", function (event) {
  if (!event.target.closest(".hero__option")) {
    select.forEach((selectOption) => {
      selectOption.querySelector(".hero__dropdown").classList.remove("active");
      selectOption.querySelector(".svg-icon").classList.remove("active");
    });
  }
});

const currencyInput = document.getElementById("currencyInput");

currencyInput.addEventListener("input", function () {
  let value = currencyInput.value;
  value = value.replace(/[^0-9.]/g, "");
  if (!value.includes(".")) {
    value = value + ".00";
  } else {
    const parts = value.split(".");
    parts[1] = parts[1].slice(0, 2);
    value = parts.join(".");
  }
  const cursorPosition = currencyInput.selectionStart;
  currencyInput.value = value;
  if (cursorPosition !== value.length) {
    currencyInput.setSelectionRange(cursorPosition, cursorPosition);
  }
});

// header__list

const menuBtn = document.querySelector(".btn-open");
const menu = document.querySelector(".header__list");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("active");

  if (menu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
  } else {
    document.body.style.overflow = "";
  }
});

// fag__accordeon-item

const dropAccItem = document.querySelectorAll(".fag__accordeon-item");

dropAccItem.forEach((dropItem) => {
  dropItem.addEventListener("click", function () {
    const subtitle = dropItem.querySelector(".fag__accordeon-subtitle");
    const iconDown = dropItem.querySelector(".icon-acc");

    // Проверка, если текущий элемент уже активен
    if (subtitle.classList.contains("active")) {
      // Если активен, сбрасываем класс
      subtitle.classList.remove("active");
      iconDown.classList.remove("active");
    } else {
      // Если не активен, сбрасываем классы у всех элементов
      dropAccItem.forEach((removeAcc) => {
        const removeSubtitle = removeAcc.querySelector(
          ".fag__accordeon-subtitle"
        );
        const removeIconDown = removeAcc.querySelector(".icon-acc");
        removeSubtitle.classList.remove("active");
        removeIconDown.classList.remove("active");
      });

      // Добавляем класс active только к текущему элементу
      subtitle.classList.add("active");
      iconDown.classList.add("active");
    }
  });
});

// mobile-country-list_country

const countryItem = document.querySelectorAll(".mobile-country-list_country");

countryItem.forEach((itemCountry) => {
  const contentCountryClick = itemCountry.querySelector(
    ".mobile-country-list_content"
  );
  const icCountry = itemCountry.querySelector(".ic-country");

  itemCountry.addEventListener("click", function () {
    // Проверяем, если контент открыт, скрываем его и убираем поворот
    if (contentCountryClick.style.display === "flex") {
      contentCountryClick.style.display = "none";
      icCountry.style.transform = "rotate(0deg)"; // Убираем поворот
    } else {
      // Закрываем все другие контенты и открываем текущий
      countryItem.forEach((otherItemCountry) => {
        const otherContent = otherItemCountry.querySelector(
          ".mobile-country-list_content"
        );
        otherContent.style.display = "none"; // Закрыть все другие
        const otherIcCountry = otherItemCountry.querySelector(".ic-country");
        otherIcCountry.style.transform = "rotate(0deg)"; // Убираем поворот у других
      });
      contentCountryClick.style.display = "flex"; // Открыть текущий
      icCountry.style.transform = "rotate(180deg)"; // Поворот на 180 градусов
    }
  });
});

// btn-close
const formUser = document.querySelector(".user__form");
const btnCloseSign = document.querySelector(".btn-close");
const btnOpenSign = document.querySelectorAll(".header__btn");

btnOpenSign.forEach((btnOpenForm) => {
  btnOpenForm.addEventListener("click", function () {
    formUser.classList.add("active");
  });
});

btnCloseSign.addEventListener("click", function () {
  formUser.classList.remove("active");
});

// user__form-accbtn

const btnAcc = document.querySelectorAll(".user__form-accbtn");

btnAcc.forEach((btnaccadd) => {
  btnaccadd.addEventListener("click", function () {
    btnAcc.forEach((btn) => {
      btn.classList.remove("active");
    });
    
    btnaccadd.classList.add("active");
  });
});
