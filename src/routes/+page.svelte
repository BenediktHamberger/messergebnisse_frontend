<script lang="ts">
</script>

<main>
	<div class="card-grid">
		<a href="/messergebnisse"> <div class="card w-96 bg-base-100 shadow-xl">Messergebnisse</div></a>
		<a href="/betaetigungsscheibe">
			<div class="card w-96 bg-base-100 shadow-xl">Betätigungsscheibe</div>
		</a>
		<a href="/zugkugelkupplung">
			<div class="card w-96 bg-base-100 shadow-xl">Zugkugelkupplung</div>
		</a>
		<a href="/betaetigungsscheibe_9622">
			<div class="card w-96 bg-base-100 shadow-xl">Betätigungsscheibe 9622</div>
		</a>
	</div>
</main>

<style>
	.card-grid {
		margin: 3rem;
		display: grid;
		justify-items: center;
		justify-content: center;
		grid-gap: 20px;
		grid-template-columns: repeat(4, 10rem);
	}
	.card {
		display: table-cell;
		background-color: #005587;
		width: 10rem;
		color: white;
		height: 4rem;
		border-radius: 1rem;
		align-items: center;
		justify-content: center;
		text-align: center;
		vertical-align: middle;
	}
</style>
