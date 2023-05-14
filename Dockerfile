FROM openjdk:17-alpine
USER root
RUN apt-get update && apt-get install -y lsb-release
RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
	https://download.docker.com/linux/debian/gpg
RUN echo
echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
  https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
RUN apt-get update && apt-get install -y docker-ce-cli
USER jenkins
COPY ./target/BoF2Editor-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "./app.jar"]
EXPOSE 8080