<script lang="ts">
	import { createHighlighter } from "shiki";
	// ============================================
	let owner_id = $state("your_account.near");
	let code_hash = $state("AjD4YJaXgpiRdiArqnzyDi7Bkr1gJms9Z2w7Ev5esTKB");
	let staking_pool_id = $state("anythingnottken");
	let stake_public_key = $state("ed25519:pub_key_here");
	let reward_fee_fraction = $state(70);
	// ============================================
	let highlighter = $state<Awaited<ReturnType<typeof createHighlighter>> | null>(null);
	// ============================================
	$effect(() => {
		createHighlighter({
			themes: ["catppuccin-mocha"],
			langs: ["json", "bash"]
		}).then((h) => {
			highlighter = h;
		});
	});
	// ============================================
	const json_output = $derived(() =>
		JSON.stringify({
			owner_id: owner_id,
			code_hash: code_hash,
			staking_pool_id: staking_pool_id,
			stake_public_key: stake_public_key,
			reward_fee_fraction: percentage_to_fraction(reward_fee_fraction)
		})
	);
	// ============================================
	const json_display = $derived(() =>
		JSON.stringify(
			{
				owner_id: owner_id,
				code_hash: code_hash,
				staking_pool_id: staking_pool_id,
				stake_public_key: stake_public_key,
				reward_fee_fraction: percentage_to_fraction(reward_fee_fraction)
			},
			null,
			2
		)
	);
	// ============================================
	const highlighted_json = $derived(() => {
		if (!highlighter) return escapeHtml(json_display());
		return highlighter.codeToHtml(json_display(), {
			lang: "json",
			theme: "catppuccin-mocha"
		});
	});

const full_command = $derived(() => {
		return `near transaction construct-transaction ${owner_id} receiver-id pool.near add-action function-call create_staking_pool json-args '${json_output()}' prepaid-gas '100.0 Tgas' attached-deposit '4 NEAR' skip network-config mainnet sign-with-legacy-keychain`;
	});

	const highlighted_command = $derived(() => {
		if (!highlighter) return escapeHtml(full_command());
		return highlighter.codeToHtml(full_command(), {
			lang: "bash",
			theme: "catppuccin-mocha"
		});
	});
	// ============================================
	function percentage_to_fraction(percentage: number) {
		return {
			numerator: percentage,
			denominator: 100
		};
	}
	// ============================================
	function escapeHtml(str: string) {
		return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	// ============================================
	let json_copied = $state(false);
	let command_copied = $state(false);

	async function copy_to_clipboard() {
		try {
			await navigator.clipboard.writeText(json_output());
			json_copied = true;
			setTimeout(() => (json_copied = false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	}

	async function copy_command() {
		try {
			await navigator.clipboard.writeText(full_command());
			command_copied = true;
			setTimeout(() => (command_copied = false), 2000);
		} catch (err) {
			console.error("Failed to copy command:", err);
		}
	}
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
	staking_pool_id:
	<input type="text" bind:value={staking_pool_id} />
	stake_public_key:
	<input type="text" bind:value={stake_public_key} />
	reward_fee_fraction: (percentage of the pool's rewards that go to you)
	<input type="number" bind:value={reward_fee_fraction} />
	<button onclick={copy_to_clipboard}>{json_copied ? "COPIED" : "COPY JSON"}</button>
	<div>{@html highlighted_json()}</div>
	<h3>full near cli command</h3>
	<div>{@html highlighted_command()}</div>
	<button onclick={copy_command}>{command_copied ? "COPIED" : "COPY FULL CLI COMMAND"}</button>
</div>

<!-- ============================================ -->
<!-- ============================================ -->

<style>
	input {
		width: 100%;
		font-size: 20px;
		box-sizing: border-box;
	}
	button {
		width: 100%;
		margin: 0px;
		margin-top: 3px;
		box-sizing: border-box;
		border-radius: 1px;
	}
</style>
