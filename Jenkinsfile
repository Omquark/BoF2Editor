/* Requires the Docker Pipeline plugin */
pipeline {
	agent{
		docker{
			image 'mysql'
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