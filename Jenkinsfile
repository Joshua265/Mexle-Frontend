pipeline {
    agent any 
    environment {
        CI = 'true' 
    }
    stages {
        stage('Install') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Build') { 
            steps {
                sh 'npm run build' 
            }
        }
        stage('Deliver') { 
            steps {
                sh 'serve -s build' 
            }
        }
    }
}