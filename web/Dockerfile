# pull official base image
FROM node:lts-slim

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY ./src ./src
COPY ./public ./public

RUN ls -l
RUN ls -l public/
RUN ls -l src/

RUN npm --version

# start app
CMD ["npm", "start"]