node {
    checkout scm

    def customImage = docker.build("sample","-p 3001:3000", "./Dockerfile")

    customImage.inside {
        sh 'ls'
    }
}