#!/bin/bash

# Script to copy Hermes framework dSYM files to the archive's dSYM folder
# This is required for crash reporting and symbolication

set -e

# Find the Hermes framework dSYM
# Try multiple possible locations
HERMES_DSYM_PATHS=(
  "${PODS_CONFIGURATION_BUILD_DIR}/hermes-engine/hermes.framework.dSYM"
  "${BUILT_PRODUCTS_DIR}/hermes.framework.dSYM"
  "${PODS_BUILD_DIR}/hermes-engine/hermes.framework.dSYM"
)

HERMES_DSYM_PATH=""

for path in "${HERMES_DSYM_PATHS[@]}"; do
  if [ -d "$path" ]; then
    HERMES_DSYM_PATH="$path"
    break
  fi
done

# Check if we're archiving (not just building)
if [ "$ACTION" != "install" ] && [ "$ACTION" != "archive" ]; then
  echo "Skipping Hermes dSYM copy - not archiving"
  exit 0
fi

# Check if Hermes dSYM exists
if [ -z "$HERMES_DSYM_PATH" ]; then
  echo "Warning: Hermes dSYM not found. Searched in:"
  for path in "${HERMES_DSYM_PATHS[@]}"; do
    echo "  - $path"
  done
  exit 0
fi

# Get the dSYM folder path
DSYM_FOLDER="${DWARF_DSYM_FOLDER_PATH}"

if [ -z "$DSYM_FOLDER" ]; then
  echo "Warning: DWARF_DSYM_FOLDER_PATH is not set"
  exit 0
fi

# Create dSYM folder if it doesn't exist
mkdir -p "$DSYM_FOLDER"

# Copy Hermes dSYM to the archive's dSYM folder
echo "Copying Hermes dSYM from $HERMES_DSYM_PATH to $DSYM_FOLDER"
cp -R "$HERMES_DSYM_PATH" "$DSYM_FOLDER/"

echo "✓ Hermes dSYM copied successfully"

