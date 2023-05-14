/* Requires the Docker Pipeline plugin */
pipeline {
	agent any
	{
		docker{
			image 'maven:3.9.0-exlipse-temurin-11'
			args '-v /root/.m2:/root/.m2'
		}
	}
    stages {
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