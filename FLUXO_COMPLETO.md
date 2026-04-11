# 🔄 Fluxo Completo - Turnstile com GitHub Actions

## Diagrama de Deploy e Proteção

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SETUP INICIAL (Uma vez)                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. Cloudflare Dashboard → Criar Turnstile Site                    │
│     ├─ Site Key (pública)                                          │
│     └─ Secret Key (privada)                                        │
│                                                                     │
│  2. Cloudflare Dashboard → API Tokens                              │
│     └─ Create Token (Edit Cloudflare Workers)                      │
│                                                                     │
│  3. GitHub Repo → Settings → Secrets                               │
│     ├─ TURNSTILE_SITE_KEY                                          │
│     ├─ TURNSTILE_SECRET_KEY                                        │
│     ├─ CF_API_TOKEN                                       │
│     └─ TURNSTILE_WORKER_URL (após primeiro deploy)                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                     DEPLOY AUTOMÁTICO (CI/CD)                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Developer                                                          │
│     │                                                               │
│     │ git push origin main                                          │
│     ▼                                                               │
│  GitHub Actions                                                     │
│     │                                                               │
│     ├──► Workflow 1: Deploy Cloudflare Worker                      │
│     │    ├─ Detecta mudanças em cloudflare-worker/**              │
│     │    ├─ Autentica com CF_API_TOKEN                    │
│     │    ├─ Injeta TURNSTILE_SECRET_KEY                           │
│     │    ├─ wrangler deploy                                        │
│     │    └─ ✅ https://turnstile-validator.xxx.workers.dev        │
│     │                                                               │
│     └──► Workflow 2: Deploy MkDocs                                 │
│          ├─ Injeta TURNSTILE_SITE_KEY                             │
│          ├─ Injeta TURNSTILE_WORKER_URL                           │
│          ├─ mkdocs build                                           │
│          └─ mkdocs gh-deploy                                       │
│                                                                     │
│  GitHub Pages                                                       │
│     └─ ✅ https://bernardolankheet.github.io                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    PROTEÇÃO EM RUNTIME                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Usuário                                                            │
│     │                                                               │
│     │ Acessa bernardolankheet.com.br                                │
│     ▼                                                               │
│  Browser                                                            │
│     │                                                               │
│     ├─ Verifica localStorage (cache 24h)                           │
│     │                                                               │
│     ├─ Se válido ────────────────────┐                             │
│     │                                 │                             │
│     └─ Se expirado                    │                             │
│         │                             │                             │
│         ├─ Mostra overlay azul        │                             │
│         ├─ Renderiza Turnstile        │                             │
│         │                             │                             │
│         │ Usuário resolve captcha     │                             │
│         ▼                             │                             │
│      Turnstile API                    │                             │
│         │                             │                             │
│         └─ token                      │                             │
│            │                          │                             │
│            ▼                          │                             │
│      Cloudflare Worker                │                             │
│         │                             │                             │
│         ├─ POST /validate             │                             │
│         ├─ Valida com TURNSTILE_      │                             │
│         │  SECRET_KEY                 │                             │
│         └─ { success: true,           │                             │
│              validUntil: +24h }       │                             │
│            │                          │                             │
│            ▼                          │                             │
│      localStorage                     │                             │
│         │                             │                             │
│         └─ Cache por 24h              │                             │
│            │                          │                             │
│            └──────────────────────────┘                             │
│                       │                                             │
│                       ▼                                             │
│                   Site liberado                                     │
│                 (remove overlay)                                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                          SEGURANÇA                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ✅ TURNSTILE_SECRET_KEY                                           │
│     ├─ Nunca no código-fonte                                       │
│     ├─ Apenas no GitHub Secrets                                    │
│     └─ Injetado no Worker via CI/CD                                │
│                                                                     │
│  ✅ Validação Server-Side                                          │
│     ├─ Impossível forjar validação no browser                      │
│     └─ Worker valida com Cloudflare Turnstile API                  │
│                                                                     │
│  ✅ CORS Configurado                                               │
│     └─ Apenas origens permitidas                                   │
│                                                                     │
│  ✅ Cache com Expiração                                            │
│     └─ localStorage limpa após 24h                                 │
│                                                                     │
│  ✅ Rate Limiting                                                  │
│     └─ Turnstile limita tentativas por IP                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 📊 Arquivos do Projeto

```
bernardolankheet.github.io/
│
├── .github/
│   └── workflows/
│       ├── deploy.yml           # Deploy MkDocs → GitHub Pages
│       └── deploy-worker.yml    # Deploy Worker → Cloudflare ⭐ NOVO
│
├── cloudflare-worker/
│   ├── src/
│   │   └── index.js             # Validador server-side
│   ├── wrangler.toml            # Config do Worker
│   ├── package.json
│   └── README.md
│
├── docs/
│   └── overrides/
│       └── main.html            # Template com overlay + Turnstile
│
├── mkdocs.yml                   # Config com env vars
│
├── QUICK_START_TURNSTILE.md    # Setup rápido
├── TURNSTILE_SETUP.md           # Docs completa
├── GITHUB_ACTIONS_WORKER.md     # Deploy via CI/CD ⭐ NOVO
├── CHECKLIST_TURNSTILE.md       # Checklist passo a passo
└── Readme.md
```

## 🎯 Vantagens do Deploy via GitHub Actions

| Aspecto | Manual (wrangler CLI) | GitHub Actions ⭐ |
|---------|----------------------|-------------------|
| Setup local | Requer Node.js + wrangler | Não requer nada |
| Autenticação | `wrangler login` toda vez | Token configurado uma vez |
| Deploy | Manual via comando | Automático no push |
| Secrets | `wrangler secret put` | GitHub Secrets UI |
| Logs | Terminal local | Interface web do GitHub |
| CI/CD | Não integrado | Totalmente integrado |
| Rollback | Manual | Via interface Cloudflare |

## 🚀 Resumo do Fluxo Ideal

1. **Setup inicial** (5 min)
   - Criar Turnstile no Cloudflare
   - Gerar API Token
   - Adicionar 4 secrets no GitHub

2. **Push código** (30 seg)
   ```bash
   git push origin main
   ```

3. **GitHub Actions faz tudo** (2-3 min)
   - Deploy Worker automaticamente
   - Build MkDocs com secrets injetados
   - Deploy no GitHub Pages

4. **Site protegido!** 🎉
   - Overlay aparece para novos visitantes
   - Turnstile valida
   - Cache por 24h

## 📈 Monitoramento

- **GitHub Actions:** Actions tab → Ver logs de deploy
- **Cloudflare Analytics:** Dashboard → Turnstile → Estatísticas
- **Worker Logs:** `wrangler tail` (se tiver CLI instalado)

---

**Zero esforço de manutenção após setup inicial!** ✨
