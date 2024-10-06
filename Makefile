setup:
	@make build
	@make up
build:
	docker-compose build --no-cache --force-rm
stop:
	docker-compose stop
rm:
	docker-compose rm -f
up:
	docker-compose up -d
# run:
# 	docker exec orion_backend bash -c "nest build"
# 	docker exec orion_backend bash -c "pm2 start dist/main.js --name orion-backend"
# 	docker exec orion_backend bash -c "pm2 startup systemd"
# 	docker exec orion_backend bash -c "pm2 save"

