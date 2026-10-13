# Live demo

## Try the admin console and analytics locally

Run the full backend on your machine with these commands (requires Docker and JDK 21):

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose up -d
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

For the console (pc) and verification steps see [Getting started](/en/guide/getting-started). Credentials follow the [boot README](https://github.com/mugsun/mugsun-boot/blob/main/README_EN.md)—**change the password on first login**.

## uni-app x (ms-ui) component H5

Component pages show a phone frame (bottom-right) that embeds the hosted H5 preview (`/demo/index.html`). Example: [Button](/en/uniappx/components/button).

Full H5 entry: [Open ms-ui demo](/demo/index.html) (new tab).

## External showcases

Host a read-only environment with non-production secrets. Next: [Getting started](/en/guide/getting-started) · [Security checklist](/en/boot/security-checklist) · [ms-ui](/en/uniappx/)
