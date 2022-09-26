import { LitElement, html, css } from 'lit-element';
import {estilos} from './estilos/estilos.js';
import {links} from './links/links.js'

export class FooNav extends LitElement {

    static get styles() {
        return [estilos, css` :host {
          display: block;}`]
      }

      static get properties() {
        return {
            verBtn: {type: Boolean}
        };
      }

      abrir(){
        this.verBtn = !this.verBtn;
      }

    render() {
        return[links, html`
    <!-- top nav -->
    <nav class="z-depth-0">
    <div class="nav-wrapper container">
    <img src="./src/logo.jpg" alt="" srcset="">
    <a href="./TacoNinja.html">  Taco<span>Ninja</span></a>
    <span class="right grey-text text-darken-1">
    <i class="material-icons sidenav-trigger" data-target="side-menu" @click="${this.abrir}">menu</i>
    </span>
    </div>
    </nav>

  <!-- side nav -->
  <ul ?hidden="${!this.verBtn}" id="side-menu" class="sidenav side-menu">
  <li><a class="subheader">TACONINJA</a></li>
  <li><a href="./TacoNinja.html" class="waves-effect">Inicio</a></li>
  <li><a href="./AcercaDeNosotros.html" class="waves-effect">Acerca de Nosotros</a></li>
  <li><div class="divider"></div></li>
  <li><a href="./Contactanos.html" class="waves-effect">
  <i class="material-icons">mail_outline</i>Contáctanos</a>
  </li>
  </ul>`];
    }
}
customElements.define('foo-nav', FooNav); 

