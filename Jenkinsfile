pipeline {
    agent {
        docker { image 'tmaier/docker-compose' }
    }
    stages {
        stage('build docker container') {
            steps {
                sh 'docker-compose up -d'
                sh 'sleep 30'
            }
        }
        stage('install') {
            steps {
                docker.image('mexlefrontend') {
                    sh 'npm install -g serve'
                    sh 'npm install --production'
                    sh 'npm build'
                    sh 'serve -s -p 80:443'
                }
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
