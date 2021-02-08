#!/bin/groovy
pipeline {
    agent {
        docker {
            image 'node:12.20.1-buster'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Prepare') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }
        stage('deliver') {
            steps {
                script {
                    sh 'npm start'
                }
            }
        }
    }
}
