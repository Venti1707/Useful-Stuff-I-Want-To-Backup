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
# url = "https://geohack.toolforge.org/geohack.php?pagename=Singapore_Institute_of_Technology&params=1_17_25_N_103_50_58_E_region:SG_type:edu"
url = "https://geohack.toolforge.org/geohack.php?language=ja&pagename=%E5%80%89%E6%95%B7%E8%B2%A8%E7%89%A9%E3%82%BF%E3%83%BC%E3%83%9F%E3%83%8A%E3%83%AB%E9%A7%85&params=34_31_19.6_N_133_43_25.9_E_type:railwaystation_region:JP-33"
try:
    scraped_data = scrapeGeoHack(url)
    print("✅ Scraped data", scraped_data)
except Exception as e:
    print(e)
