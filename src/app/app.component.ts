import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomButtonComponent } from "../components/custom-elements/custom-button/custom-button.component";
import { RomService } from '../service/rom/rom.service';
import { NgIf } from '@angular/common';
import { LucideAngularModule, Menu } from 'lucide-angular';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { CustomTextboxComponent } from "../components/custom-elements/custom-textbox/custom-textbox.component";
import { SpellComponentComponent } from "../components/composite-components/spell-component/spell-component.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomButtonComponent, NgIf, LucideAngularModule, AngularToastifyModule, CustomTextboxComponent, SpellComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef
  spellData: Uint8Array | undefined;
  title = 'bof2-editor';
  dataInit: boolean = false;
  state: string = '';
  menuShown: boolean = false;
  loading: boolean = true;

  readonly menuIcon = Menu;

  constructor(private romData: RomService, private eRef: ElementRef, private toastService: ToastService) {
    setTimeout(() => {
      if (romData.getRom()) {
        this.dataInit = true;
      }
      this.loading = false;
    }, 2000);
  }

  ngOnInit(): void {

  }

  showToast() {
    this.toastService.info('Hello World');
  }

  toggleMenu() {
    this.menuShown = !this.menuShown;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    if (this.menuShown && !this.eRef.nativeElement.contains(event.target)) {
      this.menuShown = false;
    }
  }

  openFileDialog() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          await this.romData.loadRom(new Uint8Array(e.target.result as ArrayBuffer));
          this.spellData = this.romData?.getRom()?.slice(0X584F0, 0X58A20); //Spell data. First slot is a dummy spell
        }
      };
      reader.readAsArrayBuffer(file);
      this.dataInit = true;
    }
  }

  changeState(state: string) {
    this.state = state;
  }
}
