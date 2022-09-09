import {LitElement, html} from 'lit';

class MyElement extends LitElement{
    render(){
        return html `
        <p> ¡ Hola Mundo ! de my-element.</p>`;
    }
}

customElements.define("my-element", MyElement);