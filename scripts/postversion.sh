 #!/bin/bash

 set -e

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
commit_message=$(git log -1 --pretty=%B)
filename=`basename "$0"`

if ! [[ $commit_message =~ ^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(-((0|[1-9][0-9]*|[0-9]*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9][0-9]*|[0-9]*[a-zA-Z-][0-9a-zA-Z-]*))*))?(\+([0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*))?$ ]]; then
  echo "${filename}: can't determine last commit was a version commit"
  exit 1
fi

set -x 
node "${SCRIPT_DIR}/update_manifest_version.js"
git add public/manifest.json
git commit --amend -CHEAD