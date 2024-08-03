name=$(npm pkg get name)
version=$(npm pkg get version --workspaces=false)
short_date=$(date -u +'%y%m%d-%H%M')
full_date=$(date -u +'%Y-%m-%dT%H:%M:%SZ')

echo ${name//\"/}:${version//\"/}-$full_date

#docker build marquepage-api:$version .

# Blue/Green Trunk dev cycle :
# Dev pull blue(trunk)
# Make a feature branch
# Can push whatever code on that feature branch
# Local testing validate the code
# only if the testing are ok can you merge on trunk and publish to image repo

# Build a test image
# Do the testing
# Then build a clean production ready image


