# ABD Looking for Group Web Application
Thank you for using our software! We have written this short piece of documentation to help you understand our program and how to get it up and running. 

## Description

This software is a Looking for Group system designed and developed by Already Been Designed (ABD). The system is comprised of three interfaces: Cleanup, Frontend, and Backend. The cleanup is used to clear the database of outdated advertisements and active users through interaction with the backend. The frontend interface is the front-end web server which serves the web pages to the client. The backend interface is the web API which interacts with our database. All files containing the backend will be located in the directory: backend-strapi. All files containing the cleanup will be located in the directory: cleanup. All files containing the frontend will be located in the directory: frontend-next. 

### Known Issues:

- Adblocker blocks PUT requests to the backend interface.
- The backend API endpoints and naming for Advertisements are misspelled as "advertisments" instead of "advertisements". 

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

#### Dependencies

Before we are able to start, we need to ensure that we have all of our dependencies. To do this, we must travel to each of the process directories (*backend-strapi, frontend-next, cleanup*) and run this command: 

```
npm install
```

### 3. Building the Application

Before we are able to start, we need to ensure that we have all of our dependencies. To do this, we must travel to the backend and frontend process directories (*backend-strapi and frontend-next*) and run this command: 

```
npm run build
```

### 4.a. Deploying the Application (Manually)

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

### 4.b. Deploying the Application (Automatically Using PM2)

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

## Our Contribution

The contribution section will *only* cover all files in which were created/modified by the team. 

### Cleanup

All cleaner files are located under *cleanup*. In this directory, you will find the following files (directories will be denoted with a preceding "/"):

- **app.js**
  - This is the main application file for the cleanup interface. When started, it will set the node-schedule to run the cleanup processes at the configured time.
- **Cleaner.js**
  - This is the class file containing the Cleaner class and it's properties. 

The cleaner utilizes *axios* to send/receive HTTP API requests, and *node-schedule* to run the cleaner at a specified time. 

### Backend

All backend files are located under *backend-strapi*. In this directory, you will find the following files (directories will be denoted with a preceding "/"):

- **/ - api**
  - **/ - active-users**
    - **/ - config**
      - **routes.json**
        - This file was modified to add policies to existing API routes and added new ones. 
    - **/ - controllers**
      - **active-users.js**
        - This file adds controllers for the routes to use. We added new controller and overwrote the some base ones for CRUD operations. 
    - **/ - services**
      - **login.js**
        - This file defines the service used by the login routes to login and authenticate users.
  - **/ - advertisments**
    - **/ - config**
      - **routes.json**
        - This file was modified to add policies to existing API routes and added new ones. 
    - **/ - controllers**
      - **active-users.js**
        - This file adds controllers for the routes to use. We added new controller and overwrote the some base ones for CRUD operations. 
    - **/ - services**
      - **fields.js**
        - This file defines the service used by the field route to fetch all field data from single request. 
- **/ - config**
  - **/ - policies**
    - **isAdOwner.js**
      - This file defines the policy of checking if a user is an advertisement owner. 
    - **isLoggedIn.js**
      - This files defines the policy of checking if a user is logged in. 
    - isNotLoggedIn.js
      - This file defines the policy of checking if a user is not logged in.
  - **database.js**
    - Modified the configuration provided from strapi. 
  - **middleware.js**
    - Modified the configuration provided from strapi. 
  - **server.js**
    - Modified the configuration provided from strapi. 

All directories/files in the *api* folder were created automatically using the graphical interfaces provided by Strapi. The folders/files listed above are the ones in which were modified or edited by our team. 

### Frontend

All backend files are located under *frontend-next*. In this directory, you will find the following files (directories will be denoted with a preceding "/"):

- **/ - assets**
  - **style.css**
    - This file contains all of the styles used by our frontend.
- **/ - components**
  - **/ - navigation**
    - **CreateNewGroup.js**
      - This file extends the navigation component to create our "Create a New Group" section of our navigation.
    - **FilterGroup.js**
      - This file extends the navigation component to create our "Filter Group" section of our navigation.
    - **HowToUse.js**
      - This file extends the navigation component to create our "How to Use" section of our navigation.
    - **NavigationComponent.js**
      - This is our abstract component class designed with the base functionality of a navigational component. 
  - **/ - popups**
    - **DeleteGroup.js**
      - This file contains the delete popup confirmation. 
    - **DisplayName.js**
      - This file contains the display name popup for login purposes. 
    - **ModifyGroup.js**
      - This file contains the modify group popup for editing and confirming the modification of an advertisement. 
  - **Advertisement.js**
    - This file contains the component information for the advertisement. 
  - **CreationForm.js**
    - This file is the abstract class component to be used on modify, filter, and create an advertisement. 
  - **header.js**
    - This file contains our header section of the site. (Logo and Title)
  - **Navigation.js**
    - This file is our outer wrapper component which wraps the entire navigation. 
  - **ViewAdvertisements.js**
    - This file is our outer wrapper component which wraps the entire advertisements. 
- **/ - pages**
  - **_app.js**
    - Modified *_app.js* code provided by NextJS. This initializes the base URL of axios, configures SWR, and imports our stylesheet. 
  - **index.js**
    - The main entry point of our website which calls all sections to appear and fetch the correct information. 
- **/ - public**
  - **/ - images**
    - **bg.jpg**
      - Background image of the site. 
    - **logo.png**
      - Logo image of the site. 
- **next.config.js**
  - Modified *next.config.js* provided by NextJS. 

## API Endpoints

The endpoints are listed in order from least restrictive to the most. Any endpoints listed in a previous section are inherited by the ones following. There are more endpoints setup within the system automatically by Strapi. Only the endpoints utilized by this system will be listed. Endpoints not listed are restricted to no access, but from administrators. All request and response data is in the form of JSON conforming to RESTAPI protocol. API route parameters are denoted as :id where id is the reference attribute. 

### Open Access

**GET - /active-user**

​	Displays a list of all active users.

**GET - /active-user/count**

​	Displays a count of all active users.

**GET - /active-user/:id**

​	Displays the information for the user id specified. 

**GET - /advertisments**

​	Displays a list of all advertisements. 

**GET - /advertisments/:id**

​	Displays the information for the advertisement id specified. 

**GET - /fields**

​	Displays a list of all fields options. 

### Cleaner Only

**DELETE - /active-users/:id (*not inherited*)**
	Deletes the user with the id specified. 

**DELETE - /advertisments/:id**

​	Deletes the advertisement with the id specified. 

### Logged In User Only

**POST - /active-users**

​	Creates a new user. 

​	Request Body (example): 

```json
{
	"DisplayName": "Some Name Here"
}
```

**POST - /advertisments**

​	Creates a new advertisement.

​	Request Body (example):

```json
{
	"Game_Mode": 1,
	"Game_Name": 1,
	"Game_Rank": 27,
	"Num_Players": 2,
	"Region": 1,
	"Comm": 1,
	"Contact_Desc": "Something here that says how to connect",
	"Platform": 1,
	"Player_Role": 2
}
```

**PUT - /advertisments/:id**

​	Updates an existing advertisement by the id. 

​	Request Body (example):

```json
{
	"Game_Mode": 1,
	"Game_Name": 1,
	"Game_Rank": 27,
	"Num_Players": 2,
	"Region": 1,
	"Comm": 1,
	"Contact_Desc": "Something here that says how to connect",
	"Platform": 1,
	"Player_Role": 2
}
```



## Third-Party Libraries

This system utilizes these third-party libraries as dependencies (each library may have its own dependencies):

- Strapi
- NextJS
- Node Scheduler
- Axios
- DotENV

