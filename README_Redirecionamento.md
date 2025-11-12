# Tutorial 1 – Configuração do Nginx para corrigir redirecionamento em aplicativo ReactJS

## 1. Estrutura de arquivos

```
/app
├─ Dockerfile
├─ nginx.conf
├─ build/ ← resultado de npm run build da aplicação React
```

---

## 2. nginx.conf

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # opcional: configuração de cache, cabeçalhos etc
}
```

---

## 3. Dockerfile

```dockerfile
# build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 4. Montagem via docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

---

## 5. Construção e execução

```bash
docker-compose build
docker-compose up -d
```

---

## 6. Teste

- Acesse **http://localhost/** → a home da aplicação deve carregar normalmente.  
- Acesse **http://localhost/alguma-rota** → deve continuar funcionando, sem erro 404, com roteamento interno do React.  
- Se recarregar em **/alguma-rota**, a página deve funcionar e não retornar erro 404.

---

## Considerações finais

- Verifique se o caminho de **root** e o diretório **build** no container estão corretos.  
- Se estiver rodando **fora do Docker**, ajuste o arquivo em `/etc/nginx/sites-available/...` e reinicie o Nginx com:

```bash
sudo systemctl reload nginx
```
