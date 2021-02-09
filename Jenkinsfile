pipeline {
    agent any
    stages {
        stage('build docker container') {
            steps {
                sh 'ls'
                sh 'sudo docker-compose -f up -d'
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
