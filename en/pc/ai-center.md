# AI center pages

Conventions for the admin AI module (models, chat, knowledge bases, MCP, and more).

Knowledge-base assets now accept PDF / Word / PPT uploads with server-side text extraction. This page states the API, allow-list, and failure rules.

Approval flows can embed an enabled workflow / chatflow app as an AI pre-check; see [Workflow · AI pre-check](/en/boot/features/workflow#ai-approval).

## Opening a detail page that does not exist

If you open an AI detail page by its ID (knowledge base detail, dataset config, dataset chat, dashboard designer) and that ID does not exist or has been deleted, the page shows only "… 不存在或已删除" (does not exist or was deleted), the ID and a button back to the list. It no longer renders a blank page you can edit, upload to or save, and no error message pops up.

| Page | Path | Back to |
| --- | --- | --- |
| Knowledge base detail | `/ai/knowledge/detail/:id` | Knowledge base list |
| Dataset config | `/ai/dataset/config/:id` | Dataset list |
| Dataset chat | `/ai/dataset/run/:id` | Dataset list |
| Dashboard designer | `/ai/dashboard/design/:id` | Dataset list |

The dashboard designer accepts either a dashboard ID or a dataset ID (a new dashboard is created when you come from the dataset list). It shows "does not exist or was deleted" only when neither is found.

## Knowledge-base document parsing (PDF / DOCX / PPTX)

On the knowledge-base detail page you can upload office documents. The server extracts plain text with Apache Tika, then uses the existing chunking and embedding path. Hit-test / chat retrieval still follows the knowledge base `retrievalMode` (`vector` / `keyword` / `hybrid`; hybrid uses RRF).

Route: `/ai/knowledge/detail/:id`.

### Upload APIs

| Mode | Method / path | Notes |
| --- | --- | --- |
| multipart (new) | `POST /system/ai/knowledge/asset/upload-file` | Fields: `knowledgeId`, `file`; optional `segmentLength` / `segmentOverlap` / `segmentType` / `segmentSymbol` |
| JSON (unchanged) | `POST /system/ai/knowledge/asset/upload` | Paste `contentText`, or set `fileUrl` (http/https; bytes are downloaded then run through Tika) |

Common gateway prefix: `/api/system/ai/knowledge/asset/...`.

Both require permission `ai:kb-asset:upload` (login required). Put the token in the `Authorization` header — never in the query string.

`upload-file` is on the default multipart allow-list
`mugsun.security.multipart.allowed-paths`
(alongside attachment, avatar, and the other defaults; if you replace the list in yml, keep all six defaults).

JSON `fileUrl` no longer treats binary as a UTF-8 string; downloads go through Tika too. Plain text can still use `contentText`.

### Allow-list and size

| Item | Rule |
| --- | --- |
| Extensions | `pdf` / `docx` / `pptx` only (case-insensitive) |
| Checks | Extension + plausible MIME + magic bytes; fake suffixes rejected |
| Default limit | 20MB (`20971520` bytes) |
| Config key | `mugsun.ai.kb.max-upload-bytes` (≤0 falls back to 20MB) |

The console also accepts text files (`txt` / `md` / `csv` / `json` / `log` / `html`) via JSON upload; those do not use the document multipart path.

### Success and failure

1. **Success**: extract text → chunk with segment params → embed;
   asset `vectorStatus=success`, `failReason` cleared.
2. **Failure**: keep the asset row with `vectorStatus=failed` and a
   readable `failReason` (about 500 chars max); **no fake segments**.
3. Scanned / empty docs that yield no text report that OCR is unsupported
   and stay failed.
4. The list can show the failure reason; while `pending`, the console
   polls progress; the segment list can filter by asset.

### Dependencies and isolation

- AI module: `tika-core` + `tika-parsers-standard-package` (~3.2.x).
- OCR modules (`tika-parser-ocr-module`, `tess4j`) are excluded; this cut
  does not add OCR.
- Knowledge extraction uses a dedicated `AutoDetectParser`.
- MIME detection for x-file-storage (object storage / track uploads, etc.)
  is fixed to MimeTypes (magic + extension) and does **not** load parsers
  Detector SPI, so gzip streams are not rejected by
  `DefaultZipContainerDetector` as `ArchiveException` (track upload 500).

### Out of scope for this cut

- OCR (scanned PDFs without a text layer fail)
- RAG evaluation sets / automated eval pipelines
- AGPL dependencies

### Related commits

- boot feature [`50562334e2d941e9a888519ef8ab05dddb8b64b8`](https://github.com/mugsun/mugsun-boot/commit/50562334e2d941e9a888519ef8ab05dddb8b64b8)
- boot fix [`8c2851e17a26cdc10c71a39a1a1d56afd3087361`](https://github.com/mugsun/mugsun-boot/commit/8c2851e17a26cdc10c71a39a1a1d56afd3087361)
- pc [`8b123c5db7b75fa48c1c2f2d5f2736d911278df1`](https://github.com/mugsun/mugsun-pc/commit/8b123c5db7b75fa48c1c2f2d5f2736d911278df1)

## Related

- [Features overview](/en/boot/features/) (AI row)
- [Configuration](/en/boot/configuration#ai-outbound-allowlist) (outbound / local models)
- [Form validation](/en/pc/form-validation) (AI center form items)
