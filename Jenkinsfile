node('docker') {
    stage 'Checkout'
        checkout scm
    stage 'Build & UnitTest'
        sh "docker build -t mexlefrontend:B${BUILD_NUMBER} -f Dockerfile ."
        sh "docker build -t mexlefrontend:test-B${BUILD_NUMBER} -f Dockerfile.Integration ."
    stage 'Integration Test'
        sh 'docker-compose -f docker-compose.integration.yml up --force-recreate --abort-on-container-exit'
        sh 'docker-compose -f docker-compose.integration.yml down -v'
}
