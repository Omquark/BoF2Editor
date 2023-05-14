/* Requires the Docker Pipeline plugin */
pipeline {
	agent any
	/*{ 
		dockerfile {
			filename 'Dockerfile'
		}
	}*/
    stages {
/*		stage('SonarQube analysis'){
			steps {
				sh 'mvn clean package sonar:sonar jacoco:report -X -Dsonar.projectKey=com.rttbanking:cardmanagement -Dsonar.host.url=http://98.111.235.165:9000 -Dsonar.login=squ_d27f56461df9b43d67a62102f29a18e75bad65a2 > log.txt'
			}
		} */
		stage("Test"){
			steps{
				sh 'cd back-end'
				sh 'mvn test'
				archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
			}
		}
		stage("Compile"){
			when {
				expression{
					currentBuild.result == null || currentBuild.result == 'SUCCESS'
				}
			}
			steps {
				sh 'mvn compile'
			}
		}
    }
}