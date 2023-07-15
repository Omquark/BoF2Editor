/* Requires the Docker Pipeline plugin */
pipeline {
	agent any
	// environment{
	// 	'BACK_BUILD' = env.BUILD_NUMBER;
	// }
    	stages {
		stage("SonarQube front-end analysis"){
			environment{
				scannerHome = tool 'SonarQube'
			}
			tools{
				nodejs 'Nodejs'
			}
			
			steps {
				withSonarQubeEnv('SonarQubeServer'){
					// sh "find / | grep sonar"
					echo "Scanning front-end with nodejs"
					sh "${scannerHome}/bin/sonar-scanner \
						-Dsonar.projectKey=BoF2Editor:front-end \
						-Dsonar.sources=front-end/ \
						-Dsonar.host.url=http://192.168.1.100:9000 \
						-Dsonar.token=sqp_3e16158c41f01c4cd0655f874a1b271210aa5a2c"
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

		stage('SonarQube back-end analysis'){
			tools{
				jdk 'Java'
				maven 'Maven'
			}

			steps{
				dir('back-end'){
					withEnv(['JAVA_HOME=/var/jenkins_home/tools/hudson.model.JDK/Java/jdk-17.0.7']){
						echo "using JAVA_HOME=${JAVA_HOME}"
						sh 'mvn clean verify sonar:sonar \
							-DskipTests \
							-Dsonar.projectKey=BoF2Editor:back-end \
							-Dsonar.prjectName="BoF2Editor:back-end" \
							-Dsonar.sources=./ \
							-Dsonar.host.url=http://192.168.1.100:9000 \
							-Dsonar.token=sqp_341a6a2a43f2b486091d059547efabf3cadc8609'
					}
				}
			}
		}

		stage('back-end-build'){
			environment{
				scannerHome = tool 'SonarQube'
			}

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

