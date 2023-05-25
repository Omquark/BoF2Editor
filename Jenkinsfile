/* Requires the Docker Pipeline plugin */
pipeline {
	agent{
		dockerContainer{
			image 'node:16-alpine'
		}
	}
    stages {
		stage("Test"){
			steps{
				sh 'node --version'
			}
		}
    }
}