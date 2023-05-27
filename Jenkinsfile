/* Requires the Docker Pipeline plugin */
pipeline {
	agent{
		docker {
			image 'mode:18.16.0-alpine'
		}
	}
    stages {
		stage("Test"){
			steps{
				sh 'echo Installed MySQL'
			}
		}
    }
}