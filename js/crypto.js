// Общие переменные
const curencyPrice = document.querySelector(".curency-price");
const cryptoList = document.getElementById("crypto-list");
const currencyInputPut = document.querySelector(".currency-input-put");
const currencyInputSell = document.querySelector(".currency-input-sell");
const selectPuts = document.querySelector(".hero__select-puts");
const heroIconPut = document.querySelector(".hero__icon-put img");

let selectedCryptoPut = null;
let cryptos = [];

// Функция для получения цен криптовалют
async function fetchCryptoPrices() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,litecoin,ethereum,tether,binancecoin,tron,dogecoin,dai,toncoin&vs_currencies=rub"
  );
  const data = await response.json();

  // Массив криптовалют с их данными
  cryptos = [
    {
      name: "Tether TRC20",
      price: data.tether?.rub ? data.tether.rub * 1.042 : 0,
      image: "./images/trc20.svg",
      cashForTransit: "TNX3LHH96H7VotNrL9ETD3CSQkLkcgJ9a8",
      cashForTransitPhoto: "./images/trc20-qr.png",
    },
    {
      name: "Tether SOL",
      price: data.tether?.rub ? data.tether.rub * 1.042 : 0,
      image: "./images/trc20.svg",
      cashForTransit: "9NB7pzRTKirmC7m1dpKbH3jknJDJj1aidT4UNMKb9T1v",
    },
    {
      name: "Tether BNB",
      price: data.tether?.rub ? data.tether.rub * 1.042 : 0,
      image: "./images/trc20.svg",
      cashForTransit: "0x67487417f168df08146DB7EaaBDB32bD7A479C3e",
    },
    {
      name: "Bitcoin BTC",
      price: data.bitcoin?.rub ? data.bitcoin.rub * 1.042 : 0,
      image: "./images/btc.svg",
      cashForTransit:
        "bc1pjx67h09udncqpf2lfu6fhf0mst8qw7v98vpfq74pzpnjlh7029sssypfnu",
    },
    {
      name: "Litecoin LTC",
      price: data.litecoin?.rub ? data.litecoin.rub * 1.042 : 0,
      image: "./images/ltc.svg",
      cashForTransit: "ltc1qmvyl8f3xtvse225t74sukew3j98vcwmn9j8vs6",
    },
    {
      name: "Smart Chain BNB",
      price: data.binancecoin?.rub ? data.binancecoin.rub * 1.042 : 0,
      image: "./images/bnb.svg",
      cashForTransit: "0x139284fB0418D814b710896Cf7aA94EFEb39cf29",
    },
    {
      name: "Ethereum ETH",
      price: data.ethereum?.rub ? data.ethereum.rub * 1.028 : 0,
      image: "./images/eth.svg",
      cashForTransit: "0x139284fB0418D814b710896Cf7aA94EFEb39cf29",
    },
    {
      name: "Tron TRX",
      price: data.tron?.rub ? data.tron.rub * 1.042 : 0,
      image: "./images/trx.svg",
      cashForTransit: "TNX3LHH96H7VotNrL9ETD3CSQkLkcgJ9a8",
    },
    {
      name: "Dogecoin DOGE",
      price: data.dogecoin?.rub ? data.dogecoin.rub * 1.042 : 0,
      image: "./images/doge.svg",
      cashForTransit: "DKNnyp2SMYJGPsZkY5dKPXEn1e4LdpFYVv",
    },
    {
      name: "Tonecoin TON",
      price: data.toncoin?.rub ? data.toncoin.rub * 1.042 : 0,
      image: "./images/ton.svg",
      cashForTransit: "UQDDQ-FvZ6t_fQ_rpY4_muGaQ9nyIUgldxrBFPQSIkdyT5xJ",
    },
  ];

  // Вставляем данные в элементы на странице
  const qrPriceOrder = document.querySelector(".user-qr-price-order");
  const qrPriceOrderImg = document.querySelector(".image-qr-send-user");

  // Обновляем текст и изображение QR
  qrPriceOrder.innerText = cryptos[0].cashForTransit;
  qrPriceOrderImg.src = cryptos[0].cashForTransitPhoto;
}

// Вызов функции для получения цен
fetchCryptoPrices();






function updateCurrencyPutText(name) {
  const currencyPutElement = document.querySelector(".currency-put");
  if (currencyPutElement) {
    currencyPutElement.textContent = name;
  }
}

