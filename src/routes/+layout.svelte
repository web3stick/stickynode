<script lang="ts">
	import "@sleet-css/sticky-css/main.css";
	import "$lib/css/main.css";
	import favicon from "$lib/assets/favicon.svg";
	import ROUTES from "$lib/ts/routes";
	let { children } = $props();
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<svelte:head>
	<title>stickynode</title>
	<link rel="icon" href={favicon} />
	<base target="_blank" />
</svelte:head>

<!-- ============================================ -->
<!-- ============================================ -->

<section>
	<div>
		{@render children()}
		<p>
			================================
			<br />
			<a href={ROUTES.docker.path}>{ROUTES.docker.label}</a>
			<br />
			<a href={ROUTES.pool.path}>{ROUTES.pool.label}</a>
			<br />
			<a href={ROUTES.near.path}>{ROUTES.near.label}</a>
			<br />
			<a href={ROUTES.config.path}>{ROUTES.config.label}</a>
			<br />
			copyright 2026 by web3stick.near
		</p>
	</div>
</section>

<!-- ============================================ -->
<!-- ============================================ -->

<style>
	div {
		width: 500px;
		max-width: 90vw;
		text-align: left;
	}
</style>
