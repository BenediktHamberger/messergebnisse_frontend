<script lang="ts">
	const logoSrc = 'https://www.knott.de/fileadmin/Knott/Resources/Public/img/icon/logo-knott.svg';

	export let overlayOpen = false;
</script>

<div class="overlay" class:overlay-open={overlayOpen}>
	<div class="overlaytext">
		<div class="info">
			<h1><strong><u>INFO</u></strong></h1>
			<p>Werte in die dafür vorgesehenen Textfelder eingeben.</p>
			<p>
				Durch Drücken von "Enter" auf der Tastatur oder durch Klicken auf den Button "Suche" wird
				die gewünschte Tabelle generiert und angezeigt.
			</p>
			<p>Leere Textfelder werden ignoriert.</p>
			<p>
				Durch Klicken auf die Tabellenüberschrift lässt sich die Tabelle nach dem jeweiligen Wert
				aufsteigend und absteigend sortieren.
			</p>
			<p>
				"Export Excel" erzeugt eine Excel-Datei der <strong><u>aktuell ausgegebenen</u></strong> Tabelle
			</p>
		</div>
		<div class="caution">
			<h2><strong><u>Achtung!</u></strong></h2>
			<p>
				Ist der "Von"-Wert größer als der "Bis"-Wert, werden diese Eingaben <strong
					><u>ignoriert</u></strong
				>!
			</p>
			<p>
				Wird nur ein Wert eingetragen (z.B.: Von Positionsnummer 'x') wird nach Positionsnummern
				größer <u>gleich</u> 'x' gefiltert.
			</p>
			<p>
				Gleiches gilt für den Bis Wert. Dann werden beispielsweise Positionsnummern kleiner <u
					>gleich</u
				> 'x' gefiltert.
			</p>
			<p>Es werden maximal 500 Zeilen generiert.</p>
		</div>
		<div>
			<button
				class="close"
				on:click={() => {
					overlayOpen = false;
				}}>schließen</button
			>
		</div>
		<div class="impressum">
			<p>Knott GmbH</p>
			<p>Eggstätt 2023</p>
			<p>Messwerte Prüfstand</p>
			<img src={logoSrc} alt="Knott-logo" />
		</div>
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		display: none;
		flex-direction: column;
		width: 100%;
		height: 100%;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.9);
		z-index: 2;
		text-align: center;
	}

	.overlay-open {
		display: flex;
	}
	.overlaytext {
		color: #cacaca;
		position: relative;
		display: flex;
		flex-direction: column;
		margin-top: 8rem;
	}

	:global(.close) {
		position: relative;
		margin-top: 2rem;
		border-radius: 20px;
		height: 100%;
		width: 30%;
		font-size: 16px;
		bottom: 0;
		border: none;
		background-color: rgba(0, 0, 0, 0);
		color: rgb(0, 110, 255);
		transition-duration: 500ms;
	}
	:global(.close:hover) {
		background-color: #1185e4;
		color: #080000;
		cursor: pointer;
		transform: translate(0, 15px);
		transform: scale(1);
	}

	.impressum {
		line-height: 80%;
		margin-top: 8rem;
		font-size: 10px;
	}

	.info {
		text-align: center;
	}
	.caution {
		color: red;
	}
</style>
