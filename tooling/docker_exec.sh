#!/bin/bahs

export MSYS_NO_PATHCONV=1

imagename=$1

echo $imagename

container_hash=$(docker ps -a | grep "$imagename" | awk '{print $1}')

docker exec -it $container_hash /bin/bash