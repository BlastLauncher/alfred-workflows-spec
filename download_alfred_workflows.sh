#!/bin/bash

# Base URL for Alfred workflows
BASE_URL="https://alfred.app/workflows/"
DOWNLOAD_PREFIX="https://alfred.app"
DOWNLOAD_SUFFIX="download"

# Directory to store downloaded workflows
DOWNLOAD_DIR="alfred_workflows"

# Create download directory if it doesn't exist
mkdir -p "${DOWNLOAD_DIR}"

# Function to download workflows from a specific page
download_workflows_from_page() {
    local page_url=$1
    echo "Processing page: ${page_url}"

    # Fetch the page content
    page_content=$(curl --silent "${page_url}")

    # Extract workflow page links
    echo "${page_content}" | htmlq --attribute href 'nav#workflowlist a' | while read -r workflow_page_link; do
        workflow_download_url="${DOWNLOAD_PREFIX}${workflow_page_link}${DOWNLOAD_SUFFIX}"
        workflow_name=$(basename "${workflow_page_link}")
        echo "Downloading ${workflow_name} from ${workflow_download_url}"
        curl -L --silent --output "${DOWNLOAD_DIR}/${workflow_name}.alfredworkflow" "${workflow_download_url}"
    done
}

# Function to get the total number of pages
get_total_pages() {
    # Fetch the first page content to determine the total number of pages
    first_page_content=$(curl --silent "${BASE_URL}")
    last_page_url=$(echo "${first_page_content}" | htmlq --attribute href '.pagelast a')
    total_pages=$(echo "${last_page_url}" | grep -oE '[0-9]+')
    echo "${total_pages}"
}

# Get the total number of pages
total_pages=$(get_total_pages)
echo "Total pages to process: ${total_pages}"

# Loop through each page and download workflows
for ((page=1; page<=total_pages; page++)); do
    if [[ $page -eq 1 ]]; then
        page_url="${BASE_URL}"
    else
        page_url="${BASE_URL}${page}/"
    fi
    download_workflows_from_page "${page_url}"
done

echo "All downloads completed!"
