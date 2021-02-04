pipeline {
    agent any 
    environment {
        CI = 'true' 
    }
    stages {
        stage('Install') { 
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 12.20.1', configId: '<config-file-provider-id>') {
                    sh 'npm install'
                }
            }
        }
        stage('Build') { 
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 12.20.1', configId: '<config-file-provider-id>') {
                    sh 'npm run build'
                }
            }
        }
        stage('Deliver') { 
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 12.20.1', configId: '<config-file-provider-id>') {
                    sh 'npm install -g serve'
                    sh 'npm run build'
                }
            }
        }
    }
}