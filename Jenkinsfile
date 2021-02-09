pipeline {
    agent {
        docker {
            image 'node:12.20.1-buster'
            args '--name mexle -l traefik.enable=true -l traefik.http.routers.mexle.rule=Host(`mexlefrontend.ddns.net`) -l traefik.http.routers.mexle.entrypoints=web -l traefik.docker.network=web'
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
                sh 'npm start & sleep 1'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
            }
        }
    }
}
