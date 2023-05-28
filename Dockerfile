FROM node:16
RUN cd front-end
RUN npm install
RUN npm test
RUN npm run build