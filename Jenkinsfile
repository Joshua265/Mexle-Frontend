pipeline {
    agent any 
    environment {
        CI = 'true' 
    }
    stages {
        stage('Install') { 
            steps {
                nodejs(nodeJSInstallationName: 'Node 12.x', configId: '<config-file-provider-id>') {
                    sh 'npm install'
                }
            }
        }
        stage('Build') { 
            steps {
                nodejs(nodeJSInstallationName: 'Node 12.x', configId: '<config-file-provider-id>') {
                    sh 'npm run build'
                }
            }
        }
        stage('Deliver') { 
            steps {
                nodejs(nodeJSInstallationName: 'Node 12.x', configId: '<config-file-provider-id>') {
                    sh 'npm install -g serve'
                    sh 'npm run build'
                }
            }
        }
    }
}