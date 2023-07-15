/* Requires the Docker Pipeline plugin */
pipeline {
	agent any
	// environment{
	// 	'BACK_BUILD' = env.BUILD_NUMBER;
	// }
    	stages {
		stage("SonarQube analysis"){
			environment{
				scannerHome = tool 'SonarQube'
			}
			steps {
				withSonarQubeEnv('SonarQubeServer'){
					// sh "find / | grep sonar" 
					sh "sonar-scanner \
						-Dsonar.projectKey=BoF2Editor \
						-Dsonar.sources=front-end/src \
						-Dsonar.host.url=http://localhost:9000 \
						-Dsonar.token=sqp_cbe463e1b5e25b383113def53321a36d406b17c0"
					
					sh "sonar-scanner \
						-Dsonar.projectKey=BoF2Editor \
						-Dsonar.sources=back-end/src \
						-Dsonar.host.url=http://localhost:9000 \
						-Dsonar.token=sqp_cbe463e1b5e25b383113def53321a36d406b17c0"
				}
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

