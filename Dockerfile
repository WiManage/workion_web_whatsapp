FROM node:18-alpine3.17

RUN apk add --no-cache bash chromium && npm install -g pm2 --unsafe-perm

# # Create system user to run command
# RUN adduser --uid 1001 --disabled-password --gecos '' orion \
#     && adduser orion www-data \
#     && chown -R orion:orion /home/orion


# # Create system user to run command
# USER orion

# Create working directory
RUN mkdir -p /usr/src/orion-web-whatsapp
# Set working directory
WORKDIR /usr/src/orion-web-whatsapp

COPY package*.json ./

# Install project dependencies
RUN npm ci


# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY . ./
# RUN node index.js
# RUN cp -r ecosystem.config.js dist/ecosystem.config.js
EXPOSE 3001


# CMD "pm2 start dist/main.js --name orion-backend" && "pm2 startup systemd" && "pm2 save"
CMD [ "npm", "run", "start:pm2" ]