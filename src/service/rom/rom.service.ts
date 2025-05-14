import { Injectable } from '@angular/core';
import { get, set } from 'idb-keyval';

@Injectable({
  providedIn: 'root'
})
export class RomService {

  private romData: Uint8Array | undefined = undefined;

  constructor() {
    this.loadRomFromIndexDB();
  }

  async loadRom(data: ArrayBuffer) {
    this.romData = new Uint8Array(data);
    await this.saveRomToIndexedDB();
  }

  async saveRomToIndexedDB() {
    try {
      if (this.romData) {
        await set('rom', this.romData);
      }
    } catch { }
  }

  async loadRomFromIndexDB() {
    try {
      const storedRom = await get<Uint8Array>('rom');
      if (storedRom) {
        this.romData = storedRom;
      }
    } catch { }
  }

  getRom(): Uint8Array | undefined {
    return this.romData;
  }

  readByte(offset: number): number | undefined {
    try {
      return this.romData ? this.romData[offset] : undefined;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  readWord(offset: number): number | undefined {
    try {
      let lower = this.readByte(offset);
      let upper = this.readByte(offset + 1);
      return lower !== undefined && upper !== undefined ? lower | (upper >> 8) : undefined;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  readDoubleWord(offset: number): number | undefined {
    try {
      let lower = this.readWord(offset);
      let upper = this.readWord(offset + 2);
      return lower !== undefined && upper !== undefined ? (lower | (upper >> 16)) : undefined;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  writeByte(offset: number, value: number) {
    try {
      if (this.romData) {
        this.romData[offset] = value & 0xFF;
      }
    } catch (err) {
      console.log(err);
      return;
    }
  }

  writeWord(offset: number, value: number) {
    let oldVal = this.readWord(offset);
    if (!oldVal) return;
    try {
      if (this.romData) {
        this.writeByte(offset, value & 0xFF);
        this.writeByte(offset + 1, (value & 0xFF00) << 8);
      }
    } catch (err) {
      this.writeByte(offset, oldVal & 0xFF);
      this.writeByte(offset + 1, (oldVal & 0xFF00) << 8);
      console.log(err);
      return;
    }
  }

  writeDoubleWord(offset: number, value: number) {
    let oldVal = this.readDoubleWord(offset);
    if (!oldVal) return;
    try {
      if (this.romData) {
        this.writeWord(offset, value & 0xFFFF);
        this.writeWord(offset + 2, (value & 0xFFFF0000) << 16);
      }
    } catch (err) {
      this.writeWord(offset, oldVal & 0xFFFF);
      this.writeWord(offset + 2, (oldVal & 0xFFFF0000) << 16);
      console.log(err);
      return;
    }
  }


}
