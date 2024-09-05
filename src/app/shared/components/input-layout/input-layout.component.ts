import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

type inputType = 'text' | 'email' | 'password';

@Component({
  selector: 'app-input-layout',
  standalone: true,
  imports: [ ReactiveFormsModule,  NgxMaskDirective, NgxMaskPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputLayoutComponent),
      multi: true
    }
  ],
  templateUrl: './input-layout.component.html',
  styleUrl: './input-layout.component.scss'
})
export class InputLayoutComponent implements ControlValueAccessor {
  @Input() type: inputType = 'text';
  @Input() placeholder: string = '';
  @Input() inputName: string = "";
  @Input() mask: string = '';

  value: string = ''
  isFocused: boolean = false

  onChange: any = () => {}
  onTouched: any = () => {}

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value
    this.value = value
    this.onChange(value)
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }

  writeValue(value: any): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {}
}
