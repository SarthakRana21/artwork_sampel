pipeline {
    environment {
        name = "artwork-sample"
    }

    agent any

    stages {
        stage('Cleanup Docker') {
            steps {
                sh '''
                echo "Stopping and removing old containers..."
                docker-compose down --volumes --remove-orphans || true
                
                echo "Removing unused Docker images and cache..."
                docker system prune -a -f || true
                
                echo "Cleanup completed."
                '''
            }
        }

        stage('Cloning our Git') {
            steps {
                git branch: 'main', url: "https://github.com/SarthakRana21/artwork_sampel.git"
            }
        }

        stage('Docker Image Building') {
            steps {
                sh "docker-compose up --build -d"
            }
        }
    }
}
