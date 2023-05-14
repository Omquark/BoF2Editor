/* Requires the Docker Pipeline plugin */
pipeline {
	agent{
		dockerfile{
			filename 'Dockerfile'
			/* image 'maven:3.9.0-eclipse-temurin-11'
			args '-v /root/.m2:/root/.m2' */
		}
	}
    stages {
		stage("Test"){
			steps{
				sh 'mvn test'
			}
		}
		stage("Compile"){
			steps {
				sh 'mvn compile'
			}
		}
    }
}