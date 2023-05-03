// Задание 4
// Получаем элементы
const firstInput = document.querySelector(".main-form__input_first");
const secondInput = document.querySelector(".main-form__input_second");
const btn = document.querySelector(".main-form__btn");
const resultNode = document.querySelector(".result");

// Функция рисует в HTML
const displayHTML = (url) => {
    const resultIMG = `<img src="${url}" alt="Результат" class="result__img">`;
    resultNode.innerHTML = resultIMG;
};

// Функция для fetch запроса
const useRequest = (firstInput, secondInput) => {
    fetch(`https://picsum.photos/${firstInput}/${secondInput}`)
        .then((response) => {
            // console.log(response.url);
            return response.url;
        })
        .then((url) => {
            displayHTML(url);
        })
        .catch((err) => console.log(err));
};

// Обработчик для кнопки
btn.addEventListener("click", async () => {
    if (
        firstInput.value >= 100 &&
        firstInput.value <= 300 &&
        secondInput.value >= 100 &&
        secondInput.value <= 300
    ) {
        // fetch запрос
        // console.log(firstInput.value, secondInput.value);
        const requestResult = await useRequest(
            firstInput.value,
            secondInput.value
        );
    } else {
        resultNode.innerHTML = `<p class="result__error">Одно из чисел вне диапазона от 100 до 300!</p>`;
    }
});
