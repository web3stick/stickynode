<script lang="ts">
	let owner_id = $state("pool.sleet.near");
	let code_hash = $state("AjD4YJaXgpiRdiArqnzyDi7Bkr1gJms9Z2w7Ev5esTKB");
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<!-- DIV_JSON_ARGS -->
<div>
	<h3>json-args builder</h3>
	owner_id:
	<input type="text" bind:value={owner_id} />
	code_hash: (only change this if you know what you are doing)
	<input type="text" bind:value={code_hash} />
</div>

<!-- ============================================ -->
<!-- ============================================ -->

<style>
	input {
		width: 100%;
		font-size: 20px;
	}
</style>
