# Introduction 
UI Template for Prometheus Services.

Includes the following features:
- End-to-end testing using Protractor. Uses [Aurelia CLI E2E](https://github.com/YardGnomeNinja/aurelia-cli-e2e).

# Getting Started
1.	Fork this project into a new repository.
2.	Clone the new repository locally.
3.	Open a PowerShell console in the root of the project folder. ('CTRL + ~' in VSCode)

        npm install aurelia-cli
 
        npm install

4.  If using VSCode, I recommend adding the following to '.vscode\settings.json' below '"html.suggest.ionic": false,'. This will hide these files from your view in the Explorer.

        "files.exclude": {
            "e2e": true,
            "/*/*.js": true,
            ".editorconfig": true,
            "*.yml": true,
            "tsconfig.json": true,
            "tslint.json": true,
            "scripts/*.js": true,
            "scripts/*.map": true
        }

5.  Find all references to 'prometheusserviceschassisuiaurelia' and replace with the name of the new project.

6.  Update this README.md to pertain to the new project.

# Run, Build, and Test
## Run
Running an Aurelia CLI project allows for the specification of which environment to run using '--env \<environment\>. The environment definitions can be found at \<project root\>\aurelia_project\environments. These files contain standard variables that can be used to toggle features based on desired functionality. New variables can be created in an environment and brand new environment definitions simply by adding a new environment definition file.

BrowserSync functionality can be enabled with the '--watch' argument. This will cause the browser to update on saved changes that affect the application.

1. Open a PowerShell console in the root of the project folder.
    - Run in Development mode with BrowserSync.

            au run --env dev --watch

    - Run in Production mode without BrowserSync.

            au run --env prod

2. Open a web browser and navigate to: [http://localhost:9000/](http://localhost:9000/)

## Build
The '*au build*' command will compile your code and output to '\<project root\>\scripts' and include the following files:
  - *app-bundle.js*
    - Contains application specific code.
  - *app-bundle.js.map* (if debug)
    - Contains data to allow the browser's development tools to show the application's project file structure in order to make navigation and debugging easier.
  - *vendor-bundle.js*
    - Contains library code.

1. Open a PowerShell console in the root of the project folder.
    
        au build --env <environment>

## Test
The '*au e2e*' command will run [Protractor](https://www.protractortest.org/#/) tests located in '\<project root\>\test\e2e\src\' and deeper.
1. Open a PowerShell console in the root of the project folder.

        au e2e