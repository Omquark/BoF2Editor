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
				ws('/front-end'){
					echo('whoami')
					sh ('whoami')
					echo('after whoami')
					// sh 'npm install'
					// sh 'npm test'
					// sh 'npm run build'
				}
			}
		}
    }
}