FROM node:16
USER root
RUN apt-get update && apt-get install -y lsb-release
RUN apt-get update && apt-get install -y docker-ce-cli
RUN curl -fsSLO https://get.docker.com/builds/Linux/x86_64/docker-17.04.0-ce.tgz \
  && tar xzvf docker-17.04.0-ce.tgz \
  && mv docker/docker /usr/local/bin \
  && rm -r docker docker-17.04.0-ce.tgz
USER jenkins
COPY ./target/BoF2Editor-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "./app.jar"]
EXPOSE 8080