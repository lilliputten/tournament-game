#!/bin/sh
# @desc Update build date/time tag file with current timestamp
# @changed 2023.01.26, 16:43
# NOTE: This script updates only .txt files not properties in `package.json`.
# Use `update-build-variables.sh` script before build.

node "./utils/update-build-time.js"
