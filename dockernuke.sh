docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker volume rm $(docker volume ls -q)
docker image rm -f $(docker images | grep "marquepage" | awk '{print $3}')