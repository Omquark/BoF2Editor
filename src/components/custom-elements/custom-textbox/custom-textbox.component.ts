import { AfterContentInit, Component, forwardRef, Input } from '@angular/core';
import { CustomFontComponent } from "../custom-font/custom-font.component";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-textbox',
  imports: [CustomFontComponent, FormsModule],
  templateUrl: './custom-textbox.component.html',
  styleUrl: './custom-textbox.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomTextboxComponent),
      multi: true,
    }
  ]
})
export class CustomTextboxComponent implements ControlValueAccessor {
  @Input() id: string = '';
  @Input() labelName: string = '';
  @Input() defaultValue: string = '';
  @Input() name: string = '';
  @Input() text: string = '';
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
  @Input() maxLength: number = 8;

  private onChange = (value: string) => { };
  private onTouched = () => { };

  writeValue(value: string) {
    this.text = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  updateText(event: any) {
    this.text = event.target.value;
  }

  sanitizeText(event: any) {
    const charCode = event.key ? event.key : '';
    let validRegex;
    switch (this.type.toUpperCase()) {
      case ('NUMBER'): {
        validRegex = /[0-9]+/g;
        break;
      }
      default: {
        validRegex = /[A-Za-z0-9,()!?:\'.% -]+/g;
        break;
      }
    }

    const isValid = validRegex.test(charCode);

    if (!isValid) {
      event.preventDefault();
    }
  }
}
