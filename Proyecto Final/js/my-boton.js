import { LitElement, html, css } from 'lit-element';
import { estilos } from './estilos/estilos.js';
import { links } from './links/links.js'

export class MyBoton extends LitElement {

    static get styles() {
        return [estilos, css` :host {
          display: block;}`]
    }

    static get properties() {
        return {
            verBtn: { type: Boolean }
        };
    }

    abrir() {
        this.verBtn = !this.verBtn;
    }


    render() {
        return [links, html`
        <div class="center">
            <a class="btn-floating btn-small btn-large add-btn sidenav-trigger" data-target="side-form">
                <i @click="${this.abrir}" class="material-icons">add</i>
            </a>
        </div>
        
        
        <div ?hidden="${!this.verBtn}" id="side-form" class="sideform side-form">
            <form class="add-recipe container section">
                <h6>New Recipe</h6>
                <div class="divider"></div>
                <div class="input-field">
                    <label for="title">Recipe Title</label>
                    <br>
                    <input placeholder="e.g. Ninja soup" id="title" type="text" class="validate">
                </div>
                <div class="input-field">
                    <label for="ingredients">Ingredients</label>
                    <br>
                    <input placeholder="e.g. Tofu, mushroom, garlic" id="ingredients" type="text" class="validate">
                </div>
                <div class="input-field center">
                    <button class="btn-small">Add</button>
                </div>
            </form>
        </div>`];
    }
}
customElements.define('my-boton', MyBoton);