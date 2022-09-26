import { LitElement, html, css } from 'lit-element';
import {estilos} from './estilos/estilos.js';
import {links} from './links/links.js'

export class AceNos extends LitElement {

    static get styles() {
        return [estilos, css` :host {
          display: block;}`]
      }

    render() {
        return [links, html`
        <div class="container grey-text">
        <h5 class="center">About Food Ninja</h5>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, porro voluptatum illum veniam eaque sunt sit labore provident eligendi! Voluptate amet suscipit inventore unde maxime atque impedit officia nobis laboriosam!</p>
        <img src="./src/comida.jpg" alt="" srcset="">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatibus omnis, ea doloremque exercitationem id necessitatibus. Voluptatem officiis cupiditate commodi totam, hic laborum est ducimus amet iure, non dignissimos illo.</p>
        <div>`];
    }
}
customElements.define('ace-nos', AceNos);