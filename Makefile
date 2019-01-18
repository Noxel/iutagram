run:
	docker run -i -t -v ${PWD}:/app -w /app composer install
	docker-compose up -d
	sleep 20
	make reset

reset:
	docker-compose exec app bin/console doctrine:database:create --if-not-exists
	docker-compose exec app bin/console doctrine:schema:update --force
	docker-compose exec app bin/console hautelook:fixtures:load --no-interaction

reload:
	docker-compose exec app bin/console doctrine:database:drop --force
	docker-compose exec app bin/console doctrine:database:create --if-not-exists
	docker-compose exec app bin/console doctrine:schema:update --force
	docker-compose exec app bin/console hautelook:fixtures:load --no-interaction

db:
	docker-compose exec database mysql -uroot -proot iutagram