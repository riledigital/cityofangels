import embed from 'vega-embed';
import {
  capitalize
} from 'lodash';
import {
  setupScrollObserver
} from './../ScrollEvents';
import {
  makePricePlot, makeMiniNights, makePlotRentalType
} from '../charts/PlotStyles';


class LandmarkNeighborhood extends HTMLElement {
  constructor() {
    super();
    const theTemplate = document.createElement('template');

    theTemplate.innerHTML = `
  <style>

  .landmark {
    border-top: 1rem solid red;
    background-color: rgba(255, 255, 255, .95);
    margin-bottom: 200vh;
    padding: var(--margin-mobile);
  }

  .landmark__title {
    font-size: var(--font-h2);
    margin: 0;
    padding: 0;
  }

  .vega-embed, .vis-container {
    height: 35vh;
    width: 100%;
  }

  .landmark__vis-title {
    font-family: var(--font-data);
    font-weight: 700;
  }

  summary {
  margin-top: 1rem;
}

  h2, h3 {
    font-family: var(--font-headings);
  }

  details {
    margin-bottom: 4rem;
  }

  .vis-description {
    max-width: 45ch;
  }
  .vis-figure {
    display: block;
    margin: 0;
    padding: 0;
  }

  @media screen and (min-width: 600px) {
    .landmark {
    padding: var(--margin-mobile);
    }
    .landmark__title {
    font-size: 2rem;
    line-height: 1.1;
    }
    .landmark__vis-title {
    font-family: var(--font-headings);
    }
  }

  @media screen and (min-width: 900px) {
    .landmark {
      max-width: 55ch;
      padding:calc( var(--margin) / 2);
    }
  }

</style>
<section id="ktown" class="landmark scroll-trigger">
    <header class="landmark__header">
        <h2 class="landmark__title">
            <slot name="title">
                Title of landmark
            </slot>
        </h2>
        <p class="lead">
            <slot name="quote">
                quote
            </slot>
        </p>
        <slot name="intro-p">
            intro paragraph
        </slot>

    </header>

    <div class='landmark__container'>
        <div class="">
            <figure class="vis-figure">
              <h3>Distribution of room types</h3>
                <div class="vis-container">
                    <div class="landmark__vis-rental-types"></div>
                </div>
                <details>
                    <summary>
                        <span class="landmark__vis-title">Rental Types</span>
                    </summary>
                    <p class="vis-description">
                        A transient traveler has many considerations for selecting a
                        rental: the amenities offered, the general aesthetic of the
                        living environment, and space needed. This affects the choice
                        among the four rental type options. For those without any other
                        choice in the City of Los Angeles, more affordable options like
                        tents, vehicles, and shelters housed 36,165 people in 2019
                        (LAHSA).
                    </p>
                </details>
            </figure>

            <figure class="vis-figure">
                <h3>Distribution of nights stayed</h3>
                <div class="vis-container">
                    <div class="landmark__vis-nights"></div>
                </div>
                <details>
                    <summary>
                      <span class="landmark__vis-title">
                        Minimum Nights
                      </span>
                    </summary>
                    <p class="vis-description">
                        Ranging from one day to a few months, Airbnb hosts can require a
                        minimum number of nights a renter could stay in their rental.
                        This offers a preview into the length of time a transient
                        traveler might stay in the neighborhood and why they might be
                        visiting, whether for long-term work or a short-term vacation.
                        By contrast, 23% of the homeless population surveyed experienced
                        homelessness for the first-time that year, whereas chronic
                        homelessness increased by 17% (LAHSA, 2019).
                    </p>
                </details>
            </figure>

            <figure class="vis-figure">
              <h3>Distribution of rental prices</h3>
            <div class="vis-container">
                <div class="landmark__vis-price"></div>
            </div>
            <details>
                <summary>
                  <span class="landmark__vis-title">
                    Daily rate of an Airbnb rental
                  </span>
                  </summary>
                    <p class="vis-description">
                        How much money would a transient traveler pay to visit? In
                        contrast, economic factors are the main driver of increases in
                        homelessness and Los Angeles is the least affordable housing
                        market in the United States (LAHSA, 2019).
                    </p>
            </details>
            </summary>
          </figure>
        </div>
</section>
  `;

    const template = theTemplate;
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({
      mode: 'open'
    })
      .appendChild(templateContent.cloneNode(true));
  }

  setVisId(el, theId) {
    // Set all the IDS
    const shadow = el.shadowRoot;
    try {
      shadow.querySelector('.landmark-container')?.setAttribute('id', `${theId}`);

      shadow.querySelector('.landmark__vis-rental-types')?.setAttribute('id', `${theId}-vis-rental-types`);
      shadow.querySelector('.landmark__vis-nights')?.setAttribute('id', `${theId}-vis-nights`);
      shadow.querySelector('.landmark__vis-price')?.setAttribute('id', `${theId}-vis-price`);
    } catch (err) {
      console.error(err);
    }
  }

  renderPlot(el, areaId, dataUrl) {
    let formattedArea;
    if (areaId === 'ktown') {
      formattedArea = 'Koreatown';
    } else {
      formattedArea = capitalize(areaId);
    }
    return Promise.all([
      embed(el.shadowRoot.querySelector('#' + areaId + '-vis-rental-types'), makePlotRentalType(dataUrl, formattedArea)),
      embed(el.shadowRoot.querySelector('#' + areaId + '-vis-nights'), makeMiniNights(dataUrl, formattedArea)),
      embed(el.shadowRoot.querySelector('#' + areaId + '-vis-price'), makePricePlot(dataUrl, formattedArea))
    ], (values) => console.log(values));
  }

  connectedCallback() {
    // Take attribute content and put it inside the info span
    const areaId = this.getAttribute('data-area-id');
    const visUrl = this.getAttribute('data-vis-url');
    const zoomLevel = this.getAttribute('data-zoom-level');
    if (!areaId) {
      console.error('No vizId set');
    }
    this.setVisId(this, areaId);
    this.renderPlot(this, areaId, visUrl);
    setupScrollObserver(this, areaId, zoomLevel);
  }
}

window.customElements.define('landmark-neighborhood', LandmarkNeighborhood);

export default LandmarkNeighborhood;
