import urllib.request

url = "https://www.restaurant-bzg.ch/dokumente/menueplaene/bzg1/menuplan-1.pdf"
path = "menuplan-1.pdf"

urllib.request.urlretrieve(url, path)