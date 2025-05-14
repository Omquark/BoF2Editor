import { AfterContentInit, Component, ContentChild, ElementRef, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LARGE_FONT_MAP, SMALL_FONT_MAP } from './font-mapping';

@Component({
  selector: 'app-custom-font',
  imports: [],
  templateUrl: './custom-font.component.html',
  styleUrl: './custom-font.component.css'
})
export class CustomFontComponent implements AfterContentInit, OnDestroy {
  @Input() large: boolean = false;
  @Input() scale: number = 1;
  @Input() className: string = '';
  @ViewChild('fontCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ContentChild('imageContent') content!: any;
  private textChange$ = new BehaviorSubject<string>('');
  private observer: MutationObserver | undefined;
  private spriteSheet: HTMLImageElement | undefined;

  readonly tileSize = 8;
  readonly spriteSheetUrl = '/media/letters.png'
  transparentColor = { r: 128, g: 128, b: 144 }; //Change to adjust transparency
  loadedTop: boolean = true;
  textContent: string = "";

  ngAfterContentInit(): void {
    if (this.content) {
      this.startObserving();
    }

    this.textChange$.subscribe(() => this.drawFontImage());
    // this.drawFontImage();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect
  }

  startObserving() {
    try {
      this.observer = new MutationObserver(() => {
        this.textChange$.next(this.content.nativeElement.textContent);
      });

      this.observer.observe(this.content.nativeElement, {
        childList: true,
        characterData: true,
        subtree: true,
      });

      this.textChange$.next(this.content.nativeElement.textContent);
    } catch { }
  }

  private loadSpriteSheet(): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      if (this.spriteSheet) {
        resolve(this.spriteSheet);
        return;
      }

      const img = new Image();
      img.src = this.spriteSheetUrl;
      img.onload = () => {
        this.spriteSheet = img;
        resolve(img);
      };
      img.onerror = reject;
    })
  }

  async drawFontImage() {
    let canvas;
    let ctx;

    try {
      canvas = this.canvas.nativeElement;
      ctx = canvas.getContext('2d');
      this.textContent = this.content?.nativeElement?.textContent;
      if (!ctx) return;
    } catch (err) { //Throws NotYetImplemented error
      return;
    }

    const img = await this.loadSpriteSheet();

    canvas.width = this.tileSize * this.textContent.length * this.scale;
    canvas.height = (this.large ? this.tileSize * 2 : this.tileSize) * this.scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(this.scale, this.scale);
    ctx.imageSmoothingEnabled = false;
    for (let i = 0; i < this.textContent.length; i++) {
      const fontData = this.large ?
        { ...LARGE_FONT_MAP[this.textContent.charAt(i)], width: 8, height: 16 } :
        { ...SMALL_FONT_MAP[this.textContent.charAt(i)], topX: undefined, topY: undefined, width: 8, height: 8 };
      if (fontData === undefined) {
        continue;
      }

      for (let row = 0; row < this.tileSize; row++) {
        ctx.drawImage(
          img,
          fontData.x * this.tileSize,
          fontData.y * this.tileSize,
          this.tileSize, this.tileSize,
          this.tileSize * i, this.large ? this.tileSize : 0, this.tileSize, this.tileSize);

        if (this.large && fontData.topX !== undefined && fontData.topY !== undefined) {
          ctx.drawImage(
            img,
            fontData.topX * this.tileSize,
            fontData.topY * this.tileSize,
            this.tileSize, this.tileSize,
            this.tileSize * i, 0, this.tileSize, this.tileSize);
        }
      }
      this.applyTransparency(ctx);
    }
  }

  applyTransparency(ctx: CanvasRenderingContext2D) {
    const imageData = ctx.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i] <= this.transparentColor.r &&
        data[i + 1] <= this.transparentColor.g &&
        data[i + 2] <= this.transparentColor.b) {
        data[i] += 70;
        data[i + 1] += 20;
        data[i + 2] += 70;
        data[i + 3] = 144;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }
}