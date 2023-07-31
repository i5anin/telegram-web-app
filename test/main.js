document.addEventListener("DOMContentLoaded", () => {
  updateView();
});

let buttonClicks = [];
let i = 0;
let day = "";
let month = "";
let year = "";

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
  if (inputText.length === 0) {
    return "DD.MM.YYYY";
  } else if (inputText.length === 1) {
    return `${inputText}.MM.YYYY`;
  } else if (inputText.length === 2) {
    return `${inputText}.MM.YYYY`;
  } else if (inputText.length === 3) {
    return `${inputText.slice(0, 2)}.${inputText[2]}.YYYY`;
  } else if (inputText.length === 4) {
    return `${inputText.slice(0, 2)}.${inputText.slice(2, 4)}.YYYY`;
  } else if (inputText.length === 5) {
    return `${inputText.slice(0, 2)}.${inputText.slice(2, 4)}.${inputText[4]}`;
  }
}

function helpButtonClick() {
  window.location.href = `https://github.com/i5anin/telegram-web-app`;
}

function search() {
  const formattedDate = `${day}.${month}.${year}`;
  document.getElementById("view").textContent = formattedDate; // Отображаем дату
  window.location.href = `https://t.me/geopricebot?start=${formattedDate.replace(
    /\./g,
    "-"
  )}`; // Передаем дату в нужном формате
  updateView(); // Move the updateView() call here
}

function deleteButtonClick() {
  i--;
  console.log(buttonClicks);
  buttonClicks.pop();
  updateView();
  updateDateVariables();
}

function recordButtonClick(buttonNumber) {
  i++;
  console.log(buttonClicks);
  buttonClicks.push(buttonNumber);
  updateView();

  if (i === 2) {
    day = buttonClicks.join("");
  } else if (i === 4) {
    month = buttonClicks.slice(2).join("");
  } else if (i === 6) {
    year = buttonClicks.slice(4).join("");
    updateDateVariables();
    search();
    i = 0;
    buttonClicks = [];
  }
}

function updateDateVariables() {
  if (year >= 0 && year <= 50) {
    year = `20${year}`;
  } else if (year > 50 && year <= 99) {
    year = `19${year}`;
  }
}
