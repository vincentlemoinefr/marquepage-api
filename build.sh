# This script will miserably fail if anything is wrong
# https://gist.github.com/mohanpedala/1e2ff5661761d3abd0385e8223e16425
set -euxo pipefail

package_name=$(npm pkg get name | tr -d '"')
version=$(npm pkg get version --workspaces=false | tr -d '"')
full_date=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
commit_hash=$(git rev-parse --short HEAD)
do_it_fast=true
clean_before_use=true

git add .
git commit -m "Automatic commit for $version"

echo "Building image : $package_name:$version-$commit_hash starting at $full_date"

if [ $clean_before_use = true ]; then
  docker image rm -f $(docker images | grep '$package_name') || true
fi

if [ $do_it_fast = false ]; then
  docker build . --check
fi

docker build . \
  --build-arg BUILD_DATE=$full_date \
  --build-arg BUILD_DATE=$version \
  -t $package_name:$version-$commit_hash

if [ $do_it_fast = false ]; then
  docker scout quickview $package_name:$version-$commit_hash
  docker scout recommendations $package_name:$version-$commit_hash
fi

finished_date=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
echo "Building image : $package_name:$version-$commit_hash finished at $finished_date"

# git reset HEAD~


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