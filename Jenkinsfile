pipeline {
    agent {
        docker {
            image 'node:12.20.1-buster'
            args '--labels traefik.enable=true traefik.http.routers.whoami.rule=Host(`mexlefrontend.ddns.net`) traefik.http.routers.whoami.entrypoints=web traefik.docker.network=web'
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
