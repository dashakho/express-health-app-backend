#!/bin/bash

API="http://localhost:4741"
URL_PATH="/doctors"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "doctor": {
      "taxonomy_description": "'"${TAXONOMY_DESCRIPTION}"'",
      "first_name": "'"${FIRST_NAME}"'",
      "last_name": "'"${LAST_NAME}"'",
      "city": "'"${CITY}"'",
      "state": "'"${STATE}"'",
      "postal_code": "'"${POSTAL_CODE}"'",
    }
  }'

echo
