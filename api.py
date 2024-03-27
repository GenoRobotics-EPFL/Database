import sys
import argparse
import requests

# sys.path.append("src")

# import pydantic_schemas

parser = argparse.ArgumentParser(description='Interact with the FastAPI server.')
parser.add_argument('-k', required=True, help='API key for authentication')

args = parser.parse_args()

headers = {
    'Api-Key': args.k
}

url = "http://localhost:8000"

response = requests.get(url + "/persons", headers=headers)

if response.status_code == 200:
    items = response.json()
    print(items)
else:
    print("Failed to retrieve items")

