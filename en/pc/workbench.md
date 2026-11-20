# Workbench

The workbench is the first page after sign-in. It gathers statistics, your tasks and announcements. The AI assistant opens from the right edge of the screen.

![The workbench after sign-in](/screenshots/pc-workbench.png)

## What is on the workbench

| Area | Content |
| --- | --- |
| Stat cards | Number of users, departments and roles, plus your open tasks. Click a card to open its page |
| User Status Distribution | How many users are enabled and how many are disabled |
| Users per Tenant | Number of users in each tenant |
| My Todos | Workflow tasks waiting for you, up to 6 |
| Announcements | The latest 6 announcements, with the unread count beside the title |
| Changelog | The current version and the latest 6 release records |
| Shortcuts | Links to frequently used pages. Each user picks their own |

- The stat cards and the user status chart count the current tenant only.
- "Users per Tenant" appears only for the platform super administrator, or while viewing all tenants.
- The horizontal axis shows tenant names. The platform tenant `000000` shows as "Platform" when it has no name.

## Changelog card

The top of the card shows the current version, taken from `version` in the admin console's `package.json` at build time.

Below it are the latest 6 records, newest first. Each record has a date, a type, a version and a title.

| What you see | Meaning |
| --- | --- |
| "Not installed" tag | The version of this record is newer than the current version |
| "vX available" | The list has records newer than the current version. vX is the highest of them |
| "View changelog ↗" | Opens `CHANGELOG.md` of the mugsun-pc repository in a new tab |
| Error message and "Retry" | The records failed to load. The current version does not depend on the API and still shows |

- Write versions in three parts such as `1.2.3`. A `v` prefix is allowed.
- Forms such as `1.x` or `1.2` are not compared, and the record gets no "Not installed" tag.
- The error ID in the message is the `X-Trace-Id` of the request. Use it to find the request in the backend log.
- When the network is down, the request never reaches the backend, so the log has no such ID.

Records are maintained under "System Settings → Changelog", which requires the `sys:changelog:manage` permission.

The card reads `GET /system/changelog/recent`. Any signed-in user can read it, regardless of menu permissions and tenant packages.

## Shortcuts

Click "Edit" at the top right of Shortcuts, tick the pages you want on the workbench, then click "Save".

- There are 16 candidate pages. Only those the current account can open are listed.
- Before you configure anything, the default 6 are shown.
- The selection is stored per user on the backend, so it follows you to another browser or computer.

## The settings hint on first sign-in

On first sign-in, a bubble appears below the settings icon at the top right. It says you can change the theme and turn on the top menu here.

- Clicking "Got it", clicking anywhere on the page, or opening the settings panel closes the bubble.
- With no action for 8 seconds, the bubble closes by itself. Once closed, it does not appear again.
- It does not appear when the window is 640px wide or less. It also does not appear when the account must change its password first.

## AI assistant {#ai-assistant}

Two small tabs sit on the right edge of the screen: "AI" on top and "Help" below. Click "AI" to open the AI assistant drawer.

The AI assistant belongs to the optional AI module. Configure a model in the [AI center](/en/pc/ai-center) first.

### Asking a question

- Press Enter in the input box to send, and Shift+Enter for a new line. While a reply is being generated, the send button becomes a stop button.
- Below the input box you can pick a model and a knowledge base. When the drawer is narrow, both move into the "Settings" button.
- A new chat shows 4 example questions. Click one to fill it in and send it.
- When no model is configured yet, the top of the drawer says so. Accounts with model management permission can click "Configure".
- Code blocks in replies show the language name and a copy button.

### When a reply fails

An error message and a "Retry" button appear below the failed reply.

The retried reply replaces the failed one, and your question does not appear twice in the history.

### Chat history

Click the title at the top of the drawer to open the chat history. Chats are grouped into "Today", "Past 7 days" and "Earlier", and can be searched.

Each chat can be renamed, exported, cleared or deleted. To the right of the title are the new chat, full screen and close buttons.

### Width and keyboard

| Item | Description |
| --- | --- |
| Default width | 560px |
| Resizing | Drag the left edge of the drawer, between 420 and 800px. The width is remembered |
| Full screen | Click the full screen button at the top. The drawer is always full screen when the window is 640px wide or less |
| Focus after opening | In the input box |
| Esc | Closes the drawer and returns focus to the "AI" tab |
| Tab | Moves through the top buttons, the message area, the input box and the send button |

The copy button of a user message is hidden by default and appears when Tab reaches it.

### When the drawer fails to load {#drawer-load-failed}

The drawer content loads the first time you open it. Loading that takes more than 15 seconds counts as a failure.

- When loading fails, the drawer shows an error message and a "Retry" button.
- After 2 failures in a row, the page refreshes once automatically. When a stylesheet fails, it refreshes on the first failure.
- This usually happens right after a new release, when old files have been replaced. A refresh loads the new files.
- The page refreshes automatically at most once. If loading still fails after that, the error message stays. Check the network, then retry.
- The page does not refresh automatically after the drawer is closed, so a form you are filling in is not affected.

Whether the drawer is loading, has failed to load or is in normal use, the close button at the top right and Esc both close it.

## Changes on narrow screens

When the window is 640px wide or less, several parts of the UI adjust:

| Where | Change |
| --- | --- |
| The "Help" and "AI" tabs on the right | Shrink into thin, semi-transparent strips |
| Assistant page | Switches to a single column. The conversation list is collapsed; click "Conversations" at the top left to expand it |
| "User Drilldown" in analytics | The time range box takes the full row and shows minutes only |
| The status bar at the bottom right of the map page | Shows only coordinates and the place name, without operation hints |

## Requests are canceled when you switch pages

When you switch to another page, requests from the previous page that have not returned are canceled, so stale data never fills the new page.

Canceled requests show no message and raise no error in the console. New pages do not need a separate `catch` for cancellation.

## Next steps

<div class="ms-cards">

- [AI center](/en/pc/ai-center) Configure models and knowledge bases so the AI assistant can answer.
- [Workflow](/en/boot/features/workflow) Where the workflow tasks in "My Todos" come from.
- [Messages and announcements](/en/boot/features/message) How the announcements under "Announcements" are sent.

</div>
