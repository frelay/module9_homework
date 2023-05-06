// Задание 5
// Получаем элементы
const firstInput = document.querySelector(".main-form__input_first");
const secondInput = document.querySelector(".main-form__input_second");
const btn = document.querySelector(".main-form__btn");
const resultNode = document.querySelector(".result");
const labelPage = document.querySelector(".main-form__label_page");
const labelLimit = document.querySelector(".main-form__label_limit");

// Функция проверки инпута
function checkInput(input) {
    return input.value < 1 || input.value > 10 || isNaN(input.value);
}

// Функция рендер
function displayResult(apiData) {
    let cards = "";

    apiData.forEach((item) => {
        const cardBlock = `
        <div class="result__card">
            <img src="${item.download_url}" class="result__img"/>            
        </div>`;

        cards = cards + cardBlock;
    });

    resultNode.innerHTML = cards;
}

// Функция для fetch запроса
function useRequest(pageNum, limitNum) {
    fetch(`https://picsum.photos/v2/list?page=${pageNum}&limit=${limitNum}`)
        .then((response) => {
            // console.log(response);
            return response.json();
        })
        .then((json) => {
            // console.log(json);
            displayResult(json);
            // Кладём в localStorage полученный JSON
            localStorage.setItem("myJSON", JSON.stringify(json));
        })
        .catch((err) => err);
}

// Проверяем localStorage
const myJSON = localStorage.getItem("myJSON");

// Если в localStorage что то есть, то рисуем по данным из localStorage
if (myJSON) {
    displayResult(JSON.parse(myJSON));
}

// Обработчик для кнопки
btn.addEventListener("click", async () => {
    const inputError = document.querySelectorAll(".main-form__input-error");
    let pageNum, limitNum;

    if (inputError) {
        inputError.forEach((item) => {
            item.remove();
        });
    }

    // Проверка обоих инпутов
    if (checkInput(firstInput) && checkInput(secondInput)) {
        btn.insertAdjacentHTML(
            "beforebegin",
            '<p class="main-form__input-error">Номер страницы и лимит вне диапазона от 1 до 10</p>'
        );
    } else {
        // Проверка первого инпута
        if (checkInput(firstInput)) {
            labelPage.insertAdjacentHTML(
                "afterend",
                '<p class="main-form__input-error">Номер страницы вне диапазона от 1 до 10</p>'
            );
        } else {
            pageNum = firstInput.value;
        }

        // Проверка второго инпута
        if (checkInput(secondInput)) {
            labelLimit.insertAdjacentHTML(
                "afterend",
                '<p class="main-form__input-error">Лимит вне диапазона от 1 до 10</p>'
            );
        } else {
            limitNum = secondInput.value;
        }

        // Если все ОК, то отправляем запрос
        if (pageNum && limitNum) {
            await useRequest(pageNum, limitNum);
        }
    }
});
