FROM node:16
USER jenkins
RUN cd front-end
RUN npm install
RUN npm test
RUN npm run build