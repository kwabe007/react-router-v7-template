#!/usr/bin/env bash

# Default values
choice=""
tag_message=""
skip_prompt=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    -p) choice="patch"; shift ;;
    -f) choice="feature"; shift ;;
    -y) skip_prompt=true; shift ;;
    -m)
      if [[ -n "$2" ]]; then
        tag_message="$2"
        shift 2
      else
        echo "Error: -m requires a message argument"
        exit 1
      fi
      ;;
    *)
      echo "Unknown argument: $1"
      echo "Usage: $0 {-p|-f} [-m \"tag message\"] [-y]"
      echo "  -p          Create a patch tag (required: choose -p or -f)"
      echo "  -f          Create a feature tag (required: choose -p or -f)"
      echo "  -m MESSAGE  Tag message (optional)"
      echo "  -y          Skip confirmation prompt (optional)"
      exit 1
      ;;
  esac
done

# Validate choice
if [[ -z "$choice" ]]; then
  echo "Error: must specify -p (patch) or -f (feature)"
  exit 1
fi

echo "Fetching tags from remote..."
# Fetch tags from remote
git fetch origin --tags

# Get latest tag from remote only, matching v[n].[m]
latest_tag=$(git ls-remote --tags origin | awk -F'/' '{print $3}' | grep -E '^v[0-9]+\.[0-9]+$' | sort -V | tail -n 1)

if [[ -z "$latest_tag" ]]; then
  latest_tag="v0.0"
fi

# Extract major and minor numbers
version_regex="v([0-9]+)\.([0-9]+)"
if [[ $latest_tag =~ $version_regex ]]; then
  major="${BASH_REMATCH[1]}"
  minor="${BASH_REMATCH[2]}"
else
  echo "Latest tag does not match expected format v[n].[m]. Exiting."
  exit 1
fi

# Determine new tag
if [[ "$choice" == "patch" ]]; then
  minor=$((minor + 1))
elif [[ "$choice" == "feature" ]]; then
  major=$((major + 1))
  minor=0
fi

new_tag="v${major}.${minor}"

# If no tag message supplied, use latest commit message
if [[ -z "$tag_message" ]]; then
  tag_message=$(git log -1 --pretty=%B)
fi

echo "New tag to be created: $new_tag"
echo "Tag message: $tag_message"

if [[ "$skip_prompt" != true ]]; then
  read -p "Proceed? [y/n]: " confirm
  [[ "$confirm" =~ ^[Yy]$ ]] || { echo "Aborting."; exit 1; }
fi

# Delete local tag if it exists
if git rev-parse "$new_tag" >/dev/null 2>&1; then
  git tag -d "$new_tag"
fi

# Create new tag locally
git tag -a "$new_tag" -m "$tag_message"

# Push tag to remote
git push origin "$new_tag"

# Output new tag
echo "Tag $new_tag created and pushed successfully."