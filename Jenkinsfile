/* Requires the Docker Pipeline plugin */
pipeline {
	agent {
		docker {
			image 'maven:3.9.0-eclipse-temurin-11'
		}
	}
    stages {
		stage("Java"){
			steps{
				sh 'll'
				sh 'pwd'
			}
		}
    }
}