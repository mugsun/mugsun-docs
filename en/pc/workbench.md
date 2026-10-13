# Workbench and UI details

## Workbench

- **Users per tenant**: the x-axis shows the tenant name instead of the tenant code; the platform tenant `000000` is shown as "Platform". Only platform super admins or accounts that can view all data see this chart. If the tenant list cannot be loaded, the codes are shown and the chart still renders.
- **First-login settings tip**: a bubble saying "click here for theme styles and the top menu" appears once under the settings icon at the top right. It is right-aligned to the settings icon with a gap below the top bar, so it does not cover the notification or settings buttons. It closes, and does not come back, when you click "Got it", click anywhere on the page, open the settings panel, or leave it alone for 8 seconds. It is not shown on screens narrower than 640px.

## Narrow screens (≤ 640px)

- The "Help" tab on the right shrinks to a translucent icon-only strip, and the "AI" button at the bottom right becomes smaller and moves closer to the edge, so they cover less of the cards.
- On the map page, the status bar at the bottom right drops the long usage hint and shows only coordinates and place names. It keeps clear of the zoom buttons and scale bar at the bottom left and of the AI button at the bottom right.

## Editing changelog entries

In System → Changelog, the body editor in the create / edit dialog is 320px tall.

## Request cancellation on navigation

When you switch routes, the console cancels requests from the previous page that have not returned yet, so stale data does not land on the new page. Cancelled requests show no message and no longer appear in the console as an uncaught "请求已取消" (request cancelled) error, which used to be visible when leaving pages such as the form designer. New pages do not need a separate `catch` for cancellation.
