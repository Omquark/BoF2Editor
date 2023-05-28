/* Requires the Docker Pipeline plugin */
pipeline {
	agent any
    stages {
		stage("back-end"){
			steps{
				dir("back-end"){
					sh 'mvn clean install'
				}
			}
		}
		stage("front-end"){
			steps {
				dir('front-end'){
					sh 'npm install'
					// sh 'npm test'
					sh 'npm run build'
					sh 'npm serve'
				}
			}
		}
	}
}