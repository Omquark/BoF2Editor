/* Requires the Docker Pipeline plugin */
pipeline {
	agent any
	// environment{
	// 	'BACK_BUILD' = env.BUILD_NUMBER;
	// }
    stages {
		stage("back-end-test"){
			tools{
				jdk 'Java'
				maven 'Maven'
			}
			steps{
				withEnv(['JAVA_HOME=/var/jenkins_home/tools/hudson.model.JDK']){
					dir("back-end"){
						echo "${JAVA_HOME}"
						sh 'mvn test'
					}
				}
			}
		}
		stage("back-end-build"){
			steps{
				dir("back-end"){
					echo "BACK_BUILD is ${BACK_BUILD}"
					sh 'mvn clean install'
				}
			}
		}
		stage("front-end"){
			steps {
				dir('front-end'){
					sh 'npm install'
					sh 'npm run build'
				}
			}
		}
	}
}
