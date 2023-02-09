#!/bin/sh
# @desc Config variables (common version -- stored in repository)
# @changed 2023.02.09, 16:13

# NOTE: Don't forget to update rules in `public-publish/.htaccess` and `public-publish/robots.txt` files if you changed branch from production to demo.

# TODO: To make `DIST_BRANCH` depended on a project build type?
DIST_BRANCH="publish" # Production build -> html-app-build
# DIST_BRANCH="publish-demo" # Demo build -> html-app-build-demo

DIST_REPO="git@github.com:lilliputten/tournament-game.git"
SRC_TAG_PREFIX="v" # "v" for default tags like "v.X.Y.Z"

PUBLISH_FOLDER="$DIST_BRANCH"
