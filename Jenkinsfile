/* Requires the Docker Pipeline plugin */
pipeline {
	agent{
		dockerfile true
	}
    stages {
		stage("Test"){
			steps{
				sh 'echo Installed MySQL'
			}
		}
    }
}