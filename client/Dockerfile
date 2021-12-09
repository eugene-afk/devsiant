FROM node:16-alpine3.13
WORKDIR /app
ARG port
ARG api_url
ARG env
ARG max_file_size
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
ENV REACT_APP_ENV=$env
ENV REACT_APP_API_URL=$api_url
ENV REACT_APP_PORT=$port
ENV REACT_APP_MAX_FILE_SIZE=$max_file_size
CMD ["npm", "start"]