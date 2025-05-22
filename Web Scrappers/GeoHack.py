import requests
from bs4 import BeautifulSoup

def scrapeGeoHack(url):
    if "geohack.toolforge.org/geohack.php" not in url:
        raise ValueError("❌ Not a GeoHack page URL.")

    response = requests.get(url)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, 'html.parser')

    location_element = soup.find(id="firstHeading")
    latitude_element = soup.select_one(".latitude")
    longitude_element = soup.select_one(".longitude")

    if not (location_element and latitude_element and longitude_element):
        raise Exception("❌ Required elements not found.")

    locationName = location_element.text.replace("GeoHack - ", "").strip()
    latitude = latitude_element.text.strip()
    longitude = longitude_element.text.strip()

    data = {
        "latitude": latitude,
        "longitude": longitude,
        "locationName": locationName
    }
    return data

# Example usage
url = "https://geohack.toolforge.org/geohack.php?pagename=Singapore_Institute_of_Technology&params=1_17_25_N_103_50_58_E_region:SG_type:edu"
try:
    scraped_data = scrapeGeoHack(url)
    print("✅ Scraped data", scraped_data)
except Exception as e:
    print(e)
