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
                    sh 'npm install yarn -g'
                    sh 'yarn install'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    sh 'yarn test'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'yarn build'
                }
            }
        }
        stage('deliver') {
            steps {
                script {
                    h 'yarn start'
                }
            }
        }
    }
}
