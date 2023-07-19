FROM eclipse-temurin:17
ENV INSTALL_PATH="/opt/bof2editor"
ENV CONFIG_PATH="/etc/opt/bof2editor"
ENV LOG_PATH="/var/opt/bof2editor"

USER root
COPY "config/*" /var/tmp/bof2editor/config/
COPY "scripts/*" /var/tmp/bof2editor/scripts/
COPY "back-end/target/BoF2Editor-0.0.2-SNAPSHOT.jar" /var/tmp/bof2editor/app.jar
COPY "front-end/build/*" /var/tmp/bof2editor/build/
COPY "front-end/server.js" /var/tmp/bof2editor/server.js
COPY "front-end/package.json" /var/tmp/bof2editor/package.json

RUN /var/tmp/bof2editor/scripts/BOF2EDITORInstall.ksh >> /var/tmp/bof2editor/BOF2EDITORInstall.log
USER bof2editor
#RUN touch /var/opt/bof2editor/logs/BOF2EDITORStart.log
ENTRYPOINT $INSTALL_PATH/bin/BOF2EDITORStart.ksh
EXPOSE 5000