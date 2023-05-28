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
					step('install'){
						sh 'npm install'
					}
					step('test'){
						sh 'npm test'
					}
					step('build'){
						sh 'npm run build'
					}
					step('serve'){
						sh 'npm serve'
					}
				}
			}
		}
    }
}