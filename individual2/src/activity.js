import { getRandomActivity } from './index.js';
/**
 * Обновление активности на странице.
 */
async function updateActivity() {
    const activityElement = document.getElementById("activity");
    const activity = await getRandomActivity();
    activityElement.innerText = activity;
  }
  
/**
 * Запуск обновления активности каждую минуту.
 */
function startUpdatingActivity() {
    // Обновляем активность сразу
    updateActivity();
    // Запускаем таймер для обновления каждую минуту
    setInterval(updateActivity, 60000); // 60000 миллисекунд = 1 минута
  }
  
  // Запуск обновления активности при загрузке страницы
  document.addEventListener("DOMContentLoaded", startUpdatingActivity);