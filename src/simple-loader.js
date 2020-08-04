(function() {
    const styles = `
      .container {
          position: relative;
          display: table;
      }
      svg {
           position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
      }
      polygon {
          animation: movedash 1.5s forwards 0s infinite;
          fill: none;
          stroke: blue;
          stroke-width: 8px;
          stroke-dasharray: 40;
          stroke-dashoffset: 50%;
        }
      .loader {
        animation: showLoader 0.5s forwards;
        background-color: #fff;
        position: absolute;
        visibility: show;
        z-index: 100;
        width: 100%;
        height: 100%;
      }
      .hide-loader {
          animation: hideLoader 1s forwards;
      }
      @keyframes hideLoader {
          0% {
              opacity: 0.8;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }
       @keyframes showLoader {
          100% {
            opacity: 0.8;
          }
        }
      @keyframes movedash {
          to {
            stroke-dashoffset: 250%;
          }
        }
    `;

    const svgLoader = `<svg width='40' height='40' viewBox='0 0 40 40'><polygon points='0 0 0 40 40 40 40 0'/></svg>`

    class SimpleLoader extends HTMLElement {

        static get observedAttributes() {
            return ['loading'];
        }

        constructor() {
            super();
                this.attachShadow({
                    mode: 'open'
                });
            this.renderLoader = this.renderLoader.bind(this);
        }

        connectedCallback() {
            this.renderLoader();
        }

        renderLoader() {
            const loading = this.hasAttribute('loading') || this.loading;

            this.shadowRoot.innerHTML = `
                <style>${styles}</style>
                <div class='container'>
                    <div class="loader ${!loading ? 'hide-loader' : ''}">
                        ${loading ? `<div>${svgLoader}</div>` : ''}
                    </div>
                    <slot></slot>
                </div>`;
        }

        get loading() {
            return this.getAttribute('loading');
        }

        set loading(val) {
            if (val) {
                this.setAttribute('loading', val);
            } else {
                this.removeAttribute('loading');
            }
        }

        attributeChangedCallback(name) {
            switch (name) {
            case 'loading':
                this.renderLoader();
                break;
            }
        }
    }

    window.customElements.define('simple-loader', SimpleLoader);
})();
