#!/usr/bin/env bash

# Utils functions
. ./../utils.sh

# Create envs vars if don't exist
ENV_FILES=(".env" "claudia/.env")
utils.check_envs_files "${ENV_FILES[@]}"

# Load environment vars, to use from console, run follow command:
utils.load_environment
utils.load_environment_permissions

# Menu options
if [[ "$1" == "deploy" ]]; then
    utils.printer "Build lambda"
    export YARN_COMMAND="run build"
    docker-compose up
    if [[ ! -f "../../claudia.json" ]]; then
        export YARN_COMMAND="run create"
    else
        export YARN_COMMAND="run update"
    fi
    utils.printer "Deploy lambda"
    docker-compose up
elif [[ "$1" != "help" ]]; then
    export YARN_COMMAND="run $1"
    utils.printer "Run command"
    docker-compose up
else
    utils.printer "Params between {} are optional"
    utils.printer "{command} available: build|build:watch|create|update|schedule|destroy|invoke|invoke:local"
    utils.printer ""
    utils.printer "Usage: docker.sh [{command}|deploy|help]"
    echo -e "{command} --> Run services with command script"
    echo -e "deploy --> Build && deploy lambda"
    echo -e "help --> Show menu options"
fi
