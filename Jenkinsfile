node {
    checkout scm
    docker.image('node:12.20.1-buster').withRun('--label-file ./labelfile') {
        sh 'npm install -g serve'
        sh 'npm install --production'
        sh 'npm build'
        sh 'serve -s -p 80:443'
    }
}

