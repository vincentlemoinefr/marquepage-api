# better than if [ $? -ne 0 ]; then exit 0; fi
# https://gist.github.com/mohanpedala/1e2ff5661761d3abd0385e8223e16425
set -euxo pipefail

name="marquepage"
service_name="$name-$1"
service_volume="$name"_"$1"

if [[ ! -z "$service_name" ]]
then
  docker stop $(docker ps -a | tail -n +2 | grep "$service_name" | awk '{print $1}')
  docker rm $(docker ps -a | tail -n +2 | grep "$service_name" | awk '{print $1}')
  docker volume rm $(docker volume ls | tail -n +2 | grep "$service_volume" | awk '{print $2}' )
fi

if [ "$service_name" == "marquepage-api" ]
then
  docker image rm -f $(docker images | grep "$service_name" | awk '{print $3}')
fi
