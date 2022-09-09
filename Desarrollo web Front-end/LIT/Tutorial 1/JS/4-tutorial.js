import {LitElement, html} from 'lit';

export class NameTag extends LitElement {
  static properties = {
    name: {},
  };

  constructor() {
    super();
    this.name = 'Tú nombre';
  }

  render() {
    return html`
      <p>¡ Hola !, ${this.name}</p>
      <input @input=${this.changeName} placeholder="Ingresa tú nombre">
      <br>
      <br>
      <button @click=${this.handleClick}> ¿ Enviar ?</button><!--En este ejemplo el boton no tiene ninguna funcion-->`;
  }
changeName(event){
  const input = event.target;
  this.name = input.value;
}
}
customElements.define('name-tag', NameTag);