# Isaac 1 ano

Landing page mobile first para confirmação de presença do aniversário de 1 ano do Isaac, com tema Arca de Noé.

## Rotas

- `/` - convite digital e formulário de RSVP
- `/dashboard` - painel simples de confirmações
- `/api/rsvp` - gravação das respostas

## Supabase

1. Crie um projeto no Supabase.
2. Rode o SQL em `supabase/schema.sql` no SQL Editor.
3. Copie `.env.example` para `.env.local`.
4. Preencha:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

O projeto usa `SUPABASE_SERVICE_ROLE_KEY` somente no servidor para gravar RSVP, evitar duplicidade por telefone e carregar o dashboard.

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run build
```
