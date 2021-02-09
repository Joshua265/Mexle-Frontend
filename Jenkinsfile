pipeline {
    agent {
        docker {
            image 'node:12.20.1-buster'
            args '--name mexlefrontend -l traefik.enable=true -l traefik.http.routers.mexlefrontend.rule=Host(`mexlefrontend.ddns.net`) -l traefik.http.routers.mexlefrontend.entrypoints=web -l traefik.docker.network=web'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Deliver') {
            steps {
                sh './jenkins/scripts/deliver.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh './jenkins/scripts/kill.sh'
            }
        }
    }
}
