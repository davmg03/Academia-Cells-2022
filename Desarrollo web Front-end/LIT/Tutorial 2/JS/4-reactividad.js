import {LitElement, html, css} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {animate} from '@lit-labs/motion';

export class MyElement extends LitElement {
  static properties = {
    big: {type: Boolean},
    duration: {type: Number},
    _renderCount: {state: true},
  };

  static styles = css`
    .bar {
      background: red;
      height: 2em;
      width: 10vw;
    }

    .big {
      width: 50vw;
    }
  `;

  constructor() {
    super();
    this.big = false;
    this.duration = 500;
    this._renderCount = 0;
  }

  setDuration(e) {
    const v = e.target.value;
    this.duration = Number.parseInt(v);
  }

  shouldUpdate(changedProperties) {
    return !(changedProperties.size === 1 && changedProperties.has('duration'));
  }

  render() {
    this._renderCount++;
    const keyframeOptions = {duration: this.duration};

    return html`
      <p>
        <button @click=${() => (this.big = !this.big)}>Animar</button>
      </p>
      <p>
        <label>Correr <select @change=${this.setDuration}>
          <option value="250" selected>Rapido</option>
          <option value="1500">Lento</option>
        </select></label>
        Recuento del procesamiento: ${this._renderCount}
      </p>
      <p class="bar ${classMap({big: this.big})}" ${animate({
      keyframeOptions,
    })}></p>
    `;
  }
}
customElements.define('my-element', MyElement);
