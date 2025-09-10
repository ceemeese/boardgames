start-dev-env:
	docker compose -f docker-compose.dev.yaml up -d

stop-dev-env:
	docker compose -f docker-compose.dev.yaml down -v

start-all-test: stop-dev-env start-dev-env
	sleep 7
	npm test

.PHONY: start-all-test start-dev-env stop-dev-env

