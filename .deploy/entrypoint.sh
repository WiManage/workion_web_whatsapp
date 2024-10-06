#!/bin/bash

bash /usr/src/app/.deploy/env.sh
pm2-runtime start "/usr/src/app/app.config.js"
