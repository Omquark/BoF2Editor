/* Requires the Docker Pipeline plugin */
pipeline {
	agent any
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
			steps {
				dir('front-end'){
					sh 'pwd'
					sh 'npm install'
					// sh 'npm test'
					// sh 'npm run build'
				}
			}
		}
    }
}