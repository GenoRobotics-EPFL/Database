# Database

> **Note**  
> Python version 3.10 (or higher) is required.

## Git branches

* `master`  
  Anything merged on `master` will automatically be deployed

* `stage`  
  The `stage` branch is used to regroup potentially unfinished/tested work.  
  Always push/merge on `stage` before going to `master`.

## API

### Getting started

> **Recommended**  
> Setup a virtual environment ([doc](https://docs.python.org/3.10/library/venv.html))

* Install the dependencies
    ```
    pip3 install -r requirements.txt
    ```

### Database

The API supports several types of SQL databases.  
The behaviour is controlled by environment variables, to that end we use a [.env](https://dev.to/jakewitcher/using-env-files-for-environment-variables-in-python-applications-55a1) file on local (all following environment variables should be set in that file).

#### MySQL (local)

To use MySQL (only on local):

* Install MySQL
* Create a *genorobotics* database
* Set in the `.env` file:
    ```
    USE_MYSQL="true"

    MYSQLDATABASE="genorobotics"
    MYSQLUSER="..."
    MYSQLPASSWORD="..."
    MYSQLHOST="localhost"
    MYSQLPORT="3306"
    ```

#### Postgres (prod)

> **Warning**  
> Please don't mess with this database

This is the version used in production.
To connect to the prod database:
* Ask for the credentials
* Set in the `.env` file:
    ```
    PGDATABASE="..."
    PGUSER="..."
    PGPASSWORD="..."
    PGHOST="..."
    PGPORT="..."
    ```

#### DB Json (deprecated)

The API can use a json file as database, it is stored in the filesystem
under (`.db/data.json`).

* Set in the `.env` file:
    ```
    DB_TYPE="json"
    ```

### AWS

The (large) files are stored separately on [AWS S3](https://aws.amazon.com/s3/).

To disable AWS (until the account is set up), set in the `.env` file:
```
AWS_DISABLED="true"
```

To connect to AWS:
* Ask for the credentials
* Set in the `.env` file:
    ```
    AWS_BUCKET_NAME="..."
    AWS_REGION_NAME="eu-central-1"
    AWS_ACCESS_KEY_ID="..."
    AWS_SECRET_ACCESS_KEY="..."
    ```



### Run (local)

> **Note**  
> Once started, documentation is auto-generated and accessible at [http://localhost:8000/docs](http://localhost:8000/docs)

To run directly:
```
uvicorn src.app:app
```

To start via docker (need [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/)):
```
docker-compose up --build
```

## Interface

### Getting started

* Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* Go to `/interface`: 
    ```
    cd interface
    ```
* Install the dependencies
    ```
    npm i
    ```
* Start by looking at the file `/interface/pages/index.tsx`

### Run

* Start the development server:
    ```
    npm run dev
    ```
* The app is available at [http://localhost:3000](http://localhost:3000)

> **Note**  
> To verify that everything is working as expected and mostly that the app will be successfully deployed, try to create a production build of the app:
> ```
> npm run build
> ```

## Deployment

### Railway

The postgres database and API are deployed on [railway.app](https://railway.app) ([dashboard](https://railway.app/project/61f3ab90-4587-4fa7-bfba-20fb3255182a)).

The API is deployed via docker (see `./Dockerfile`) and is set up to use the postgres database.

A [Github App](https://docs.github.com/en/apps/creating-github-apps/creating-github-apps/about-apps) is set up to deploy the API on each push on the `master` branch.

### Vercel

The interface is deployed on [vercel](https://vercel.com/) ([dashboard](https://vercel.com/database/database)).

A [Github App](https://docs.github.com/en/actions) is set up to deploy the interface on each push on the `master` branch.
A preview version of the interface will also be deployed for each branch.