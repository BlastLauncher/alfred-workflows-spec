#!/bin/bash

# Ensure you have installed `htmlq` and `parallel`
# Install via Homebrew: `brew install htmlq parallel`

# Base URL for Alfred workflows
BASE_URL="https://alfred.app/workflows/"
DOWNLOAD_PREFIX="https://alfred.app"
DOWNLOAD_SUFFIX="download"

# Directory to store downloaded workflows
DOWNLOAD_DIR="alfred_workflows"
LINKS_FILE="alfred_workflows_links.txt"

# Create download directory if it doesn't exist
mkdir -p "${DOWNLOAD_DIR}"

# File to store all download links
> "${LINKS_FILE}"

# Function to download workflows from a specific page
extract_workflow_links_from_page() {
    local page_url=$1
    echo "Processing page: ${page_url}"

    # Fetch the page content
    page_content=$(curl --silent "${page_url}")

    # Extract workflow page links and metadata
    workflow_links=($(echo "${page_content}" | htmlq --attribute href 'nav#workflowlist a'))

    total_items=${#workflow_links[@]}
    echo "Found ${total_items} workflows on this page."

    for ((i=0; i<total_items; i++)); do
        workflow_page_link=${workflow_links[$i]}
        workflow_page_url="${DOWNLOAD_PREFIX}${workflow_page_link}"

        # Fetch metadata to extract version info
        workflow_page_content=$(curl --silent "${workflow_page_url}")
        version=$(echo "${workflow_page_content}" | htmlq -t '#workflowmetadata')
        version=$(echo "${version}" | grep -oE 'Version [^ ]+' | cut -d ' ' -f 2)

        # Check if version was correctly parsed, if not set a default value
        if [[ -z "${version}" ]]; then
            version="unknown_version"
        fi

        # Construct download URL and filename
        workflow_download_url="${DOWNLOAD_PREFIX}${workflow_page_link}${DOWNLOAD_SUFFIX}"
        workflow_name=$(basename "${workflow_page_link}")

        # Save the download link and version
        echo "${workflow_download_url} ${workflow_name} ${version}" >> "${LINKS_FILE}"

        # Progress report for each item
        echo "Processed $((i + 1))/${total_items}: ${workflow_name}, Version: ${version}"
    done
}

# Function to get the total number of pages
get_total_pages() {
    first_page_content=$(curl --silent "${BASE_URL}")
    last_page_url=$(echo "${first_page_content}" | htmlq --attribute href '.pagelast a')
    total_pages=$(echo "${last_page_url}" | grep -oE '[0-9]+')
    echo "${total_pages}"
}

# Get the total number of pages
total_pages=$(get_total_pages)
echo "Total pages to process: ${total_pages}"

# Loop through each page and extract workflow links
for ((page=1; page<=total_pages; page++)); do
    if [[ $page -eq 1 ]]; then
        page_url="${BASE_URL}"
    else
        page_url="${BASE_URL}${page}/"
    fi
    extract_workflow_links_from_page "${page_url}"
done

echo "Extracted all download links. Starting concurrent downloads..."

# Function to download a single workflow
download_workflow() {
    local workflow_download_url=$1
    local workflow_name=$2
    local version=$3

    # Create directory for the workflow name if it doesn't exist
    version_dir="${DOWNLOAD_DIR}/${workflow_name}"
    mkdir -p "${version_dir}"

    # Filename with version
    output_file="${version_dir}/version-${version}.alfredworkflow"

    # Skip if file already exists
    if [[ ! -f "${output_file}" ]]; then
        echo "Downloading ${workflow_name} (version ${version}) from ${workflow_download_url}"
        curl -L --silent --output "${output_file}" "${workflow_download_url}"
    else
        echo "Skipping ${workflow_name} (version ${version}) - already exists"
    fi
}

# Export the download function and variable so they can be accessed by parallel
export -f download_workflow
export DOWNLOAD_DIR

# Run parallel downloads with a limit of 5 concurrent processes
cat "${LINKS_FILE}" | parallel -j 5 --colsep ' ' download_workflow {1} {2} {3}

echo "All downloads completed!"
