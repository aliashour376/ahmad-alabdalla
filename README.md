# Ahmad Al Abdalla

Lebanon-first website for Ahmad Al Abdalla.

## Commands

```powershell
npm install
npm run dev
npm run build
```

The site uses real public brand/menu content gathered from the incumbent website, Instagram metadata, and the deployed Lebanon menu app.

## Cloudflare Pages

Staging is deployed to the `staging` branch of the Cloudflare Pages project. It does not modify the production domain or DNS.

```powershell
npx wrangler login
npm run deploy:staging
```

The Pages project uses:

- Project name: `ahmad-alabdalla`
- Build command: `npm run build`
- Build output: `dist`
- Node.js: 24

### Rollback

List previous deployments in Cloudflare Dashboard under **Workers & Pages > ahmad-alabdalla > Deployments** and select **Rollback to this deployment** for the last verified build.

For a source rollback, revert the faulty commit on `main`, rebuild, and run `npm run deploy:staging` again. Do not connect `ahmadalabdalla.com` until staging has passed final review.
