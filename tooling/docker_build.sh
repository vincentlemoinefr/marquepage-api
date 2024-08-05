# This script will miserably fail if anything is wrong
# better than if [ $? -ne 0 ]; then exit 0; fi
# https://gist.github.com/mohanpedala/1e2ff5661761d3abd0385e8223e16425
set -euxo pipefail

package_name=$(npm pkg get name | tr -d '"')
version=$(npm pkg get version --workspaces=false | tr -d '"')
full_date=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
commit_hash=$(git rev-parse --short HEAD)
do_it_fast=true
clean_before_use=true

export IMAGE_NAME=$package_name:$version-$commit_hash

# git add .
# git commit -m "Automatic commit for $version"

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

docker compose up



# git reset HEAD~


# We would like :
# The application need APIs (database, apis, services) -> dependencies
# To test the application we need all the dependencies
# We should be able to turn on or off dependencies
# With 0 dependencies the application should still launch even if with limited functions
# Exemple : 
# Our api need the database
# No database -> we can still start the api with some endpoints like /current
# The application can do some of this :
# 1. start with minimal functionnalities
# 2. if the dependency feature is off it will never retry to connect
# 3. If it's on, the application can retry to connect periodically
#   3.1. with a timeout and a max number of retries ? 0 = infinite
# We could have a database state parameter (connected : true/false)

# Ideally in dev we need 1 command per service needed :
# launch:service1
# launch:service2
# launch:database
# build:application
# launch:application
# killall
# kill/rebuild:service1
# kill/rebuild:service2
# kill/rebuild:database
# kill/rebuild:application


# The dev should be able to build the application and dependencies all one by one
# We need a dependencies tree


# local dev environment
# 1/ dev something
# 1.1/ dev use command "build.sh"
#   - get package name
#   - get short commit hash
#   - get version
# 2/ git add . git commit [no push] (automatic)
# 3/ docker build command with image name : "name:version-githash"
# 4/ build success
#   - if fail : last commit reverted, image deleted
#   - if success : next
# 5/ We need infrastructure : local virtualbox / vmware (vagrant)
# 5.1/ We don't want to rebuild the docker running VM everytime
# 6/ isolated testing on that image (no external api or db)
#   - if fail : last commit reverted, container deleted, image deleted
#   - if success : increment version, git add, git commit new version, git puh allowed