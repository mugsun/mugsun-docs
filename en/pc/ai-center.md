# AI center

The AI center is the group of admin console pages for working with large language models: configure models, chat, build knowledge bases and build AI apps.

This page first lists the pages, then shows how to set up the first model and how to make a model answer from the files in a knowledge base.

## Which pages there are

Click "AI Center" in the top navigation. The sidebar has four groups; their names are still shown in Chinese in the English interface, so the table below names them in English.

| Group | Page | What it is for |
| --- | --- | --- |
| Apps | Assistant | Chat with a model, optionally with a knowledge base |
| Apps | Apps | Create AI apps and orchestrate them on a canvas; see [Designers](/en/pc/designer#ai-app-orchestration) |
| Apps | Knowledge bases | Upload files for chats and AI apps to search |
| Apps | Data Q&A | Query a database in plain language and turn results into dashboards |
| Tools | Models | Register chat, embedding, image and audio models |
| Tools | Prompts | Save prompts you use often |
| Tools | MCP toolbox | Register MCP tools for AI apps to call |
| Tools | Vector stores | Register stores that hold vectors; one is built in |
| Tools | Data sources | Register the databases that Data Q&A queries |
| Tools | Message channels | Register WeCom, DingTalk and Feishu bot addresses for sending notifications |
| Operations | API keys | Issue keys to external systems for calling the OpenAI-compatible chat API |
| Operations | Conversations | View and export conversations |
| Operations | Billing | See token usage and cost by day |
| Operations | Quotas and alerts | Set monthly token and cost limits |
| Generators | Mind map and six other pages | Enter what you want and generate content directly |

- Which pages a user sees depends on the menu permissions of their roles.
- Each page also has its own permission code, for example `ai:model:list` for Models.
- On any other page, click "AI" at the right edge of the screen to ask a question; see [the AI assistant on the workbench](/en/pc/workbench#ai-assistant).

## From adding a model to the first chat

<div class="ms-steps">

### Add a model

Open "AI Center → Models", click "Add model" on the "Chat models" tab, fill in the fields below and save.

| Field | What to enter |
| --- | --- |
| Model name | The name shown in the list; it must be unique |
| Provider | Choosing one fills in its default Base URL |
| Base URL | The address of the model service API, starting with `http://` or `https://` |
| Model ID | The model name sent to the model service, for example `deepseek-chat` |
| API Key | The key issued by the model service |

### Test until it is "Activated"

On save, the backend tries one call to the model. If the call works, the card shows "Activated"; otherwise it shows "Not activated".

If it does not work, check the Base URL and API Key, then click "Test" on the card to try again.

### Set it as the default

Click "Set as default" on the card. Only an "Activated" model can be the default, and each model type has one default.

### Start chatting

Open "AI Center → Assistant", click "New chat", type a question and press Enter to send it.

</div>

- A Base URL that points to an intranet or local address is refused on save until you allow it; see [AI outbound allowlist](/en/boot/configuration#ai-outbound-allowlist).
- When you change the Base URL, enter the API Key and Secret Key again.
- "Input unit price" and "Output unit price" are in CNY per 1,000 tokens; Billing uses them to calculate cost.
- A chat without a selected model uses the default model. Without a default, it uses the newest activated model.
- Add embedding, image and audio models on their own tabs. An embedding model also needs "Vector dimensions".

## Make a model answer from your files

A knowledge base cuts uploaded files into small segments. For each question it finds the relevant segments and passes them to the model with the question.

![The Files tab of a knowledge base, listing the segment count and vector status of each file](/screenshots/pc/ai-knowledge-detail.png)

<div class="ms-steps">

### Create a knowledge base

Open "AI Center → Knowledge bases", click "New knowledge base", enter a name and save. The other fields can keep their defaults for now.

### Upload a file

Click the knowledge base card to open its details, click "Upload files" on the "Files" tab, choose a file and click "Upload and vectorize".

The file can be searched once its "Vector status" becomes "Vectorized".

### Run a hit test

Switch to the "Hit test" tab, enter a question and click "Hit test". The segments found and their scores are listed below.

### Use it in a chat

Open "Assistant", choose this knowledge base in "Knowledge base (optional)" at the top, then ask.

"References" under the answer lists the segments that were used.

</div>

::: warning Make sure the embedding model works first
A knowledge base without an embedding model uses the default one. If none is available or the call fails, the backend generates vectors with a local algorithm instead.

"Vector status" still shows "Vectorized" in that case, but vector retrieval works poorly. Test the embedding model in "Models" until it is "Activated" first.
:::

The "Knowledge base" node in app orchestration uses the same knowledge bases; see [Designers](/en/pc/designer#ai-app-orchestration).

### Knowledge base settings

| Field | Default | Notes |
| --- | --- | --- |
| Embedding | The first embedding model | The embedding model that turns files and questions into vectors |
| Retrieval mode | Hybrid | See [Retrieval modes](#retrieval) |
| TopK | 6 | The most segments returned at once, from 1 to 20 |
| Minimum score | 0.35 | Vector retrieval drops segments whose similarity is below it, from 0 to 1 |

"Test" on a knowledge base card runs a hit test without opening the details page.

### Supported files {#files}

| Kind | Extensions | How they are handled |
| --- | --- | --- |
| Documents | `pdf` `docx` `pptx` | The backend extracts the text with Apache Tika |
| Text | `txt` `md` `markdown` `csv` `json` `log` `html` `htm` | The browser reads the text and submits it |

- A single file is limited to 20MB by default.
- Documents have their file header checked; a file whose content does not match its extension is refused.
- OCR is not supported. A scanned file yields no text: "Vector status" shows "Failed" and the "Failure reason" column says why.
- One file is cut into at most 5,000 segments by default. Beyond that the upload is refused; raise "Segment length" and upload again.
- For the settings behind these two limits, see [Configuration](/en/boot/configuration#knowledge-base-upload-limits).

### Segmentation {#segments}

Three fields in the upload dialog decide how a file is cut.

| Field | Default | Notes |
| --- | --- | --- |
| Segmentation | Paragraph | Switches to "Markdown headings" automatically when you choose a `.md` file |
| Segment length | 800 | The most characters in one segment, from 100 to 4000 |
| Overlap | 80 | Characters repeated between neighbouring segments: up to 500, and at most half of the segment length |

| Segmentation | How it cuts |
| --- | --- |
| Markdown headings | Cuts at every heading line; a heading and the content under it form one segment |
| Paragraph | Cuts at every blank line |
| Fixed length | Cuts every "Segment length" characters |
| By line | One line per segment |

- A piece cut by headings, blank lines or lines that is longer than "Segment length" is cut again by fixed length.
- "Overlap" only applies when cutting by fixed length.
- The "Segments" tab lists the content of every segment, and can filter by file.
- With the `ai:kb-seg:edit` permission you can edit a segment; it is re-vectorized automatically after saving.
- After you disable a segment, keyword retrieval no longer uses it. Vector retrieval currently ignores this switch and may still find it.
- "Re-segment" on the "Files" tab cuts the file again with the settings used at upload; segments edited by hand are replaced.

### Vectorization

Files are vectorized automatically on upload, so usually nothing more is needed. The "Vectorization" tab is for catching up and redoing.

- "Start vectorizing (pending only)" only processes segments that have not succeeded yet.
- "Full rebuild" generates the vectors of all enabled segments again; use it after changing the embedding model.
- Vectorization runs synchronously and cannot be paused. It needs the `ai:kb-seg:vector` permission.

### Retrieval modes {#retrieval}

![A hit test result, listing score, source and segment content](/screenshots/pc/ai-knowledge-hit-test.png)

| Retrieval mode | How it searches |
| --- | --- |
| Hybrid | Searches by both vector and keyword, then merges and ranks the two result lists |
| Vector | Turns the question into a vector and finds the segments closest in meaning |
| Keyword | Splits the question into words and finds the segments that contain them |

- "Minimum score" only applies to the vector side; segments found by keyword are not limited by it.
- In hybrid mode, when one side finds nothing, only the other side's results are used. The screenshot above is such a case: only the keyword side found results.
- The "Source" column says which side found the segment: `vector` or `keyword`.
- `+boost` after the source means the score was adjusted once more by how many words of the question appear in the segment.
- When the database has no pgvector extension, "Vector status" shows "Keyword" and only keyword retrieval works.

### Upload through the API {#upload-api}

The page uploads files through the two endpoints below, and other systems can call them directly.

| Endpoint | What it uploads | Request format |
| --- | --- | --- |
| `POST /system/ai/knowledge/asset/upload-file` | `pdf` `docx` `pptx` documents | Form upload with the fields `knowledgeId` and `file` |
| `POST /system/ai/knowledge/asset/upload` | A piece of text, or the download URL of a document | JSON |

```json
{
  "knowledgeId": 1001,
  "fileName": "handbook.txt",
  "contentText": "Leave of up to three days is approved by the department head.",
  "segmentType": "paragraph",
  "segmentLength": 800,
  "segmentOverlap": 80
}
```

- Both endpoints require sign-in and the `ai:kb-asset:upload` permission.
- Replace `contentText` with `fileUrl` and the backend downloads the document at that address and parses it.
- All three segmentation parameters are optional. Without them the text is cut by fixed length, with length 500 and overlap 50.

| `segmentType` | Name on the page |
| --- | --- |
| `markdown` | Markdown headings |
| `paragraph` | Paragraph |
| `length` | Fixed length |
| `newline` | By line |
| `symbol` | Not on the page. Cuts at the separator given in `segmentSymbol`, which can be up to 16 characters |

## Opening a details page that has been deleted

When an old link opens a knowledge base that has been deleted, the page only shows a message that it does not exist or has been deleted, its ID and a back button.

The four pages below, which all take an ID, behave this way:

| Page | Address | Goes back to |
| --- | --- | --- |
| Knowledge base details | `/ai/knowledge/detail/:id` | Knowledge bases |
| Data Q&A configuration | `/ai/dataset/config/:id` | Data Q&A |
| Data Q&A chat | `/ai/dataset/run/:id` | Data Q&A |
| Dashboard design | `/ai/dashboard/design/:id` | Data Q&A |

The ID on the dashboard design page can be a dashboard ID or a Data Q&A ID. The page reports it missing only when neither is found.

## Turning the AI module off

| Where | How | Effect |
| --- | --- | --- |
| Backend environment variable | `MUGSUN_AI_ENABLED=false`, then restart the backend | AI endpoints return 404 and the AI Center disappears from the menu |
| System parameter | Set `ai.module.enabled` to `false` | No restart needed; same effect |
| Admin console build variable | `VITE_ENABLE_AI=false`, then rebuild | The admin console no longer contains the AI Center or the AI assistant |

For the full rules on switch values, see [the two layers of module switches](/en/guide/architecture#two-layers-of-module-switches) on the architecture page.

## Next steps

<div class="ms-cards">

- [Designers](/en/pc/designer#ai-app-orchestration) Connect models and knowledge bases into an AI app on a canvas.
- [AI pre-check node](/en/boot/features/workflow#ai-approval) Let an AI app read a request before it is approved.
- [AI outbound allowlist](/en/boot/configuration#ai-outbound-allowlist) Allow intranet model services before you connect them.

</div>
