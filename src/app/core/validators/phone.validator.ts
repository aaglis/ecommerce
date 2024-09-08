import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function brazilianPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phone = control.value;
    console.log("Valor do telefone:", phone);

    const phoneRegex = /^\(\d{2}\)\s\d\s\d{4}-\d{4}$/;


    console.log("Resultado do teste:", phoneRegex.test(phone));

    if (phone && !phoneRegex.test(phone)) {
      return { phoneInvalid: true };
    }
    return null;
  };
}
