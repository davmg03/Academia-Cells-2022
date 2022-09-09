import {LitElement, html} from 'lit';

export class MyElement extends LitElement {
  static properties = {
    result: {},
  };

  constructor() {
    super();
    this.result = '';
  }

  flipCoin() {
    if (Math.random() < 0.5) {
      this.result = 'Cara';
    } else {
      this.result = 'Cruz';
    }
  }

  render() {
    return html`
      <button @click=${this.flipCoin}>Lanza una moneda</button>
      <p>Resultado: ${this.result}</p>
    `;
  }
}
customElements.define('my-element', MyElement);
