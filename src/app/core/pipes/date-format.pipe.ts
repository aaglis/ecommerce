import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    // Remove todos os caracteres não numéricos
    let cleanedValue = value.replace(/\D/g, '');

    // Limita o tamanho da string a 8 caracteres (DDMMYYYY)
    if (cleanedValue.length > 8) {
      cleanedValue = cleanedValue.substring(0, 8);
    }

    // Adiciona as barras conforme o usuário digita
    if (cleanedValue.length > 2 && cleanedValue.length <= 4) {
      cleanedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
    } else if (cleanedValue.length > 4) {
      cleanedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}/${cleanedValue.slice(4)}`;
    }

    return cleanedValue;
  }

}
