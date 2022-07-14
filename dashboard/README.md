This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.tsx`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Environment Variables

| Variable | Relates to | Description |
| - | - | - |
| SIMPLENODEAPP_URL_STAGING  | Simplenodeapp  | URL of Simplenodeapp in staging  |
| SIMPLENODEAPP_URL_PRODUCTION  | Simplenodeapp  | URL of Simplenodeapp in staging  |
| SIMPLENODEAPP_URL_CANARY | Simplenodeapp | URL of Simplenodeapp in staging  |
| JENKINS_URL | Jenkins | URL  |
| JENKINS_USER | Jenkins | Username  |
| JENKINS_PASSWORD | Jenkins | Password  |
| GITEA_URL | Gitea | URL  |
| GITEA_USER | Gitea | Username  |
| GITEA_PASSWORD | Gitea | Password  |
| GITEA_PAT | Gitea | Personal Access Token  |
| GITLAB_URL | Gitlab | URL  |
| GITLAB_USER | Gitlab | Username  |
| GITLAB_PASSWORD | Gitlab | Password  |
| GITLAB_OAUTH | Gitlab | OAuth Token  |
| AWX_URL | AWX | URL  |
| AWX_USER | AWX | Username  |
| AWX_PASSWORD | AWX | Password  |
| KEPTN_API_URL | Keptn API | API URL  |
| KEPTN_API_TOKEN | Keptn API | API Token  |
| KEPTN_BRIDGE_URL | Keptn Bridge | Bridge URL  |
| KEPTN_BRIDGE_USER | Keptn Bridge | Bridge Username  |
| KEPTN_BRIDGE_PASSWORD | Keptn Bridge | Bridge Password  |
| DT_TENANT_URL | Dynatrace | Tenant URL  |
| CLOUD_AUTOMATION_API_URL | Cloud Automation API | API URL  |
| CLOUD_AUTOMATION_API_TOKEN | Cloud Automation API | API Token  |
| CLOUD_AUTOMATION_BRIDGE_URL | Cloud Automation Bridge | Bridge URL  |
| QUALITY_GATES_PROVIDER | Set to KEPTN or CLOUD_AUTOMATION | Define what to use for quality gates  |
| K8S_PROVIDER | Set to MICROK8S | Define what Kubernetes povider is used  |

## Build and push

```
docker build . -t ace-box-dashboard:<tag>
```

```
docker run -p 3000:3000 --env-file ./.env.example ace-box-dashboard:<tag>
```
