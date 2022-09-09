import {LitElement, html, css} from 'lit';

export class MyElement extends LitElement {
  static properties = {
    _showMessage: {state: true},
  };
  static styles = css`
    :host {
      display: block;
    }
    #message {
      position: fixed;
      background-color: cornflowerblue;
      color: white;
      padding: 10px;
    }
  `;

  constructor() {
    super();
    this._showMessage = false;
  }

  get _message() {
    return this.renderRoot?.querySelector('#message') ?? null;
  }

  render() {
    return html`
      <button @click=${() =>
        (this._showMessage = !this._showMessage)}>Aprietame</button>
      <div id="message" ?hidden=${!this._showMessage}>
        CHADAAAAAAN
      </div>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('_showMessage')) {
      const final = this._message.getBoundingClientRect().width;
      const starting = 0 - final;
      this._message.animate(
        [
          {transform: `translateX(${starting}px)`},
          {transform: `translateX(0)`},
        ],
        {
          duration: 500,
          easing: 'ease-out',
        }
      );
    }
  }
}
customElements.define('my-element', MyElement);
