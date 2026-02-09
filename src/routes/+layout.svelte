<script>
	import '../app.postcss';
	import '@fortawesome/fontawesome-free/css/all.min.css';
</script>

<slot />

<style>
	:global(body) {
		height: 100%;
	}

	:global(html) {
		height: 100vh;
	}
</style>
