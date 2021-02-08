#!/bin/groovy
pipeline {
    agent {
        docker {
            image 'mexleFrontend'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build Image') {
        steps {
            script {
                sh 'docker-compose up -d'
            }
        }
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
            sh 'yarn start'
            }
        }
    }
}