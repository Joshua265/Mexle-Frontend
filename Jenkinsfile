pipeline {
    agent {
        docker {
            image 'node:12.20.1-buster' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}