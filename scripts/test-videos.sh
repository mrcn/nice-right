#!/bin/bash
# Test script to verify videos are downloaded

VIDEOS_DIR="/Users/marcin/Code/nice-right/public/videos/tutorials"
EXPECTED_VIDEOS=(
  "step1-configure-variables.webm"
  "step2-create-trigger.webm"
  "step3-create-tag.webm"
  "step4-test.mp4"
)

FAILED=0

echo "Testing video downloads..."
echo "=========================="

for video in "${EXPECTED_VIDEOS[@]}"; do
  filepath="$VIDEOS_DIR/$video"
  if [ -f "$filepath" ]; then
    size=$(ls -lh "$filepath" | awk '{ print $5 }')
    echo "✓ $video ($size)"
  else
    echo "✗ $video - MISSING"
    FAILED=1
  fi
done

echo "=========================="
if [ $FAILED -eq 0 ]; then
  echo "✓ All videos downloaded successfully"
  exit 0
else
  echo "✗ Some videos are missing"
  exit 1
fi