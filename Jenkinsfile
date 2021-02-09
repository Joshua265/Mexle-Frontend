pipeline {
    agent any
    stages {
        stage('build docker container') {
            steps {
                sh 'ls'
                sh 'docker-compose -f docker-compose.integration.yml up -d --force-recreate'
            }
        }
        stage('install') {
            steps {
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
