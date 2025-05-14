import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomTextboxComponent } from "../../custom-elements/custom-textbox/custom-textbox.component";
import { CustomFontComponent } from "../../custom-elements/custom-font/custom-font.component";
import { CONVERSION_MAP } from '../../custom-elements/custom-font/font-mapping';

const nameOffset: number = 0x00;
const costOffset: number = 0x08;
const descOffset: number = 0x0A;
const elemOffset: number = 0x0C;
const specOffset: number = 0x0D;
const othrOffset: number = 0x0E;
const moodOffset: number = 0X0F;

@Component({
  selector: 'app-spell-component',
  imports: [CustomTextboxComponent, CustomFontComponent, FormsModule],
  templateUrl: './spell-component.component.html',
  styleUrl: './spell-component.component.css',
})
export class SpellComponentComponent {
  @Input() spellData: Uint8Array = new Uint8Array();
  @Output() save = new EventEmitter();

  index: number = 1; //Keeps track of which spell is displayed
  increment: number = 0x10; //Spell size, multiplied by index to find the offset
  indexMin: number = 1; //The minimum the index is allowed, set at 1 because slot 0 is dummy
  indexMax: number = 0x53; //The number of spells, max index

  spellName: string = ''; //The spellName, 0x00 to 0x07
  spellCost: number = 0; //Cost of the spell, 0x09 to 0x0A
  beneficial: boolean = false; //If this spell is beneficial, High bit of 0x0A
  descPointer: number = 0; //The description pointer when read from the game script, lowest 7 bits of 0x0A and all of 0x0B
  spellDescription: string = ''; //The actual desciription from the ROM. This is not editiable without recompressing the data
  spellElements: number = 0; //Which elements this belongs to, 8 elements 1 bit each, byte 0x0C
  specBits: number = 0; //Some bits to change the spell behaviour, 8 switches 1 bit each, byte 0x0D
  otherBits: number = 0; //More bits, 8 switches 1 bit each, byte 0x0E
  moodCheck: number = 0; //When the bigh bit of 0x0E is checked, this value is checked against caster's mood and is unavailable if it fails.

  modifiedData: Uint8Array = new Uint8Array();

  ngOnInit(): void {
    this.modifiedData = new Uint8Array(this?.spellData);
    this.changeIndex();
  }

  incrementIndex() {
    if (this.index < this.indexMax) {
      this.index++;
      this.changeIndex();
    }
  }

  decrementIndex() {
    if (this.index > this.indexMin) {
      this.index--;
      this.changeIndex();
    }
  }

  changeIndex() {
    if (this.modifiedData.length === 0) {
      return;
    }
    //Spell Name
    const offset = this.index * this.increment;
    const spell = this.modifiedData.slice(offset, offset + this.increment);
    const nameArray = spell.slice(0, 8)
      .map(code => CONVERSION_MAP[code] ? CONVERSION_MAP[code] : code)
      .filter(code => code !== 0x00);
    const spellName = String.fromCharCode(...Array.from(nameArray));
    this.spellName = spellName;

    //Spell Cost
    let lowerByte = spell.at(8);
    let upperByte = spell.at(9);
    let spellCost = 0;
    if (lowerByte) spellCost = lowerByte;
    if (upperByte) spellCost += (upperByte << 8);
    this.spellCost = spellCost;

    //Descript pointer (For now)
    let descPointer = 0;
    lowerByte = spell.at(10);
    upperByte = spell.at(11);
    if (lowerByte) descPointer = lowerByte;
    if (upperByte) descPointer += ((upperByte & 0x7F) << 8);
    this.descPointer = descPointer;
  }

  modifySpell(index: number, offset: number, value: number) {

  }
}
