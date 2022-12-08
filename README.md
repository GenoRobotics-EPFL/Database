# Database

> **Note**  
> La version 3.10 (ou plus récente) de Python est requise.

## API

### Getting started

> Recommandé:
> Setup un environnements virtuel ([doc](https://docs.python.org/3.10/library/venv.html))

> Installer les dépendances
> ```
> pip3 install -r requirements.txt
> ```

### DB MySQL

L'API utilise MySQL (localement) par défault,
elle peut aussi utiliser un fichier json.

> Installer MySQL

> Créer une base de donnée *genorobotics*

> Dans un fichier [.env](https://dev.to/jakewitcher/using-env-files-for-environment-variables-in-python-applications-55a1), mettre username et mot de passe:
> ```
> MYSQL_USERNAME="..." 
> MYSQL_PASSWORD="..."
> ```

### DB Json

Lorsque l'API utilise un fichier json comme base de données,
il est stocké dans le filesystem sous (`.db/data.json`).

> Dans un fichier [.env](https://dev.to/jakewitcher/using-env-files-for-environment-variables-in-python-applications-55a1), spécifier le type de base de données:
> ```
> DB_TYPE="json"
> ```

### Run

> Lancer l'API
> ```
> uvicorn src.app:app
> ```

> **Note**  
> Une fois lancé, de la documentation est auto-générée et accessible
> à [http://localhost:8000/docs](http://localhost:8000/docs)

## Interface

### Getting started

> Installer [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

> Aller dans `/interface`: 
> ```
> cd interface
> ```

> Installer les dépendances: 
> ```
> npm i
> ```

> Commencer par voir le fichier `/interface/pages/index.tsx`

### Run

> Lancer le serveur de développement:
> ```
> npm run dev
> ```

> L'app est accessible à [http://localhost:3000](http://localhost:3000)
