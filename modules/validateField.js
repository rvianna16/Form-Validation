export function validateField(field) {
  if (field.value.trim() === '' && field.hasAttribute('required')) {
    setErrorFor(field, field.validationMessage);
  } else {
    if (field.id === 'inputName' || field.id === 'inputLastName') {
      const regexName = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;

      if (!regexName.test(field.value)) {
        setErrorFor(field, 'Este campo deve conter apenas letras');
      } else {
        setSucessFor(field);
      }
    }

    if (field.id === 'inputMail') {
      const regexMail =
        /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

      if (!regexMail.test(field.value)) {
        setErrorFor(field, 'O e-mail informado está em um formato incorreto.');
      } else {
        setSucessFor(field);
      }
    }

    if (field.id === 'inputDate') {
      const actualYear = new Date().getFullYear();
      const year = +field.value.substring(0, 4);

      if (year > actualYear || year < 1900 || field.value.length >= 11) {
        setErrorFor(field, 'A data informada está inválida');
      } else if (actualYear - year <= 17) {
        setErrorFor(field, 'Você deve ter no mínimo 18 anos.');
      } else {
        setSucessFor(field);
      }
    }

    if (field.id === 'inputId') {
      const regexId = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;

      // id mask
      if (isNaN(field.value[field.value.length - 1])) {
        field.value = field.value.substring(0, field.value.length - 1);
      } else if (field.value.length == 3 || field.value.length == 7) {
        field.value += '.';
      } else if (field.value.length == 11) {
        field.value += '-';
      }

      //regex
      if (!regexId.test(field.value)) {
        setErrorFor(field, 'O CPF informado é inválido');
      } else {
        setSucessFor(field);
      }
    }

    if (field.id === 'inputPhone' || field.id === 'inputPhone2') {
      const regexPhone =
        /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/gm;

      //phone mask
      if (isNaN(field.value[field.value.length - 1])) {
        field.value = field.value.substring(0, field.value.length - 1);
      } else if (field.value.length > 11) {
        field.value = field.value.replace(
          /^(\d\d)(\d{5})(\d{4}).*/,
          '($1) $2-$3'
        );
      } else if (field.value.length > 7) {
        field.value = field.value.replace(
          /^(\d\d)(\d{5})(\d{0,4}).*/,
          '($1) $2-$3'
        );
      }

      //regex
      if (!regexPhone.test(field.value)) {
        setErrorFor(field, 'O telefone informado é inválido');
      } else {
        setSucessFor(field);
      }
    }

    if (field.id === 'inputCep') {
      const formAddress = field.closest('form');

      // cep mask
      if (isNaN(field.value[field.value.length - 1])) {
        field.value = field.value.substring(0, field.value.length - 1);
      } else if (field.value.length === 8 && field.value.indexOf('-') === -1) {
        field.value = `${field.value.substr(0, 5)}-${field.value.substr(5, 9)}`;
      }

      if (field.value.length < 9) {
        setErrorFor(field, 'CEP inválido');
      } else {
        fetch(`https://viacep.com.br/ws/${field.value}/json/`)
          .then((response) => response.json())
          .then((cep) => {
            if (cep.erro) {
              setErrorFor(field, 'CEP não encontrado');
              formAddress.inputAddress.value = '';
              formAddress.inputDistrict.value = '';
              formAddress.inputCity.value = '';
              formAddress.inputState.value = '';
            } else {
              setSucessFor(field);
              formAddress.inputAddress.value = cep.logradouro;
              formAddress.inputDistrict.value = cep.bairro;
              formAddress.inputCity.value = cep.localidade;
              formAddress.inputState.value = cep.uf;
            }
          });
      }
    }

    if (field.id === 'inputUser') {
      if (field.value.length >= 12) {
        setErrorFor(
          field,
          'O nome de usuário deve ter no máximo 12 caracteres.'
        );
      } else {
        setSucessFor(field);
      }
    }

    if (field.id === 'inputPass') {
      const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;

      if (!regexPass.test(field.value)) {
        setErrorFor(
          field,
          'A senha deve conter no mínimo 8 caracteres, digitos, letra maíuscula e minścula.'
        );
      } else {
        setSucessFor(field);
      }
    }

    if (field.id === 'inputPass2') {
      const password = document.querySelector('#inputPass').value;
      if (field.value != password) {
        setErrorFor(field, 'A senha não confere com a digitada anteriormente.');
      } else {
        setSucessFor(field);
      }
    }
  }

  if (field.value.trim() === '' && !field.hasAttribute('required')) {
    setSucessFor(field);
  }
}

function setErrorFor(field, message) {
  field.classList.add('invalid');
  field.nextElementSibling.innerText = message;
}

function setSucessFor(field) {
  field.classList.remove('invalid');
  field.nextElementSibling.innerText = null;
}
