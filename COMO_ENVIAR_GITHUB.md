# MINI GUIA — ALTERAR E ENVIAR PARA O GITHUB
 1. Antes de tudo (sempre)
git status
git pull origin main
 2. Após alterar arquivos
git add .
git commit -m "descrição objetiva da alteração"
 3. Enviar para o GitHub
git push origin main

## SE DER ERRO (rejeitado / conflito)
Resolver rápido mantendo seu código:
git pull origin main --allow-unrelated-histories
git checkout --ours .
git add .
git commit -m "resolve conflitos"
git push origin main --force

REGRAS PRA NÃO SE FERRAR DE NOVO
# NUNCA fazer isso em projeto já existente:
git init

# SEMPRE começar assim:
git clone <repo>

# SEMPRE rodar antes de subir:
git pull origin main