/* Requires the Docker Pipeline plugin */
pipeline {
	agent none
    stages {
		stage("Test"){
			agent {
				dockerfile true
			}
			steps{
				sh 'mvn --version'
			}
		}
    }
}