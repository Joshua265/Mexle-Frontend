#!/bin/groovy
pipeline {
    agent {
        docker {
            image 'node:12.20.1-buster'
            labels
              - "traefik.docker.network=web"
              - "traefik.enable=true"
              - "traefik.reactboilerplate.frontend.rule=Host:mexlefrontend.ddns.net"
              - "traefik.reactboilerplate.frontend.port=3000"
              - "traefik.reactboilerplate.frontend.protocol=web"
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