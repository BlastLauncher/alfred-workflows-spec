#!/bin/bash

# Directory containing the downloaded Alfred workflows
WORKFLOWS_DIR="alfred_workflows"
PLISTS_DIR="extracted_info_plists"

# Create a directory to store the extracted info.plist files if it doesn't exist
mkdir -p "${PLISTS_DIR}"

# Function to process each .alfredworkflow file
process_workflow() {
    PLISTS_DIR="extracted_info_plists"

    local workflow_path=$1
    local workflow_name=$(basename "$(dirname "${workflow_path}")")
    local version_name=$(basename "${workflow_path}" .alfredworkflow)
    local temp_dir=$(mktemp -d)

    # Unzip .alfredworkflow to the temporary directory
    unzip -qq "${workflow_path}" -d "${temp_dir}"

    # Find the info.plist file and move it to the target directory
    local plist_file=$(find "${temp_dir}" -name "info.plist")
    local target_dir="$PLISTS_DIR"

    mkdir -p "${target_dir}"
    if [[ -n "${plist_file}" ]]; then
        cp "${plist_file}" "${target_dir}/$workflow_name.plist"
        echo "Extracted info.plist for ${workflow_name}, version ${version_name}"
    else
        echo "No info.plist found in ${workflow_name}, version ${version_name}"
    fi

    # # Clean up temporary directory
    rm -rf "${temp_dir}"
}

# Export the function to be used by GNU parallel
export -f process_workflow

# Find all .alfredworkflow files and process them concurrently
find "${WORKFLOWS_DIR}" -name "*.alfredworkflow" | parallel -j 5 process_workflow

echo "All info.plist files have been extracted!"
