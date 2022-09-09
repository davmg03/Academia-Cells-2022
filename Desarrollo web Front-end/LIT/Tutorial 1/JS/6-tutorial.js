import {LitElement, html} from 'lit';

export class ToDoList extends LitElement {
  static properties = {
    _listItems: {state: true},
  };

  constructor() {
    super();
    this._listItems = [
      {text: 'Empezar tutorial de Lit', completed: true},
      {text: 'Hacer lista de pendientes', completed: false},
    ];
  }

  render() {
    return html`
      <h2>Pendientes</h2>
      <ul>
        ${this._listItems.map((item) => html `<li>${item.text}</li>`)}
      </ul>
      <input id="newitem" aria-label="New item">
      <button @click=${this.addToDo}>Añadir</button>`;
  }

get input(){
return this.renderRoot?.querySelector("#newitem") ?? null;
}

addToDo() {
  this._listItems = [...this._listItems, {text: this.input.value, completed: false}];
  this.input.value = "";}
}
customElements.define('todo-list', ToDoList);
