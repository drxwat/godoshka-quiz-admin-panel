# .env.local

```
VITE_SUPABASE_PROJECT_URL=url
VITE_SUPABASE_PUBLIC_KEY=key
```

# Generate types

`npx supabase gen types typescript --project-id !!!SUPABASE_PROJECT_ID!!! --schema public > src/core/client/database.types.ts`