async function updateCryptoList() {
  await fetchCryptoPrices();

  cryptoList.innerHTML = "";

  selectedCryptoPut = cryptos[0];
  curencyPrice.innerText = `${
    selectedCryptoPut.name
  }: ${selectedCryptoPut.price.toFixed(2)} ₽`;
  selectPuts.textContent = selectedCryptoPut.name;
  heroIconPut.src = selectedCryptoPut.image;
  updateCurrencyPutText(selectedCryptoPut.name);

  cryptos.forEach((crypto, index) => {
    const li = document.createElement("li");
    li.classList.add("hero__dropdown-item");

    const icon = document.createElement("div");
    icon.classList.add("icon");
    const img = document.createElement("img");
    img.src = crypto.image;
    img.alt = crypto.name;
    icon.appendChild(img);

    const currency = document.createElement("div");
    currency.classList.add("hero__dropdown-cur");
    currency.textContent = crypto.name;

    li.appendChild(icon);
    li.appendChild(currency);

    li.addEventListener("click", () => {
      selectedCryptoPut = crypto;
      curencyPrice.innerText = `${crypto.name}: ${crypto.price.toFixed(2)} ₽`;
      selectPuts.textContent = crypto.name;
      heroIconPut.src = crypto.image;
      updateCurrencyPutText(crypto.name);

      currencyInputPut.value = "";
      currencyInputSell.value = "";
    });

    cryptoList.appendChild(li);

    if (index === 0) {
      li.classList.add("active");
    }
  });

  currencyInputPut.value = "300";
  currencyInputPut.dispatchEvent(new Event("input"));
}

currencyInputPut.addEventListener("input", () => {
  const amount = parseFloat(currencyInputPut.value);
  if (!isNaN(amount) && amount > 0) {
    const result = amount * selectedCryptoPut.price;
    currencyInputSell.value = result.toFixed(2);
  } else {
    currencyInputSell.value = "";
  }
});

currencyInputSell.addEventListener("input", () => {
  const amount = parseFloat(currencyInputSell.value);
  if (!isNaN(amount) && amount > 0) {
    const result = amount / selectedCryptoPut.price;
    currencyInputPut.value = result.toFixed(2);
  } else {
    currencyInputPut.value = "";
  }
});

document.addEventListener("DOMContentLoaded", updateCryptoList);

const changeSellContainer = document.querySelector(".hero__change-sell");

if (changeSellContainer) {
  const sellIcon = changeSellContainer.querySelector(".hero__icon-sell img");
  const sellList = changeSellContainer.querySelector(".hero__dropdown-sell");
  const heroSelectSell = document.querySelector(".hero__select-sell");

  const cryptosForSell = [
    { name: "VISA/MASTERCARD RUB", image: "./images/card.svg" },
    { name: "Райффайзен RUB", image: "./images/b1.png" },
    { name: "Сбербанк RUB", image: "./images/b7.png" },
    { name: "ТКС cash-in RUB", image: "./images/b2.png" },
    { name: "СБП RUB", image: "./images/b3.webp" },
    { name: "ВТБ RUB", image: "./images/b4.png" },
    { name: "Альфа-Банк RUB", image: "./images/b5.svg" },
    { name: "Тинькофф RUB", image: "./images/b6.png" },
    { name: "Наличные USD", image: "./images/наличные.png" },
    { name: "Наличные EUR", image: "./images/eur.png" },
  ];

  let selectedCryptoSell = cryptosForSell[0];

  function updateCryptoSellList() {
    sellList.innerHTML = "";

    cryptosForSell.forEach((crypto, index) => {
      const li = document.createElement("li");
      li.classList.add("hero__dropdown-item");

      const icon = document.createElement("div");
      icon.classList.add("icon");

      const img = document.createElement("img");
      img.src = crypto.image;
      img.alt = crypto.name;
      icon.appendChild(img);

      const currency = document.createElement("div");
      currency.classList.add("hero__dropdown-cur");
      currency.textContent = crypto.name;

      li.appendChild(icon);
      li.appendChild(currency);

      li.addEventListener("click", () => {
        selectedCryptoSell = crypto;
        sellIcon.src = crypto.image;
        sellIcon.alt = crypto.name;
        heroSelectSell.textContent = crypto.name;

        const selectedItem = changeSellContainer.querySelector(
          ".hero__select-item.active"
        );
        if (selectedItem) {
          selectedItem.textContent = crypto.name;
          const icon = selectedItem.querySelector(".svg-icon img");
          if (icon) {
            icon.src = crypto.image;
            icon.alt = crypto.name;
          } else {
            const newIcon = document.createElement("img");
            newIcon.src = crypto.image;
            newIcon.alt = crypto.name;
            selectedItem.querySelector(".svg-icon").appendChild(newIcon);
          }
        }
      });

      sellList.appendChild(li);

      if (index === 0) {
        li.classList.add("active");
        sellIcon.src = crypto.image;
        sellIcon.alt = crypto.name;
        heroSelectSell.textContent = crypto.name;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", updateCryptoSellList);
}

//

