import { LitElement, html, css } from 'lit-element';
import {estilos} from './estilos/estilos.js';
import {links} from './links/links.js'

export class CardOne extends LitElement {

    static get styles() {
        return [estilos, css` :host {
          display: block;}`]
      }

    render() {
        return [links, html`
        <div class="recipes container grey-text text-darken-1">
            <div class="card-panel recipe white row">
                <img src="./src/dish.png" alt="recipe thumb">
                <div class="recipe-details">
                    <div class="recipe-title">Fideos Edame</div>
                    <div class="recipe-ingredients">Frijoles Edame, Fideos, Aceite de ajo</div>
                </div>
                <div class="recipe-delete">
                    <i class="material-icons">delete_outline</i>
                </div>
            </div>`];
    }
}
customElements.define('card-one', CardOne);