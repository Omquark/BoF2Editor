/* Requires the Docker Pipeline plugin */
pipeline {
	agent{
		dockerContainer{
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