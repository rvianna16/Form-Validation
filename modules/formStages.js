import { validateField } from './validateField.js';

export default function formStage() {
  const nextButton = document.getElementById('next'),
    prevButton = document.getElementById('prev'),
    forms = document.querySelectorAll('form');

  let stage = 0,
    actualStageBar = null;

  nextButton.addEventListener('click', nextStage);
  prevButton.addEventListener('click', prevStage);

  function nextStage() {
    validateForm();

    if (stage < 2 && !forms[stage].classList.contains('invalid')) {
      stage++;
    }

    showForm(stage);

    actualStageBar = document.querySelector(`.${forms[stage].id}`);
    actualStageBar.classList.remove('disabled');
  }

  function prevStage() {
    actualStageBar = document.querySelector(`.${forms[stage].id}`);
    actualStageBar.classList.add('disabled');

    stage--;
    showForm(stage);
  }

  function showForm(stage) {
    forms.forEach((form) => {
      form.classList.add('d-none');
    });
    forms[stage].classList.remove('d-none');
    checkStage();
  }

  function checkStage() {
    if (stage >= 1) {
      prevButton.classList.remove('d-none');
    } else {
      prevButton.classList.add('d-none');
    }

    if (stage === 2) {
      nextButton.innerText = 'Finalizar Cadastro';
    } else {
      nextButton.innerText = 'Proxima Etapa';
    }
  }

  // validate fields on input
  const allFields = document.querySelectorAll('input');
  allFields.forEach((field) => {
    field.addEventListener('input', () => {
      validateField(field);
    });
  });

  function validateForm() {
    const forms = document.querySelectorAll('form'),
      fields = forms[stage].querySelectorAll('input');

    fields.forEach((field) => {
      validateField(field);
    });

    const fieldsInvalid = forms[stage].querySelectorAll('.invalid');

    if (fieldsInvalid.length >= 1) {
      forms[stage].classList.add('invalid');
    } else {
      forms[stage].classList.remove('invalid');
    }
  }
}
