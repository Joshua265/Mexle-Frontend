pipeline {
    agent any
    environment {
        PATH = "$PATH:/usr/local/bin"
    }
    stages {
        stage('build docker container') {
            steps {
                sh 'echo $PATH'
                sh 'which docker-compose'
                sh 'ls'
                sh 'docker-compose -f up -d'
            }
        }
        stage('install') {
            steps {
                sh 'ls'
                sh 'docker exec -it mexlefrontend bash'
                sh 'npm install -g serve'
                sh 'npm install --production'
            }
        }
        stage('build') {
            steps {
                sh 'npm build'
            }
        }
        stage('serve') {
            steps {
                sh 'serve -s -p 80:443'
            }
        }
    }
}
