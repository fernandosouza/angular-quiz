pipeline {
    agent any
 
    stages {
        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'node', configId: 'a0beb15c-0f75-490e-b698-240a77562f47') {
                    sh 'npm config ls'
                    sh 'npm install'
                }
            }
        }
    }
}