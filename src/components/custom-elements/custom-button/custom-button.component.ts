import { Component, ContentChild, EventEmitter, Output } from '@angular/core';
import { CustomFontComponent } from "../custom-font/custom-font.component";

@Component({
  selector: 'app-custom-button',
  imports: [CustomFontComponent],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.css'
})
export class CustomButtonComponent {
  @Output() onClick = new EventEmitter<void>();
  @ContentChild('imageContent') content: any;

  buttonClicked() {
    this.onClick.emit();
  }
}
