const form = document.querySelector('#demo-form');
const photos = document.querySelector('#photos');
const files = document.querySelector('#files');
const status = document.querySelector('#status');
const submit = document.querySelector('#demo-submit');

function onImageError(image, fallback) {
  if (image.complete && !image.naturalWidth) {
    fallback();
    return;
  }
  image.addEventListener('error', fallback, { once: true });
}

const heroPhoto = document.querySelector('#hero-photo');
onImageError(heroPhoto, () => {
  heroPhoto.src = 'images/sofa-cleaning.jpg';
  heroPhoto.alt = 'Химчистка светлого дивана крупным планом';
  document.querySelector('#hero-caption').textContent = 'Химчистка в процессе · кадр CleanKam34';
});

function showDemoStatus(event) {
  event.preventDefault();
  status.textContent = 'Поля заполнены. Заявка не отправлена.';
}

form.addEventListener('submit', showDemoStatus);
form.addEventListener('input', () => {
  status.textContent = '';
});
submit.disabled = false;

photos.addEventListener('change', () => {
  files.textContent = Array.from(photos.files, (file) => file.name).join(', ');
});

document.querySelectorAll('.service-list img, .process-steps img, .request-visual img').forEach((image) => {
  onImageError(image, () => {
    const frame = image.closest('.request-visual, .extractor-frame');
    if (frame) {
      frame.hidden = true;
    } else {
      image.hidden = true;
    }
  });
});
