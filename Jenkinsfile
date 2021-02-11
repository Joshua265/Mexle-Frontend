pipeline {
    agent { dockerfile true }
    stages {
        stage('remove old container') {
            sh 'docker rm -f mexle-frontend_sample'
        }
        stage('build new container') {
            sh 'docker-compose up -d --build'
        }
    }
}