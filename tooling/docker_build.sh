# This script will fail miserably if anything is wrong
# better than if [ $? -ne 0 ]; then exit 0; fi
# https://gist.github.com/mohanpedala/1e2ff5661761d3abd0385e8223e16425
set -euxo pipefail

package_name=$(npm pkg get name | tr -d '"')
version=$(npm pkg get version --workspaces=false | tr -d '"')
full_date=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
commit_hash=$(git rev-parse --short HEAD)
do_it_fast=true
clean_before_use=true

export IMAGE_NAME="$package_name:latest"

echo "Building image : $IMAGE_NAME starting at $full_date"

if [ $clean_before_use = true ]; then
  docker image rm -f $(docker images | grep "$package_name" | awk '{print $3}') || echo "No images to remove" 
fi

if [ $do_it_fast = false ]; then
  docker build . --check
fi

docker build . \
  --build-arg BUILD_DATE=$full_date \
  --build-arg BUILD_VERSION=$version \
  -t $IMAGE_NAME

if [ $do_it_fast = false ]; then
  docker scout quickview $IMAGE_NAME
  docker scout recommendations $IMAGE_NAME
fi

finished_date=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
echo "Building image : $IMAGE_NAME finished at $finished_date"