# SCHEMA

🟨 json schema for near node config

---

JSON files validated by this schema:
- `config.rpc.json`
- `config.validator.json`

find these json config files at [near-nodes.io/validator/compile-and-run-a-node#31-set-up-the-config-file-for-your-needs-1](https://near-nodes.io/validator/compile-and-run-a-node#31-set-up-the-config-file-for-your-needs-1)

## Schema File

`config.schema.json`

## Validate via CLI

Install the validator:
```bash
npm install -g ajv-cli
```

Validate a config file:
```bash
ajv validate -s static/json/config.schema.json -d static/json/config.rpc.json --spec=draft7
ajv validate -s static/json/config.schema.json -d static/json/config.validator.json --spec=draft7
```

Or validate all at once:
```bash
ajv validate -s static/json/config.schema.json -d static/json/config.rpc.json -d static/json/config.validator.json --spec=draft7
```

---

## Config Field Reference

### Top Level Fields

| Field | Type | Default (RPC) | Default (Validator) | Description |
|-------|------|---------------|---------------------|-------------|
| `max_loaded_contracts` | integer | 32 | 32 | Max number of contracts cached in memory |
| `genesis_file` | string | "genesis.json" | "genesis.json" | Path to genesis.json |
| `genesis_records_file` | string\|null | null | null | Path to genesis records file |
| `validator_key_file` | string | "validator_key.json" | "validator_key.json" | Path to validator key file |
| `node_key_file` | string | "node_key.json" | "node_key.json" | Path to node key file |
| `tracked_shards_config` | string\|array | "AllShards" | "NoShards" | Which shards to track |
| `log_summary_style` | string | "colored" | "colored" | Log output format: "colored" or "json" |
| `enable_multiline_logging` | boolean | false | false | Enable multi-line log formatting |
| `gc_blocks_limit` | integer | 2 | 2 | Garbage collection block limit |
| `gc_fork_clean_step` | integer | 100 | 100 | Garbage collection fork clean step |
| `gc_num_epochs_to_keep` | integer | 5 | 5 | Number of epochs to keep for garbage collection |
| `view_client_threads` | integer | 4 | 4 | Number of view client threads |
| `state_sync_enabled` | boolean | true | true | Enable state sync |
| `transaction_pool_size_limit` | integer | 100000000 | 100000000 | Transaction pool size limit |

### Duration Fields

Duration objects contain `secs` (seconds) and `nanos` (nanoseconds). Example: `{"secs": 10, "nanos": 0}` = 10 seconds.

| Field | Default (both) | Description |
|-------|----------------|-------------|
| `log_summary_period` | {"secs": 10, "nanos": 0} | Log summary reporting interval |
| `state_request_throttle_period` | {"secs": 30, "nanos": 0} | State request throttle period |
| `gc_step_period` | {"secs": 0, "nanos": 500000000} | Garbage collection step period |

---

### RPC Section (`rpc`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `addr` | string | "0.0.0.0:3030" | RPC server listen address |
| `prometheus_addr` | string\|null | null | Prometheus metrics address |
| `cors_allowed_origins` | array | ["*"] | Allowed CORS origins |
| `enable_debug_rpc` | boolean | false | Enable debug RPC endpoints |
| `experimental_debug_pages_src_path` | string\|null | null | Path to debug pages source |

#### RPC `polling_config`

| Field | Default | Description |
|-------|---------|-------------|
| `polling_interval` | {"secs": 0, "nanos": 200000000} | Polling interval (200ms) |
| `polling_timeout` | {"secs": 10, "nanos": 0} | Polling timeout |

#### RPC `limits_config`

| Field | Default | Description |
|-------|---------|-------------|
| `json_payload_max_size` | 10485760 | Max JSON payload size (10MB) |

---

### Telemetry Section (`telemetry`)

| Field | Default | Description |
|-------|---------|-------------|
| `endpoints` | ["https://telemetry.nearone.org/nodes"] | Telemetry reporting endpoints |
| `reporting_interval` | {"secs": 10, "nanos": 0} | Telemetry reporting interval |

---

### Network Section (`network`)

| Field | Default | Description |
|-------|---------|-------------|
| `addr` | "0.0.0.0:24567" | P2P network listen address |
| `boot_nodes` | "" | Comma-separated list of boot nodes (format: `ed25519:key@ip:port`) |
| `whitelist_nodes` | "" | Whitelisted nodes |
| `max_num_peers` | 40 | Maximum number of peers |
| `minimum_outbound_peers` | 5 | Minimum outbound peer count |
| `ideal_connections_lo` | 30 | Ideal connections lower bound |
| `ideal_connections_hi` | 35 | Ideal connections upper bound |
| `peer_recent_time_window` | {"secs": 600, "nanos": 0} | Peer recent time window (10min) |
| `safe_set_size` | 20 | Safe set size for archival nodes |
| `archival_peer_connections_lower_bound` | 10 | Lower bound for archival peer connections |
| `handshake_timeout` | {"secs": 20, "nanos": 0} | Handshake timeout |
| `skip_sync_wait` | false | Skip sync wait on startup |
| `ban_window` | {"secs": 10800, "nanos": 0} | Ban window (3 hours) |
| `blacklist` | [] | Blacklisted peers |
| `ttl_account_id_router` | {"secs": 3600, "nanos": 0} | TTL for account ID router (1 hour) |
| `peer_stats_period` | {"secs": 5, "nanos": 0} | Peer stats reporting period |
| `monitor_peers_max_period` | {"secs": 60, "nanos": 0} | Monitor peers max period |
| `peer_states_cache_size` | 1000 | Peer states cache size |
| `peer_expiration_duration` | {"secs": 604800, "nanos": 0} | Peer expiration (7 days) |
| `public_addrs` | [] | Public addresses |
| `allow_private_ip_in_public_addrs` | false | Allow private IPs in public addresses |
| `trusted_stun_servers` | ["stun.l.google.com:19302", ...] | STUN servers for NAT traversal |

#### Network `experimental`

| Field | Default | Description |
|-------|---------|-------------|
| `inbound_disabled` | false | Disable inbound connections |
| `connect_only_to_boot_nodes` | false | Only connect to boot nodes |
| `skip_sending_tombstones_seconds` | 0 | Skip sending tombstones |

---

### Consensus Section (`consensus`)

| Field | Default | Description |
|-------|---------|-------------|
| `min_num_peers` | 3 | Minimum peers required for block production |
| `block_production_tracking_delay` | {"secs": 0, "nanos": 100000000} | Block production tracking delay (100ms) |
| `min_block_production_delay` | {"secs": 0, "nanos": 600000000} | Min block production delay (600ms) |
| `max_block_production_delay` | {"secs": 1, "nanos": 800000000} | Max block production delay (1.8s) |
| `max_block_wait_delay` | {"secs": 6, "nanos": 0} | Max block wait delay |
| `produce_empty_blocks` | true | Produce empty blocks |
| `block_fetch_horizon` | 50 | Block fetch horizon |
| `block_header_fetch_horizon` | 50 | Block header fetch horizon |
| `catchup_step_period` | {"secs": 0, "nanos": 100000000} | Catchup step period |
| `chunk_request_retry_period` | {"secs": 0, "nanos": 400000000} | Chunk request retry period |
| `header_sync_initial_timeout` | {"secs": 10, "nanos": 0} | Header sync initial timeout |
| `header_sync_progress_timeout` | {"secs": 2, "nanos": 0} | Header sync progress timeout |
| `header_sync_stall_ban_timeout` | {"secs": 120, "nanos": 0} | Header sync stall ban timeout |
| `header_sync_expected_height_per_second` | 10 | Expected header sync height per second |
| `sync_check_period` | {"secs": 10, "nanos": 0} | Sync check period |
| `sync_step_period` | {"secs": 0, "nanos": 10000000} | Sync step period (10ms) |
| `doomslug_step_period` | {"secs": 0, "nanos": 100000000} | Doomslug step period |
| `sync_height_threshold` | 1 | Sync height threshold |
| `chunk_wait_mult` | [1, 3] | Chunk wait multiplier |

---

### Store Section (`store`)

| Field | Default | Description |
|-------|---------|-------------|
| `path` | null | Path to RocksDB storage |
| `enable_statistics` | false | Enable RocksDB statistics |
| `enable_statistics_export` | true | Enable statistics export |
| `max_open_files` | 10000 | Max open files |
| `col_state_cache_size` | 3221225472 | Column state cache size (3GB) |
| `col_flat_state_cache_size` | 134217728 | Flat state cache size (128MB) |
| `block_size` | 16384 | Block size |
| `enable_receipt_prefetching` | true | Enable receipt prefetching |

#### Store `trie_cache`

| Field | Default | Description |
|-------|---------|-------------|
| `default_max_bytes` | 500000000 | Default trie cache max bytes (500MB) |
| `per_shard_max_bytes` | {"s1.v1": 50000000, "s3.v1": 3000000000, ...} | Per-shard cache limits |
| `shard_cache_deletions_queue_capacity` | 100000 | Shard cache deletions queue capacity |

#### Store `view_trie_cache`

| Field | Default | Description |
|-------|---------|-------------|
| `default_max_bytes` | 50000000 | View trie cache max bytes (50MB) |
| `per_shard_max_bytes` | {} | Per-shard view cache limits |
| `shard_cache_deletions_queue_capacity` | 100000 | View shard cache deletions queue capacity |

#### Store `sweat_prefetch_receivers`

Default: `["token.sweat", "vfinal.token.sweat.testnet"]`

#### Store `sweat_prefetch_senders`

Default: `["oracle.sweat", "sweat_the_oracle.testnet"]`

#### Store `claim_sweat_prefetch_config`

Array of prefetch configurations:
```json
[
  {"receiver": "claim.sweat", "sender": "token.sweat", "method_name": "record_batch_for_hold"},
  {"receiver": "claim.sweat", "sender": "", "method_name": "claim"}
]
```

#### Store `load_mem_tries_for_shards`

Default: `[]` (empty array)

#### Store `load_mem_tries_for_tracked_shards`

| Default (RPC) | Default (Validator) | Description |
|---------------|---------------------|-------------|
| false | true | Load in-memory tries for tracked shards |

#### Store `state_snapshot_config`

| Field | Default | Description |
|-------|---------|-------------|
| `state_snapshot_type` | "Enabled" | Snapshot type: "Enabled", "GarbageCollect", "ForcedGarbageCollect", "Rollback", "NoSnapshot", or null |

---

### State Sync Section (`state_sync`)

#### State Sync `sync.ExternalStorage`

| Field | Default | Description |
|-------|---------|-------------|
| `location.GCS.bucket` | "state-parts" | GCS bucket for state parts |
| `num_concurrent_requests` | 25 | Concurrent requests |
| `num_concurrent_requests_during_catchup` | 5 | Concurrent requests during catchup |

---

### Key Differences: RPC vs Validator

| Field | RPC Default | Validator Default |
|-------|-------------|-------------------|
| `tracked_shards_config` | "AllShards" | "NoShards" |
| `load_mem_tries_for_tracked_shards` | false | true |

---

copyright 2026 by sleet.near