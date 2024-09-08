import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export function cepValidator(http: HttpClient): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const cep = control.value;
    const streetName = control.parent?.get('streetName');
    const city = control.parent?.get('city');
    const neighborhood = control.parent?.get('neighborhood');
    const state = control.parent?.get('state');

    // Remove o hífen do CEP, se houver
    const cepWithoutHyphen = cep.replace('-', '');

    // Verifica se o valor do CEP é válido
    if (!cepWithoutHyphen || cepWithoutHyphen.length !== 8) {
      return of(null); // Se o CEP não estiver completo, não faz a validação
    }

    // Regex para verificar se o formato do CEP está correto
    const cepRegex = /^\d{8}$/;
    if (!cepRegex.test(cepWithoutHyphen)) {
      return of({ cepInvalid: true });
    }

    // Faz a requisição à API ViaCEP
    return http.get(`https://viacep.com.br/ws/${cepWithoutHyphen}/json/`).pipe(
      map((response: any) => {
        // Se o retorno não contiver erro, o CEP é válido
        if (response.erro) {
          return { cepInvalid: true };
        } else {
          streetName?.setValue(response.logradouro);
          city?.setValue(response.localidade);
          neighborhood?.setValue(response.bairro);
          state?.setValue(response.uf);
          return null;
        }
        return null;
      }),
      catchError(() => of({ cepInvalid: true })) // Em caso de erro na requisição, considera o CEP como inválido
    );
  };
}
