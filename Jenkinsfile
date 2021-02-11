pipeline {
    agent { dockerfile true }
    stages {
        stage('remove old container') {
            steps {
                sh 'docker rm -f mexle-frontend_sample'
            }
        }
        stage('build new container') {
            steps {
                sh 'docker-compose up -d --build'   
            }
        }
    }
}