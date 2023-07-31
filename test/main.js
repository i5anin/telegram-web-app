document.addEventListener("DOMContentLoaded", () => {
  updateView();
});

let buttonClicks = [];
let i = 0;

function updateView() {
  const inputText = buttonClicks.join("");
  const formattedText = formatAsDate(inputText);
  document.getElementById("view").textContent = formattedText;

  // Отключаем или включаем кнопки в зависимости от длины введенных данных
  const inputLength = inputText.length;
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    const buttonNumber = Number(button.textContent);

    // Логика кнопок при длине ввода 0
    if (inputLength === 0) {
      // Включаем кнопки 0-3
      button.disabled = buttonNumber > 3;
    }
    // Логика кнопок при длине ввода 1
    else if (inputLength === 1) {
      // Включаем все кнопки
      button.disabled = false;
      // Если предыдущий символ 3, то кнопки 4-9 становятся неактивными
      if (buttonClicks[0] === 3) {
        button.disabled = buttonNumber > 1;
      }
    }
    // Логика кнопок при длине ввода 2
    else if (inputLength === 2) {
      // Включаем кнопки 0-1
      button.disabled = buttonNumber > 1;
    }
    // Логика кнопок при длине ввода 3
    else if (inputLength === 3) {
      // Включаем все кнопки
      button.disabled = false;
      if (buttonClicks[2] === 1) {
        button.disabled = buttonNumber > 2;
      }
    }
    // Логика кнопок при длине ввода 4
    else if (inputLength === 4) {
      // Включаем все кнопки
      button.disabled = false;
    }
    // Логика кнопок при длине ввода 5
    else if (inputLength === 5) {
      // Включаем все кнопки
      button.disabled = false;
    }
  });
}

function formatAsDate(inputText) {
  if (inputText.length >= 2 && inputText.length <= 4) {
    const day = inputText.slice(0, 2);
    const month = inputText.slice(2, 4);
    return `${day}.${month}.`;
  } else if (inputText.length === 5) {
    const day = inputText.slice(0, 2);
    const month = inputText.slice(2, 4);
    const yearPrefix = inputText.slice(4, 5);
    let year;
    if (yearPrefix >= "7" && yearPrefix <= "9") {
      // Interpret years 70-99 as 19XX
      year = `19${inputText.slice(4)}`;
    } else {
      // Interpret years 00-69 as 20XX
      year = `20${inputText.slice(4)}`;
    }
    return `${day}.${month}.${year}`;
  } else {
    return inputText;
  }
}

function helpButtonClick() {
  window.location.href = `https://github.com/i5anin/telegram-web-app`;
}

function search() {
  const queryParam = buttonClicks.join("");
  updateView();
  window.location.href = `https://t.me/geopricebot?start=${queryParam}`;
}

function deleteButtonClick() {
  i--;
  console.log(buttonClicks);
  buttonClicks.pop();
  updateView();
}

function recordButtonClick(buttonNumber) {
  i++;
  console.log(buttonClicks);
  buttonClicks.push(buttonNumber);
  updateView();
  if (i === 6) {
    search();
    i = 0;
    buttonClicks = [];
  }
}
