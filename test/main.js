document.addEventListener("DOMContentLoaded", () => {
  updateView();
  document.addEventListener("keydown", handleKeyDown);
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

  const inputLength = inputText.length;
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    const buttonNumber = Number(button.textContent);

    if (inputLength === 0) {
      button.disabled = buttonNumber > 3;
    } else if (inputLength === 1) {
      button.disabled = false;
      if (buttonClicks[0] === 3) {
        button.disabled = buttonNumber > 1;
      }
    } else if (inputLength === 2) {
      button.disabled = buttonNumber > 1;
    } else if (inputLength === 3) {
      button.disabled = false;
      if (buttonClicks[2] === 1) {
        button.disabled = buttonNumber > 2;
      }
    } else if (inputLength === 4 || inputLength === 5) {
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
  document.getElementById("view").textContent = formattedDate;
  window.location.href = `https://t.me/geopricebot?start=${formattedDate.replace(
    /\./g,
    "-"
  )}`;
  updateView();
}

function deleteButtonClick() {
  i--;
  buttonClicks.pop();
  updateView();
  updateDateVariables();
}

function recordButtonClick(buttonNumber) {
  i++;
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

function handleKeyDown(event) {
  const key = event.key;
  if (/[0-9]/.test(key)) {
    recordButtonClick(Number(key));
  } else if (key === "Backspace") {
    deleteButtonClick();
  }
}

function pasteFromClipboard() {
  navigator.clipboard
    .readText()
    .then((text) => {
      const validDigits = text.replace(/[^\d]/g, ""); // Удаление нечисловых символов
      if (validDigits.length <= 8) {
        for (const char of validDigits) {
          recordButtonClick(Number(char));
        }
      }
    })
    .catch((error) => {
      console.error("Failed to read clipboard: ", error);
    });
}
