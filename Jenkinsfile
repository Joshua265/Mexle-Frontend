pipeline {
    agent {
        docker { image 'tmaier/docker-compose' }
    }
    stages {
        stage('build docker container') {
            steps {
                sh 'docker-compose up -d'
            }
        }
        stage('install') {
            steps {
                sh 'docker exec mexlefrontend bash'
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
