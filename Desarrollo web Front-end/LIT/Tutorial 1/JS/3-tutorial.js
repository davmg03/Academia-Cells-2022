import {LitElement, html} from 'lit';

export class MyElement extends LitElement {
  static properties = {
    message: {},
};

constructor(){
  super();
  this.message =`Hola de nuevo.`;
}

  render() {
    return html`
      ${this.message}`;
  }
}
customElements.define('my-element', MyElement);
