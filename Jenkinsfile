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
				step('install'){
					dir('front-end'){
						sh 'npm install'
					}
				}
				step('test'){
					dir('front-end'){
						sh 'npm test'
					}
				}
				step('build'){
					dir('front-end'){
						sh 'npm run build'
					}
				}
				step('serve'){
						dir('front-end'){
							sh 'npm serve'
					}
				}
			}
		}
	}
}