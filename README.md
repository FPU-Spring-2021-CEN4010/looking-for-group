# ABD Looking for Group Web Application
Thank you for using our software! We have written this short piece of documentation to help you understand our program and how to get it up and running. 

## Requirements

- NodeJS (Version: 14.9.0)
- MariaDB (Version: 10.3.23)

## Getting Started
To start using this software follow these instructions: 

### 1. Installation

#### Automatically (using git)

In your command console with your preferred directory selected enter:

```git
gh repo clone FPU-Spring-2021-CEN4010/abd-looking-for-group
```

#### Manually

1. Go to [this link to download the zip folder of the software.](https://github.com/FPU-Spring-2021-CEN4010/abd-looking-for-group/archive/refs/heads/main.zip)
2. Unzip the software in your preferred directory.

### 2. Setup

#### Database

Connect and run your MariaDB and execute the setup file (mysql-setup/setup.sql) on your database. This will create all of the necessary tables and input basic examples into your advertisement fields. 

#### Environment Variables

For the backend and cleanup processes, you must create a file called *.env* This will allow you to configure the processes to your specific needs. 

##### Backend (*backend-strapi/.env*)

```
HOST=0.0.0.0								//The host ip for the backend process.
PORT=1337									//The port of the backend process.

DATABASE_USERNAME=braden						//The username of the user to the database.
DATABASE_PASSWORD=bcbest					     //The password of the user to the database.
DATABASE_HOST=192.168.1.240					//The host ip for the database.
DATABASE_PORT=3306							//The port for the database.
DATABASE_NAME=abd_looking_for_group			//The name for the database.
DATABASE_SSL=false							//Whether to transfer as HTTPS or HTTP.

JWT_TOKEN=bc080210-a1fa-4ff9-af9e-ea61c35e8360    //Hidden JWT auth token.

COOKIE_DOMAIN=localhost					     //Domain base for the cookie creation.
```

##### Frontend (*frontend-next/next.config.js*)

For the frontend process, you must modify the API_URL as a JavaScript Object located in the file *next.config.js*.

##### Cleanup (*cleanup/.env*)

```
CL_USER=cleaner 					//The username of the strapi account for the cleaner.
CL_PASS=Cleaner123					//The password of the strapi account for the cleaner.

RUNTIME_HR=18						//The hour for the cleaner to run. (0-23)
RUNTIME_MIN=00					     //The minute for the cleaner to run. (00-60)

API_URL=https://abdapi.bcariaga.me      //The URL of the API.
```

#### Node Packages

Before we are able to start, we need to ensure that we have all of our dependencies. To do this, we must travel to each of the process directories (*backend-strapi, frontend-next, cleanup*) and run this command: 

```
npm install
```

### 3.a. Deploying the Application (Manually)

There are 3 separate services required to be run for this software to work properly: Backend, Frontend, and Cleanup. 

#### Backend

1. Go into the backend-strapi directory in your command console. 
2. Execute the following command:

```
npm run start
```

The backend server should be running, now.

#### Frontend

1. Go into the frontend-next directory in your command console.
2. Execute the following command:

```
npm run start
```

The frontend server should be running, now.

#### Cleanup

1. Go into the cleanup directory in your command console:
2. Execute the following command:

```
npm run start
```

The cleanup process should be running, now.

### 3.b. Deploying the Application (Automatically Using PM2)

There are 3 separate services required to be run for this software to work properly: Backend, Frontend, and Cleanup. By using PM2, the node processes won't be tied to a terminal, and will be automatically restarted upon crash or server shutdown. 

#### Backend

1. Go into the backend-strapi directory in your command console. 
2. Execute the following command:

```
pm2 start server.js --name abd-backend
```

The backend server should be running, now.

#### Frontend

1. Go into the frontend-next directory in your command console.
2. Execute the following command:

```
pm2 start npm --name abd-frontend -- start
```

The frontend server should be running, now.

#### Cleanup

1. Go into the cleanup directory in your command console:
2. Execute the following command:

```
pm2 start npm --name abd-cleanup -- start
```

The cleanup process should be running, now.

## How to Use

## File Structure

## Developer API Documentation

API Endpoints

fields

advertisments

active-users