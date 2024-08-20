# better than if [ $? -ne 0 ]; then exit 0; fi
# https://gist.github.com/mohanpedala/1e2ff5661761d3abd0385e8223e16425
set -euxo pipefail

service_name="$1"
no_attach=""
package_name=$(npm pkg get name | tr -d '"')
export IMAGE_NAME="$package_name:latest"

# Check if the image doesn't exist, we need to build it
if [[ ! $(docker images | grep "$package_name" | awk '{print $3}') ]]
then
  npm run docker:build:api
fi

# We don't want to attach mongo log to console
if [ "$service_name" == "db" ]
then
  no_attach="--no-attach $service_name -d"
fi

docker compose up $service_name $no_attach