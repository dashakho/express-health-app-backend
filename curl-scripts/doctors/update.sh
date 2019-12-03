API="http://localhost:4741"
URL_PATH="/doctors"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "doctor": {
    "taxonomy_description": "'"${taxonomy_description}"'",
    "first_name": "'"${first_name}"'",
    "city": "'"${city}"'",
    "state": "'"${state}"'",
    "postal_code": "'"${postal_code}"'",
  }
}'

echo
