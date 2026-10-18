# Workbench and UI details

## Workbench

- **Users per tenant**: the x-axis shows the tenant name instead of the tenant code. The name returned by the backend API is used first; when the API only returns a code, the name is looked up from the tenant list, and the platform tenant `000000` is shown as "Platform" if it has no name. Only platform super admins or accounts that can view all data see this chart. If the tenant list cannot be loaded, the codes are shown and the chart still renders.
- **Changelog card**: the top shows the current version (from the admin console's `package.json`) and a "View changelog" link. Below it, the latest 6 records from System → Changelog are listed newest first, each with its date, type (New / Improved / Fixed), version and title. With no records yet, the card says "No updates yet. New releases will appear here." If loading fails, the card shows an error message, an error ID and a "Retry" button instead of a global toast; the error ID is the request's `X-Trace-Id`, so you can look it up in the backend logs. The current version does not depend on the API and is shown even when loading fails. The data comes from `GET /system/changelog/recent`, which any signed-in user can read regardless of their tenant package.
- **First-login settings tip**: a bubble saying "click here for theme styles and the top menu" appears once under the settings icon at the top right. It is right-aligned to the settings icon with a gap below the top bar, so it does not cover the notification or settings buttons. It closes, and does not come back, when you click "Got it", click anywhere on the page, open the settings panel, or leave it alone for 8 seconds. It is not shown on screens narrower than 640px.

## AI assistant entry

Above the "Help" tab on the right edge is a small "AI" tab that opens the AI assistant drawer. It sits against the right edge of the screen and no longer covers the pager at the bottom right of lists or the coordinate readout at the bottom right of the map.

### AI assistant drawer

- **Width**: 560px by default. Drag the left edge to resize it between 420 and 800px; the width is remembered. When the window is 640px wide or less, the drawer fills the screen. The full screen button in the top bar also toggles full screen.
- **Top bar**: Click the title to open your chat history, grouped into today, this week and earlier. You can search, rename, export, clear and delete chats there. On the right are New chat, Full screen and Close.
- **Messages**: Your questions sit on a light primary-colour background; AI replies have no bubble. Code blocks show the language name and a copy button at the top, and long code scrolls sideways inside the block.
- **Errors and retry**: When a reply fails, an error message and a Retry button appear under it, and retrying replaces that reply in place. There is no Regenerate button yet. If the reply failed partway through, the question has already been saved, so after a retry the history shows the same question twice when you reload it.
- **Composer**: Press Enter to send and Shift+Enter for a new line. While a reply is being generated, the send button turns into a stop button. Below the input you can pick the model and knowledge base; when space is tight they move into a Settings button. If no model is configured yet, a notice appears at the top of the drawer, and accounts that can manage models see a "Configure" link.
- **Empty state**: A new chat shows 4 example questions; click one to fill it in and send it.
- **Keyboard**: When the drawer opens, focus is in the input. Tab moves through the title, New chat, Full screen, Close, the message list, the Copy button under each message (Retry on a failed answer), the input, model, knowledge base and Send. The Copy button on your own messages is hidden until it gets focus. Esc closes the drawer and returns focus to the AI button.
- **Loading**: The drawer's content loads on demand. The first time you open the drawer, the top bar appears straight away. If loading takes longer than 200ms, a spinner and "Loading AI assistant…" appear below it, so there is no flash when it loads quickly. While loading, the title is a placeholder bar and New chat and Full screen can't be clicked yet.
- **Load failure and retry (including timeouts)**: If loading fails, or takes longer than 15 seconds (a timeout counts as a failure), the drawer shows an error message and a Retry button rather than just a toast. Click Retry to load the drawer again. While in this state the top bar shows the title "AI Assistant" and hides New chat and Full screen.
- **Automatic reload fallback**: If loading fails twice in a row (timeouts included), or the file that failed is a stylesheet or another file the drawer depends on (usually right after a new release has replaced the old files), retrying can't fix it, so the page reloads once to pick up the new version. The page reloads automatically at most once per outage: if loading still fails after the reload, the error message stays; check your network and click Retry, or reload the page yourself. The outage only counts as over once the drawer loads successfully, so a later outage can trigger one automatic reload again. Closing the drawer stops automatic reloads: any load still in progress is abandoned, so a later timeout or failure is not counted and does not reload the page, and forms you are filling in are left alone.
- **Can always be closed**: Whether the drawer is loading, has failed to load or is working normally, the Close button sits in the same place on the right of the top bar and always works. Esc closes it too. Focus returns to the AI button afterwards. On narrow screens the Close button's tap area grows to 44×44.

## Narrow screens (≤ 640px)

- The "Help" and "AI" tabs shrink to translucent strips so they cover less of the cards.
- The AI assistant uses a single column: the session list is hidden by default, tapping "会话" (Sessions) at the top left opens it as an overlay, and picking a session closes it again. The model and knowledge base selects each take half a row.
- In Tracking → User lookup, the time range box takes the full row and shows minutes only, so the seconds are no longer cut off.
- On the map page, the status bar at the bottom right drops the long usage hint and shows only coordinates and place names. It keeps clear of the zoom buttons and scale bar at the bottom left and of the AI button at the bottom right.

## Editing changelog entries

In System → Changelog, the body editor in the create / edit dialog is 320px tall.

## Request cancellation on navigation

When you switch routes, the console cancels requests from the previous page that have not returned yet, so stale data does not land on the new page. Cancelled requests show no message and no longer appear in the console as an uncaught "请求已取消" (request cancelled) error, which used to be visible when leaving pages such as the form designer. New pages do not need a separate `catch` for cancellation.
