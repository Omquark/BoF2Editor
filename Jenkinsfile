/* Requires the Docker Pipeline plugin */
pipeline {
	agent none
    stages {
		// stage("back-end"){
		// 	agent{
		// 		docker {image 'maven'}
		// 	}
		// 	steps{
		// 		sh 'back-end/mvn clean install'
		// 	}
		// }
		stage("front-end"){
			agent{
				docker {image 'node'}
			}
			steps {
				sh 'chmod 755 ./front-end.sh'
				sh './front-end.sh'
			}
		}
    }
}