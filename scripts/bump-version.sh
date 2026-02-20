#!/bin/bash
# Auto-versioning script for Nice Right
# Updates version.json build number on each commit

VERSION_FILE="version.json"
BUILD_FILE="build.json"

# Read current version
CURRENT_VERSION=$(cat $VERSION_FILE | grep '"version"' | sed 's/.*"version": "\(.*\)".*/\1/')
MAJOR=$(echo $CURRENT_VERSION | cut -d. -f1)
MINOR=$(echo $CURRENT_VERSION | cut -d. -f2)
PATCH=$(echo $CURRENT_VERSION | cut -d. -f3)

# Increment patch version
NEW_PATCH=$((PATCH + 1))
NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"

# Update version.json
sed -i.bak "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" $VERSION_FILE
rm -f "${VERSION_FILE}.bak"

# Update build timestamp
BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
echo "{\"version\": \"$NEW_VERSION\", \"buildDate\": \"$BUILD_DATE\", \"buildNumber\": $NEW_PATCH}" > $BUILD_FILE

echo "✓ Version bumped: $CURRENT_VERSION → $NEW_VERSION"
echo "✓ Build date: $BUILD_DATE"

# Stage the updated files
git add $VERSION_FILE $BUILD_FILE