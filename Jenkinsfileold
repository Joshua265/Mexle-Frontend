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
                docker.image('mexlefrontend') {
                    sh 'while ! ping -h0.0.0.0 --silent; do sleep 1; done'
                    sh 'npm install -g serve'
                    sh 'npm install --production'
                    sh 'npm build'
                    sh 'serve -s -p 80:443'
                }
            }
        }
        // stage('build') {
        //     steps {
        //         sh 'npm build'
        //     }
        // }
        // stage('serve') {
        //     steps {
        //         sh 'serve -s -p 80:443'
        //     }
        // }
    }
}
