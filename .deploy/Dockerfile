FROM node:18-alpine
USER root
# Installer les bibliothèques requises
RUN apk  update && apk add --no-cache  ffmpeg libgcc libstdc++ libx11 glib libxcomposite libxcursor libxdamage libxi libxrandr libxrender libxscrnsaver libxtst
RUN which ffmpeg
# Update the package repository and install libgtk-3 and related dependencies
RUN apk update && \
    apk add gtk+3.0 adwaita-icon-theme dbus-x11
RUN apk add bash
COPY ./ /usr/src/app/
WORKDIR /usr/src/app/
RUN npm install -g pm2
RUN npm install --legacy-peer-deps

RUN npm run build
RUN chmod +x /usr/src/app/.deploy/entrypoint.sh
RUN chmod +x /usr/src/app/.deploy/env.sh
RUN cp -r /usr/src/app/app.config.js /usr/src/app/dist/app.config.js
WORKDIR /usr/src/app/dist
EXPOSE 8889
CMD ["sh","/usr/src/app/.deploy/entrypoint.sh"]
