/* Requires the Docker Pipeline plugin */
pipeline {
	agent any
	// environment{
	// 	'BACK_BUILD' = env.BUILD_NUMBER;
	// }
    stages {

		stage('SonarQube analysis'){
			def scannerHome = tool 'SonarQube';
			steps {
				withSonarQubeEnv('SonarQube'){
					sh "${scanner-home}/bin/sonar-scanner -Dsonar.projectKey=BoF2Editor -Dsonar.sources=front-end/src"
					sh "${scanner-home}/bin/sonar-scanner -Dsonar.projectKey=BoF2Editor -Dsonar.sources=back-end/src"
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

