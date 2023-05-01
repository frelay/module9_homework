// Задание 3
// Функция для обработки запроса
function useRequest(url, callback) {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log(`Статус ответа: ${xhr.status}`);
        } else {
            const result = JSON.parse(xhr.response);

            if (callback) {
                callback(result);
            }
        }
    };

    xhr.onerror = function () {
        console.log(`Ошибка! Статус ответа: ${xhr.status}`);
    };

    xhr.send();
}

// Получаем элементы
const btn = document.querySelector(".main-form__btn");
const input = document.querySelector(".main-form__input");
const cardsNode = document.querySelector(".cards");
const body = document.querySelector("body");

// Функция рендер
function displayResult(apiData) {
    let cards = "";

    apiData.forEach((item) => {
        const cardBlock = `
        <div class="cards__card">
            <img src="${item.download_url}" class="cards__img"/>
            <p class="cards__text">${item.author}</p>
        </div>`;

        cards = cards + cardBlock;
    });

    cardsNode.innerHTML = cards;
}

// Обработчик для кнопки
btn.addEventListener("click", () => {
    if (input.value >= 1 && input.value <= 10) {
        useRequest(
            `https://picsum.photos/v2/list?limit=${input.value}`,
            displayResult
        );
    } else {
        const errorBlock =
            "<p class='cards__error-text'>Введите число от 1 до 10!</p>";

        cardsNode.innerHTML = errorBlock;
    }
});
