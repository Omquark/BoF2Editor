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
				}
				dir('front-end'){
					sh 'npm test'
				}
				dir('front-end'){
					sh 'npm run build'
				}
					dir('front-end'){
						sh 'npm serve'
				}
			}
		}
	}
}