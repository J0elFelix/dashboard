import urllib.request
import pymupdf

url = "https://www.restaurant-bzg.ch/dokumente/menueplaene/bzg1/menuplan-1.pdf"
path = "menuplan-1.pdf"

urllib.request.urlretrieve(url, path)

doc = pymupdf.open("menuplan-1.pdf")

page = doc[0]

zoom = 300 / 72
matrix = pymupdf.Matrix(zoom, zoom)

pix = page.get_pixmap(matrix=matrix)

pix.save("menuplan-1.png")

doc.close()