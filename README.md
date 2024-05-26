# Alfred workflows spec

> [!NOTE]
> Current status: WIP
> Check [`alfred.ts`](./alfred.ts)

## Usage

### 1. Download all alfred workflows

<img alt="downloaded" src="./docs/images/downloaded.png" width="500">

dependencies: `curl`, `parallel`, `htmlq`

```bash
./download_alfred_workflows.sh
```

### 2. Extract info.plist for inspection and analysis

dependencies: `find`, `parallel`

```bash
./extract_info_plist.sh
```

### 3. Extract all possible keys from info.plist

dependencies: `bun`

```bash
bun install
bun run analysis/01_extract_keys.js
```

This would update the `all_keys.json` file

### 4. Run the value checker repl to update the typing in `alfred.ts`

![downloaded](./docs/images/repl.png)

```bash
bun run analysis/02_query_values.js
```
