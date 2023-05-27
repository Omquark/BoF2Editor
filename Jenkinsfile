/* Requires the Docker Pipeline plugin */
pipeline {
	agent none
    stages {
		// stage("back-end"){
		// 	agent{
		// 		docker {image 'maven'}
		// 	}
		// 	steps{
		// 		sh 'cd back-end'
		// 		sh 'mvn clean install'
		// 	}
		// }
		stage("front-end"){
			agent{
				docker {image 'node'}
			}
			steps {
				sh 'ls'
				sh 'cd front-end'
				sh 'npm install'
				sh 'npm test'
				sh 'npm run build'
			}
		}
    }
}