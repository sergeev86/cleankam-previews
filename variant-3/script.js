const maxChatUrl = '';
const rates = { sofa: 2500, corner: 3200, 'u-sofa': 4000, chair: 500, armchair: 1500, ottoman: 600, mattress: 1500, kitchen: 1800, carpet: 450 };
const examplePhotos = {
  sofa: ['sofa-cleaning-master.jpg', 'Пример химчистки дивана'],
  mattress: ['mattress-drying.jpg', 'Матрас и оборудование для сушки'],
  chair: ['chairs-and-equipment.jpg', 'Стулья и оборудование для химчистки'],
  carpet: ['carpet-cleaning.jpg', 'Пример чистки ковра'],
};
const dirtLevels = [
  { label: 'Лёгкое', multiplier: 1 },
  { label: 'Среднее', multiplier: 1.25 },
  { label: 'Сильное', multiplier: 1.5 },
];
const money = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });
const estimate = document.querySelector('#estimate-form');
const services = estimate.elements.service;
const quantity = document.querySelector('#quantity');
const quantityLabel = document.querySelector('#quantity-label');
const dirt = document.querySelector('#dirt');
const dirtLabel = document.querySelector('#dirt-label');
const price = document.querySelector('#price');
const message = document.querySelector('#message');
const estimateImage = document.querySelector('#estimate-image');
const copyStatus = document.querySelector('#copy-status');
let messageEdited = false;

function updateEstimate() {
  const level = dirtLevels[dirt.valueAsNumber];
  const isCarpet = services.value === 'carpet';
  const [photo, description] = examplePhotos[services.value] ?? examplePhotos.sofa;
  const photoPath = `images/${photo}`;
  if (estimateImage.getAttribute('src') !== photoPath) {
    estimateImage.src = photoPath;
    estimateImage.alt = description;
  }
  quantityLabel.textContent = isCarpet ? 'Площадь, м²' : 'Количество, шт.';
  quantity.step = isCarpet ? 'any' : '1';
  dirtLabel.value = level.label;
  dirt.setAttribute('aria-valuetext', level.label);
  price.value = quantity.validity.valid
    ? money.format(rates[services.value] * quantity.valueAsNumber * level.multiplier)
    : 'Укажите значение от 1 до 999';
  if (!messageEdited) {
    const item = Array.from(services).find((option) => option.checked).nextElementSibling.textContent;
    const amount = quantity.validity.valid ? ` ${quantity.value} ${isCarpet ? 'м²' : 'шт.'}.` : '';
    message.value = `Здравствуйте! Подскажите стоимость химчистки. ${item}.${amount} Загрязнение: ${level.label.toLowerCase()}. Фото приложу.`;
  }
}
estimate.addEventListener('input', updateEstimate);
estimate.addEventListener('submit', (event) => event.preventDefault());
document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    services.value = link.dataset.service;
    updateEstimate();
  });
});
updateEstimate();

const comparison = document.querySelector('#comparison');
const compare = document.querySelector('#compare');
function updateComparison() {
  comparison.style.setProperty('--split', `${compare.value}%`);
  compare.setAttribute('aria-valuetext', `${compare.value}%`);
}
compare.addEventListener('input', updateComparison);
updateComparison();

if (maxChatUrl) {
  const maxLink = document.querySelector('#max-link');
  maxLink.href = maxChatUrl;
  maxLink.hidden = false;
  document.querySelector('#max-note').hidden = true;
}
message.addEventListener('input', () => {
  messageEdited = true;
  copyStatus.textContent = '';
});
document.querySelector('#copy-message').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(message.value);
    copyStatus.textContent = 'Сообщение скопировано.';
  } catch {
    message.focus();
    message.select();
    copyStatus.textContent = 'Текст выделен. Скопируйте его сочетанием клавиш.';
  }
});
