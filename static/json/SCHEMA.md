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

add deatils about every feild of the config file here, and the defulats for rpc vs validator

---

copyright 2026 by sleet.near