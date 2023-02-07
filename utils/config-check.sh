#!/bin/sh
# @desc Check basic required variables
# @changed 2023.01.26, 16:43

ARGS="$*"

if [ -z "$DIST_REPO" ]; then
  echo "Repository url isn't specified. See 'DIST_REPO' parameter in 'config.sh'"
  exit 1
fi
if [ -z "$DIST_BRANCH" ]; then
  echo "Repository branch isn't specified. See 'DIST_BRANCH' parameter in 'config.sh'"
  exit 1
fi
if [ -z "$PUBLISH_FOLDER" ]; then
  echo "Publish folder isn't specified. See 'PUBLISH_FOLDER' parameter in 'config.sh'"
  exit 1
fi

# Check publish folder if parameter '--omit-publish-folder-check' isn't specified...
if [ ! -z "${ARGS##*--omit-publish-folder-check*}" -a ! -d "$PUBLISH_FOLDER" ]; then
  echo "No publish folder. Probably submodule was not initialized. Use script 'publish-init.sh'."
  exit 1
fi
