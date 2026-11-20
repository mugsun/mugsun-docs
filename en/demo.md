# Live demo

ms-ui, the mobile component library, has a live demo you can open right away. The admin console and the tracking dashboards have no public demo site yet, so you run them on your machine with Docker.

<div class="ms-cards">

- [Run it on your machine](#local) Three commands start the backend and the admin console. The database and Redis run in containers too.
- [Mobile component demo](#ms-ui) Try the ms-ui components in your browser without installing anything.
- [Deploy a read-only demo site](#readonly) Open your own deployment to visitors who cannot change any data.

</div>

## Run it on your machine {#local}

All you need is Docker (Compose v2.17+). The first run builds the images, so it takes a while.

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose -f docker-compose.full.yml up -d --build
docker compose -f docker-compose.full.yml run --rm init show
```

The last command shows the initial password of `admin`. Open <http://127.0.0.1:8088> and sign in. The first sign-in asks you to change the password.

![The workbench you see after signing in](/screenshots/pc-workbench.png)

After signing in, these are good places to start:

| What you want to see | Menu |
| --- | --- |
| Users, roles and menu permissions | System settings |
| Flow design and approvals | Workflow |
| Maps, layers and 3D scenes | GIS |
| Traffic, performance and session replay | Tracking |

The admin console uses the analytics SDK itself. After you open a few pages, the Tracking menu shows the visits you just made.

To change the port or the time zone, or to start from source, see [Getting started](/en/guide/getting-started).

## Mobile component demo {#ms-ui}

The ms-ui demo project is compiled to H5 and hosted on this site.

![Four pages of the demo project](/readme/uniappx-demo.png)

There are two ways to look at it:

- Try the demos on the component pages, starting with [Button](/en/uniappx/components/button). On wide screens the demo runs in the phone frame on the right of the page.
- Open the <a href="/demo/index.html" target="_blank">full demo project</a> in a new tab. Its home page lists every demo page by group.

On narrow screens the component pages have no phone frame. Tap the H5 demo bar at the bottom instead.

## Deploy a read-only demo site {#readonly}

To open your own deployment to other people, use the backend's read-only demo mode. Visitors can sign in and open every page, but every change is rejected.

<div class="ms-flow ms-flow--3">

1. Prepare the visitor account and the data you want to show in normal mode.
2. Generate the passwords of three low-privilege database accounts.
3. Start again with `docker-compose.demo.yml` on top.

</div>

For the commands of each step, the requests that get through and what to watch in operation, see [Read-only demo mode](/en/boot/demo-mode).

## Next steps

<div class="ms-cards">

- [Getting started](/en/guide/getting-started) Change the port and the time zone, or start the backend and the admin console from source.
- [Your first event](/en/track/first-event) Add the analytics SDK to your own page and see the first record on the dashboard.
- [ms-ui](/en/uniappx/) How to use the component library, with a page for every component.
- [Read-only demo mode](/en/boot/demo-mode) Deploy a demo site where visitors cannot change any data.

</div>
