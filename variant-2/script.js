const rates = { sofa: 2500, mattress: 1500, carpet: 450, chair: 500 };
const dirtLevels = [
  { label: 'Лёгкое', multiplier: 1 },
  { label: 'Среднее', multiplier: 1.25 },
  { label: 'Сильное', multiplier: 1.5 },
];
const formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});
const calculator = document.querySelector('#calculator');
const service = document.querySelector('#service');
const quantity = document.querySelector('#quantity');
const quantityLabel = document.querySelector('#quantity-label');
const dirt = document.querySelector('#dirt');
const dirtLabel = document.querySelector('#dirt-label');
const price = document.querySelector('#price');

function updateEstimate() {
  const level = dirtLevels[dirt.valueAsNumber];
  quantityLabel.textContent = service.value === 'carpet' ? 'Площадь, м²' : 'Количество, шт.';
  dirtLabel.value = level.label;
  dirt.setAttribute('aria-valuetext', level.label);
  price.value = quantity.validity.valid
    ? formatter.format(rates[service.value] * quantity.valueAsNumber * level.multiplier)
    : 'Укажи число от 1 до 999';
}
calculator.addEventListener('input', updateEstimate);
calculator.addEventListener('submit', (event) => event.preventDefault());
document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    service.value = link.dataset.service;
    updateEstimate();
  });
});
updateEstimate();

const comparison = document.querySelector('#comparison');
const compareRange = document.querySelector('#compare-range');
function updateComparison() {
  comparison.style.setProperty('--split', `${compareRange.value}%`);
  compareRange.setAttribute('aria-valuetext', `${compareRange.value}%`);
}
compareRange.addEventListener('input', updateComparison);
updateComparison();

const requestForm = document.querySelector('#request-form');
const formStatus = document.querySelector('#form-status');
requestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = 'Форма заполнена. Данные не отправлены.';
});
requestForm.addEventListener('input', () => {
  formStatus.textContent = '';
});
