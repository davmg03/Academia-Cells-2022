import {LitElement, html, css} from 'lit';

export class ToDoList extends LitElement {
  static properties = {
    _listItems: {state: true},
  };

  static styles = css`.completed {text-decoration-line: line-through;
    color: #777;}`;

  constructor() {
    super();
    this._listItems = [
      {text: 'Lista de pendientes', completed: true},
      {text: 'Agregar estilo', completed: false},
    ];
  }

  render() {
    return html`
      <h2>Pendientes</h2>
      <ul>
        ${this._listItems.map(
          (item) => html`
            <li
                class=${item.completed ? 'completed' : ''}
                @click=${() => this.toggleCompleted(item)}>
              ${item.text}
            </li>`
        )}
      </ul>
      <input id="newitem" aria-label="New item">
      <button @click=${this.addToDo}>Añadir</button>
    `;
  }

  toggleCompleted(item) {
    item.completed = !item.completed;
    this.requestUpdate();
  }

  get input() {
    return this.renderRoot?.querySelector('#newitem') ?? null;
  }

  addToDo() {
    this._listItems = [...this._listItems,
        {text: this.input.value, completed: false}];
    this.input.value = '';
  }
}
customElements.define('todo-list', ToDoList);
