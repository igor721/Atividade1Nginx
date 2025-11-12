# Tutorial 2 – Configuração do Apache Bench e execução de teste de carga na Home da aplicação React da Cafeteria

## ⚙️ 1. Estrutura do Projeto com Docker
A aplicação React e o Nginx já estão configurados em containers (conforme o tutorial de redirecionamento).
Agora, adicionaremos um container para executar o **Apache Bench**.

### Estrutura dos arquivos:
```
Atividade1Nginx/
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── build/
├── README_Redirecionamento.md
└── README_AB.md
```

### docker-compose.yml
```
version: '3.8'

services:
  react_app:
    build: .
    container_name: react_cafeteria
    ports:
      - "80:80"
    restart: unless-stopped

  ab_tester:
    image: jordi/ab
    container_name: apache_bench
    depends_on:
      - react_app
    entrypoint: [ "tail", "-f", "/dev/null" ]  # mantém o container ativo
```

### 2. Executando o Apache Bench 

Após subir os containers:

```docker-compose up -d```

Entre no container do Apache Bench:

```docker exec -it apache_bench /bin/sh```

Verifique a instalação:

```ab -V```

Você deve ver algo como:
```
This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
```

3. Teste de carga básico

```
ab -n 1000 -c 50 http://react_app/
```

Parâmetros:

-n 1000 → número total de requisições a enviar.
-c 50 → número de requisições simultâneas (concorrência).
A URL deve apontar para a página inicial da aplicação React.
