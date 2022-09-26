import { LitElement, html, css } from 'lit-element';
import {estilos} from './estilos/estilos.js';
import {links} from './links/links.js'

export class CardTwo extends LitElement {

    static get styles() {
        return [estilos, css` :host {
          display: block;}`]
      }

    render() {
        return [links, html`
        <div class="recipes container grey-text text-darken-1">
            <div class="card-panel recipe white row">
                <img src="./src/burrito.webp" alt="recipe thumb">
                <div class="recipe-details">
                    <div class="recipe-title">Burrito Edame</div>
                    <div class="recipe-ingredients">Frijoles Edame, Tortilla de arina, Carne</div>
                </div>
                <div class="recipe-delete">
                    <i class="material-icons">delete_outline</i>
                </div>
            </div>`];
    }
}
customElements.define('card-two', CardTwo);