# Designers

## AI app orchestration (workflow / text / chat flow)

- **Connecting nodes**: drag from a node's output handle on the right to another node's input handle on the left. Edges have arrows. A node cannot connect to itself, and the same pair of nodes is never connected twice.
- **One start and one end node**: the canvas allows only one Start and one End node; dropping another one shows a warning and is ignored.
- **Validation on save**: saving checks that the flow has exactly one Start and one End node, that every node except Start has an incoming edge, and every node except End has an outgoing edge. Otherwise the reason is shown and nothing is saved.

## Flow definition designer

- Flow code and flow name are required. Clicking "Publish Flow" with them empty marks the fields in red and shows a summary message.
- The former "Deploy Flow" button is now "Publish Flow", and the success message is "Flow published".
- The "+ Candidate" and "Delete" buttons on approval nodes now have a light background so they stay readable on the blue node.
