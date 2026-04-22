# SCHEMA

JSON files validated by this schema:
- `config.rpc.json`
- `config.validator.json`

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

copyright 2026 by sleet.near