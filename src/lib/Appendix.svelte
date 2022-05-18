<script>
	import ScrollTrigger from './ScrollTrigger.svelte';
</script>

<div id="appendix" class="footer">
	<div class="container">
		<article>
			<details>
				<summary>
					<ScrollTrigger areaId="nyc" />
					<h2 class="appendix-references">References</h2>
				</summary>

				<div class="csl-bib-body">
					<div class="csl-entry">
						<i>3437 - 2019 Greater Los Angeles Homeless Count Presentation</i>.
						https://www.lahsa.org/documents?id=3437-2019-greater-los-angeles-homeless-count-presentation.pdf.
						Accessed 10 Dec. 2019.
					</div>
					<div class="csl-entry">
						<i>A Short History of Hollywood | Courier Service Los Angeles</i>.
						https://smexpress.com/short-history-of-hollywood/. Accessed 10 Dec. 2019.
					</div>
					<div class="csl-entry">
						Carlson, Jen. “A Short History Of Venice, Which Used To Be An Oilfield.” <i>LAist</i>,
						https://laist.com/2015/01/29/venice_beach_used_to_be_an_oilfield.php. Accessed 10 Dec.
						2019.
					</div>
					<div class="csl-entry">
						<i>Hollywood Quotes (226 Quotes)</i>. https://www.goodreads.com/quotes/tag/hollywood.
						Accessed 10 Dec. 2019.
					</div>
					<div class="csl-entry">
						“Inside Airbnb. Adding Data to the Debate.”
						<i>Inside Airbnb</i>, http://insideairbnb.com. Accessed 10 Dec. 2019.
					</div>
					<div class="csl-entry">
						Kang, Matthew. “The Eight Best Lines from Roy Choi’s Profile in California Sunday
						Magazine.” <i>Eater LA</i>, 5 Dec. 2014,
						https://la.eater.com/2014/12/5/7341819/the-eight-best-lines-from-roy-chois-profile-in-california-sunday.
					</div>
					<div class="csl-entry">
						“Los Angeles Celebrates Record Milestone of 50 Million Visitors in 2018.” <i
							>Discover Los Angeles</i
						>,
						https://www.discoverlosangeles.com/los-angeles-celebrates-record-milestone-of-50-million-visitors-in-2018.
						Accessed 10 Dec. 2019.
					</div>
					<div class="csl-entry">
						Meares, Hadley. “LA Has ‘the Best Koreatown Outside of Korea.’”
						<i>Curbed LA</i>, 6 May 2019,
						https://la.curbed.com/2019/5/6/18523959/koreatown-los-angeles-guelaguetza-riots.
					</div>
					<div class="csl-entry">
						---. “LA Has ‘the Best Koreatown Outside of Korea.’”
						<i>Curbed LA</i>, 6 May 2019,
						https://la.curbed.com/2019/5/6/18523959/koreatown-los-angeles-guelaguetza-riots.
					</div>
					<div class="csl-entry">
						<i>Quotations About Venice</i>. http://www.virtualvenice.info/print/quotes.htm. Accessed
						10 Dec. 2019.
					</div>
					<div class="csl-entry">
						“Stroll Through Venice’s Past.” <i>Los Angeles Times</i>, 7 Sept. 1998,
						https://www.latimes.com/archives/la-xpm-1998-sep-07-me-20328-story.html.
					</div>
					<div class="csl-entry">
						“The Guide to Koreatown in Los Angeles.”
						<i>Discover Los Angeles</i>,
						https://www.discoverlosangeles.com/visit/the-guide-to-koreatown-in-los-angeles. Accessed
						10 Dec. 2019.
					</div>
					<div class="csl-entry">
						<i>Venice Historical Society - Venice, California</i>. http://www.veniceofamerica.org/.
						Accessed 10 Dec. 2019.
					</div>
				</div>
			</details>
		</article>

		<h2>Methodology and data sources</h2>
		<p>
			We began with the LA Times neighborhood boundaries. We then selected 311 calls for
			"homelessness encampment" complaints for the City of Los Angeles in 2018. We also used Airbnb
			listing locations available on the countermapping website, Inside Airbnb, for the month of
			September 2019. The two data sets were analyzed in Python to calculate the density of values
			per acre and three neighborhoods were selected based on highest density of homeless encampment
			complaints and Airbnb listings. To understand the complexity of the dichotomy, a narrative for
			each neighborhood is shared, along with contrasting visuals and descriptions about Airbnb and
			homelessness.
		</p>

		<h2>Credits</h2>
		<p>
			This data story was created by
			<a href="https://www.linkedin.com/in/reginaalcazar/">Regina Joy Alcazar</a>
			and <a href="https://riledigital.com">Ri Le</a> for the course Informatics 1 during 2019 Fall
			taught by
			<a href="https://vanky.co/">Professor Anthony P. Vanky</a> at the Columbia University Graduate
			School of Architecture, Planning and Preservation.
		</p>

		<p>
			This web story was built on Web technology: HTML/CSS/JS, Vega-Lite, OpenLayers, and Snowpack.
			Data processing was done with Python, namely the geopandas package.
		</p>

		<p>
			This text is set in Argesta and Silka, from
			<a href="https://www.atipofoundry.com/">Atipo Foundry</a>.
		</p>
	</div>
</div>

<style>
	.footer {
		background: var(--c-background);
		padding: var(--margin-mobile);
	}

	.csl-entry {
		font-size: 0.8rem;
		max-width: 60ch;
		padding-left: 4ch;
		text-indent: -4ch;
		margin-bottom: 0.5rem;
	}

	.appendix-references {
		display: inline;
	}

	summary {
		margin-bottom: 2rem;
	}
</style>
