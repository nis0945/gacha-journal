import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "who-root",
  imports: [FormsModule],
  template: `
    <main>
      <textarea [(ngModel)]="page" (keypress)="onChange()" autofocus>
      </textarea>
    </main>
  `,
  styles: [
    `
      :host {
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
        background-color: #00000017;
      }

      main,
      textarea {
        background-color: #00000001;
      }

      textarea {
        border-radius: 0.5em;
        border-width: 0.5px;
        min-height: 27vh;
        min-width: 33vw;
        font-family: sans-serif;
      }
    `,
  ],
})
export class App {
  private _debounce?: any;
  public page = signal<string>("");
  public contentLength = computed(() => this.page().length);

  private static readonly _RNG_LOW = 0.00005;
  private static readonly _RNG_HIGH = 0.8;
  private static readonly _RNG_ALPHA = 0.0013;

  public onChange() {
    if (this._debounce) clearTimeout(this._debounce);

    this._debounce = setTimeout(() => {
      const rng = Math.random();
      const clearProb =
        (App._RNG_HIGH - App._RNG_LOW) *
        (1 - Math.exp(-App._RNG_ALPHA * this.contentLength()));

      if (rng < clearProb) this.page.set("");
    }, 10);
  }
}
