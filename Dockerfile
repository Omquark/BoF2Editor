FROM openjdk:17-alpine
USER root
RUN apt-get update && apt-get install -y lsb-release
RUN apt-get update && apt-get install -y docker-ce-cli
USER jenkins
COPY ./target/BoF2Editor-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "./app.jar"]
EXPOSE 8080