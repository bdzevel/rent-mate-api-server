# RentMate API Server

API server for RentMate

## Stack

* [Node.js](https://nodejs.org) as a web server to serve the front end
* [Grunt](https://gruntjs.com/) as a task runner, for automation and helpful scripts
    * (I may switch to [Gulp](http://gulpjs.com/) for this at some point)
* [ESLint](http://eslint.org/) for JS linting (enforced on pre-commit hook)
    * [Airbnb JavaScript style guide](https://github.com/airbnb/javascript) used as a base and lightly modified

## Development

### IDE/Environment

I use [Visual Studio Code](https://code.visualstudio.com/) with the following extensions:

* ESLint (Dirk Baeumer)
* npm Intellisense (Christian Kohler)
* Search node_modules (Jason Nutter)
* stylelint (Shinnosuke Watanabe)

### Dependencies

Node.js and NPM.
Dependencies are mainly managed by npm.
You can choose to install the `grunt` command globally for yourself:
```
npm install -g grunt-cli
```

### Workflow

1. Setup
    1. Install dependencies
    ```
    npm install
    ```
    2. Copy `.dev.example.env` to `.env`

2. Code
    1. `bootstrap/` contains bootstrap code for app initialization/startup
    2. `controllers/` contains the controllers, which handle requests/responses
        1. They will typically call out to services to do any real work
    3. `resources/` contains files that host constants
    4. `routes/` contain the definition of the express routes, which route requests to controllers
    5. `services/` contain all the services which host all business logic
    6. At the root you will find all config files

3. Lint

   Note that linting is enforced on a pre-commit hook using [husky](https://github.com/typicode/husky) but it's good to know that you're square before trying to commit

4. Run
```
npm start
```

   By default this will start on port 3000
