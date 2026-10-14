# Workbench and UI details

## Workbench

- **Users per tenant**: the x-axis shows the tenant name instead of the tenant code. The name returned by the backend API is used first; when the API only returns a code, the name is looked up from the tenant list, and the platform tenant `000000` is shown as "Platform" if it has no name. Only platform super admins or accounts that can view all data see this chart. If the tenant list cannot be loaded, the codes are shown and the chart still renders.
- **First-login settings tip**: a bubble saying "click here for theme styles and the top menu" appears once under the settings icon at the top right. It is right-aligned to the settings icon with a gap below the top bar, so it does not cover the notification or settings buttons. It closes, and does not come back, when you click "Got it", click anywhere on the page, open the settings panel, or leave it alone for 8 seconds. It is not shown on screens narrower than 640px.

## AI assistant entry

Above the "Help" tab on the right edge is a small "AI" tab that opens the AI assistant drawer. It sits against the right edge of the screen and no longer covers the pager at the bottom right of lists or the coordinate readout at the bottom right of the map.

## Narrow screens (≤ 640px)

- The "Help" and "AI" tabs shrink to translucent strips so they cover less of the cards.
- The AI assistant uses a single column: the session list is hidden by default, tapping "会话" (Sessions) at the top left opens it as an overlay, and picking a session closes it again. The model and knowledge base selects each take half a row.
- In Tracking → User lookup, the time range box takes the full row and shows minutes only, so the seconds are no longer cut off.
- On the map page, the status bar at the bottom right drops the long usage hint and shows only coordinates and place names. It keeps clear of the zoom buttons and scale bar at the bottom left and of the AI button at the bottom right.

## Editing changelog entries

In System → Changelog, the body editor in the create / edit dialog is 320px tall.

## Request cancellation on navigation

When you switch routes, the console cancels requests from the previous page that have not returned yet, so stale data does not land on the new page. Cancelled requests show no message and no longer appear in the console as an uncaught "请求已取消" (request cancelled) error, which used to be visible when leaving pages such as the form designer. New pages do not need a separate `catch` for cancellation.
