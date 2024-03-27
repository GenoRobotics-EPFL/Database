import argparse
import requests

from api_functions import *


parser = argparse.ArgumentParser(description='Interact with the FastAPI server.')
parser.add_argument('-k', required=True, help='API key for authentication')

args = parser.parse_args()

headers = {
    'Api-Key': args.k
}

url = "http://localhost:8000"

# add alice1 to the database
response = requests.post(url + "/persons", headers=headers, json=person("alice1", "alice123@epfl.ch"))

if response.status_code == 200:
    items = response.json()
    print(items)
else:
    print("Failed to retrieve items")

# get all of the people in the database
response = requests.get(url + "/persons", headers=headers)

if response.status_code == 200:
    items = response.json()
    print(items)
else:
    print("Failed to retrieve items")
