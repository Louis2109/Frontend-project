import requests
import logging

# Configure logging
logging.basicConfig(
    filename='api_test.log',
    level=logging.INFO,
    format='%(asctime)s %(levelname)s: %(message)s'
)

API_KEY = "c3e616771364a879798c4a4c1584f45b"
CITY = "Douala"
API_URL = f"https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={API_KEY}"

try:
    response = requests.get(API_URL)
    logging.info(f"Status Code: {response.status_code}")
    logging.info(f"Response Body: {response.text}")

    if response.status_code == 200:
        print("API key is valid. See api_test.log for details.")
    else:
        print("API key test failed. See api_test.log for details.")
except Exception as e:
    logging.error(f"Exception occurred: {e}")
    print("An error occurred. See api_test.log for details.")