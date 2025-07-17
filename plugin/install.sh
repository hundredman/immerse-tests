# This script builds and installs the plugin for registering its custom
# tools for Donobu. After this script has run, then start or restart the
# Donobu app and the tools will be available in Donobu.
set -e
set -x

REPO_NAME="$(basename -s .git `git rev-parse --show-toplevel`)"
PLUGIN_NAME="${REPO_NAME}-custom-tools"
PLUGINS_DEPLOYMENT_DIR="${HOME}/Library/Application Support/Donobu Studio/plugins"
PLUGIN_DEPLOYMENT_DIR="${PLUGINS_DEPLOYMENT_DIR}/${PLUGIN_NAME}"
# Create the overall plugins directory that Donobu will check on boot.
mkdir -p "${PLUGINS_DEPLOYMENT_DIR}"
# Build the plugin.
npm run build
# Remove the old plugin if it exists.
rm -rf "${PLUGIN_DEPLOYMENT_DIR}"
# Install the new plugin.
cp -r dist "${PLUGIN_DEPLOYMENT_DIR}"
