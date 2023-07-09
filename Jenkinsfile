/* Requires the Docker Pipeline plugin */
pipeline {
	agent any
	// environment{
	// 	'BACK_BUILD' = env.BUILD_NUMBER;
	// }
    stages {

		stage('SonarQube analysis'){
			steps {
				withSonarQubeEnv('http://192.168.1.100:9000')
				sh 'sonar-scanner -Dsonar.projectKey=BoF2Editor -Dsonar.sources=front-end/src'
				sh 'sonar-scanner -Dsonar.projectKey=BoF2Editor -Dsonar.sources=back-end/src'
			}
		}

		stage("back-end-test"){

			tools{
				jdk 'Java'
				maven 'Maven'
			}

			steps{
				dir('back-end'){
					withEnv(['JAVA_HOME=/var/jenkins_home/tools/hudson.model.JDK/Java/jdk-17.0.7']){
						echo "using JAVA_HOME=${JAVA_HOME}"
						sh 'mvn test'
					}
				}
			}
		}

		stage("back-end-build"){

			tools{
				jdk 'Java'
				maven 'Maven'
			}

			steps{
				dir("back-end"){
					withEnv(['JAVA_HOME=/var/jenkins_home/tools/hudson.model.JDK/Java/jdk-17.0.7']){
						echo "using JAVA_HOME=${JAVA_HOME}"
						sh 'mvn clean install -DskipTests'
					}
				}
			}
		}
	

		stage("front-end"){

			tools {
				nodejs 'Nodejs'
			}

			steps {
				dir('front-end'){
					sh 'npm install'
					sh 'npm run build'
				}
			}
		}
	}
}

