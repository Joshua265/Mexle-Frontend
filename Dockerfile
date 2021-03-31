# pull official base image
FROM node:12.20.1-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN apk add --no-cache git
RUN yarn install
RUN npm install -g serve

# add app
COPY . ./

#build app
RUN yarn run build

EXPOSE 3000

# start app
CMD ["serve", "-s", "build", "-l", "3000"]
