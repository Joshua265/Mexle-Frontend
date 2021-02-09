pipeline {
    agent any
    stages {
        stage 'Checkout' {
            checkout scm
        }
        stage 'build docker container' {
            sh 'docker-compose -f docker-compose.integration.yml up -d --force-recreate'
        }
        stage 'install' {
            sh 'docker exec -it mexlefrontend bash'
            sh 'npm install -g serve'
            sh 'npm install --production'
        }
        stage 'build' {
            sh 'npm build'
        }
        stage 'serve' {
            sh 'serve -s -p 80:443'
        }
    }
}
