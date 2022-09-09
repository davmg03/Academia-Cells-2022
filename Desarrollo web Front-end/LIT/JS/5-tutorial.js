import {LitElement, html} from 'lit';

export class MoreExpressions extends LitElement {
  static properties = {
    checked: {},
  };

  constructor() {
    super();
    this.checked = false;
  }

  render() {
    return html`
      <div>
         <!-- TODO: Add expression to input. -->
         <input ?disabled=${!this.checked} type="text" value="Hola es aquí.">
      </div>
      <label><input type="checkbox" @change=${this.setChecked}> Permitir Edicion</label>
    `;
  }

  setChecked(event) {
    this.checked = event.target.checked;
  }
}
customElements.define('more-expressions', MoreExpressions);
