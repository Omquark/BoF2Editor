/* Requires the Docker Pipeline plugin */
pipeline {
	agent none
    stages {
		stage("Test"){
			agent {
				docker {
					image 'maven:3.5.0'
				}
			}
			steps{
				sh 'mvn --version'
			}
		}
    }
}