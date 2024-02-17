FROM node:lts-alpine
WORKDIR /app
ADD . /app
RUN npm ci && npm run build
CMD [ "npm", "start", "--", "-p", "5000" ]
