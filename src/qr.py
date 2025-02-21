import qrcode

data = "https://example.com"  # Replace with your URL or text
qr = qrcode.make(data)
qr.save("qrcode.png")  # Saves the QR code as an image
qr.show()  # Opens the QR code image
