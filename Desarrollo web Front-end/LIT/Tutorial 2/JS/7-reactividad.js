import {LitElement, html, css} from 'lit';

export class ByeElement extends LitElement {
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
        (this._showMessage = !this._showMessage)}>Oprimeme</button>
      <div id="message" ?hidden=${!this._showMessage}>
       ¡ Eso, eso, eso, eso es todo Amigos !
      </div>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('_showMessage')) {
      const rect = this._message.getBoundingClientRect();
      const startingX = 0 - rect.width;
      this._message.animate(
        [
          {transform: `translateX(${startingX}px) scale(0.1)`},
          {transform: `translateX(0) translateY(0) scale(1)`},
        ],
        {
          duration: 500,
          easing: 'ease-out',
        }
      );
    }
  }
}
customElements.define('bye-element', ByeElement);
