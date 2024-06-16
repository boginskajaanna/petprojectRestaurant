//ПОДРУЗКА ЭЛЕМЕНТОВ POPULAR DISHES по клику на SEE ALL 
let allItemsVisible = false;

// Функция для обновления видимых элементов в зависимости от текущего размера экрана
function updateVisibleItems() {
  const dishList = document.querySelector(".popular__dish-list");
  const dishItems = Array.from(dishList.children);
  const columns = getNumberOfColumns();

  // Определяем количество элементов, которые должны быть видимыми по умолчанию
  const defaultVisibleItems = columns;

  if (!allItemsVisible) {
    // Скрываем все элементы и показываем только необходимое количество
    dishItems.forEach((item, index) => {
      if (index < defaultVisibleItems) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });

    // Показываем кнопку "See all dishes", если есть скрытые элементы
    const button = document.querySelector("#seeAllDishes");
    if (dishItems.length > defaultVisibleItems) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  }
}

// Функция для показа всех элементов по клику на кнопку "See all dishes"
function showAllItems() {
  const hiddenItems = document.querySelectorAll(".popular__dish-item.hidden");

  console.log("Button clicked, showing all items");

  // Показываем все скрытые элементы
  hiddenItems.forEach((item) => {
    item.classList.remove("hidden");
  });

  // Скрываем кнопку "See all dishes"
  document.querySelector("#seeAllDishes").style.display = "none";

  // Устанавливаем флаг, что все элементы видны
  allItemsVisible = true;
}

// Функция для определения количества колонок в текущем макете
function getNumberOfColumns() {
  const width = window.innerWidth;
  if (width <= 620) {
    return 2; // 2 колонки для ширины экрана до 620px
  } else if (width <= 910) {
    return 3; // 3 колонки для ширины экрана от 621px до 910px
  } else {
    return 4; // 4 колонки для ширины экрана больше 910px
  }
}

// Обновляем видимые элементы при загрузке страницы и изменении размера окна
window.addEventListener("load", updateVisibleItems);
window.addEventListener("resize", updateVisibleItems);

// Обработчик для кнопки "See all dishes"
document.querySelector("#seeAllDishes").addEventListener("click", showAllItems);
