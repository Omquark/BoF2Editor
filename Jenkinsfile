/* Requires the Docker Pipeline plugin */
pipeline {
	agent{
		dockerContainer{
			image 'amazoncorretto'
		}
	}
    stages {
		stage("Test"){
			steps{
				sh 'java --version'
			}
		}
    }
}