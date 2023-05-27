/* Requires the Docker Pipeline plugin */
pipeline {
	agent {
		docker {
			image 'maven:3.9.0-eclipse-temurin-11'
		}
	}
    stages {
		stage("back-end"){
			agent{
				docker {image 'maven'}
			}
			steps{
				sh 'cd back-end'
				sh 'mvn clean install'
			}
		}
		stage("front-end"){
			agent{
				docker {image 'node'}
			}
			steps {
				sh 'cd front-end'
				sh 'npm install'
				sh 'npm test'
				sh 'npm run build'
			}
		}
    }
}