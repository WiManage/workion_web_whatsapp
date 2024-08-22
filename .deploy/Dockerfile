FROM node:18-alpine
USER root
# Installer les bibliothèques requises
RUN apk  update && apk add --no-cache  ffmpeg libgcc libstdc++ libx11 glib libxcomposite libxcursor libxdamage libxi libxrandr libxrender libxscrnsaver libxtst
RUN which ffmpeg
# Update the package repository and install libgtk-3 and related dependencies
RUN apk update && \
    apk add gtk+3.0 adwaita-icon-theme dbus-x11
RUN apk add bash

#pendences chrome
RUN apk  update && apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  polkit

# Installer les bibliothèques requises
RUN apk  update && apk add --no-cache libgcc libstdc++ libx11 glib libxcomposite libxcursor libxdamage libxi libxrandr libxrender libxscrnsaver libxtst

# Update the package repository and install libgtk-3 and related dependencies
RUN apk update && \
    apk add gtk+3.0 adwaita-icon-theme dbus-x11

# Donner les permissions sur le répertoire Chromium
RUN mkdir -p /home/node/.local-chromium \
  && chown -R node:node /home/node \
  && chown -R node:node /home/node/.local-chromium

# Définir la variable d'environnement pour le sandboxing
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
#pendences chrome


COPY ./ /usr/src/app/
WORKDIR /usr/src/app/
RUN npm install -g pm2
RUN npm install --legacy-peer-deps

RUN chmod +x /usr/src/app/.deploy/entrypoint.sh
RUN chmod +x /usr/src/app/.deploy/env.sh
WORKDIR /usr/src/app
EXPOSE 8889
CMD ["sh","/usr/src/app/.deploy/entrypoint.sh"]
