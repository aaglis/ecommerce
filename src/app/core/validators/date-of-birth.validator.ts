import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateOfBirthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dateOfBirth = control.value;

    // Regex para o formato dd/mm/aaaa
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

    // Verifica se o formato da data está correto
    if (dateOfBirth && !dateRegex.test(dateOfBirth)) {
      return { dateInvalid: true };
    }

    if (dateOfBirth) {
      const [day, month, year] = dateOfBirth.split('/').map(Number);

      // Cria uma data com os valores fornecidos
      const date = new Date(year, month - 1, day);
      const today = new Date();

      // Define a data mínima como 1 de janeiro de 1900 (opcional)
      const minDate = new Date(1900, 0, 1);

      // Verifica se os valores fornecidos correspondem à data criada e se a data está no passado
      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day ||
        date > today ||
        date < minDate
      ) {
        console.log('Data inválida' + date);
        return { dateInvalid: true };
      }
    }

    return null;
  };
}
