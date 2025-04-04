pipeline {
    environment {
        name = "artwork-sample"
    }

    agent any

    stages {
        stage('Cloning our Git') {
            steps {
                git branch: 'main', url: "https://github.com/SarthakRana21/artwork_sampel.git"
            }
        }

        stage('Docker Image bulding') {
            steps {
                sh "docker-compose up --build -dit"
            }
        }
    }
}