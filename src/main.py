from PIL import Image, ImageDraw

def create_image_from_binary(binary_data):
  """
  Creates a black and white image from a list of 0s and 1s representing pixels, resized to a larger size.

  Args:
      binary_data: A list of 0s and 1s with a length of 8 * 12 (96 elements) representing the image data.

  Returns:
      A PIL image object representing the black and white image, resized to a larger size.
  """

  # Check if input data length is valid
  if len(binary_data) != 8 * 12:
    raise ValueError("Input data length must be 8 * 12 (96 elements)")

  # Individual square size (considering desired final size)
  square_size = 270

  # Calculate total image width and height based on square size
  width = 8 * square_size
  height = 12 * square_size

  # Create empty image with the calculated dimensions
  image = Image.new("L", (width, height))

  # Define starting coordinates for each square (pixel)
  x = 0
  y = 0

  for i, value in enumerate(binary_data):
    # Convert each binary value to pixel value
    pixel_value = 255 if value == 1 else 0

    # Create a new drawing object for the image
    draw = ImageDraw.Draw(image)

    # Fill the entire square using rectangle coordinates and pixel value
    draw.rectangle((x, y, x + square_size, y + square_size), fill=pixel_value)

    # Move to the next square position
    x += square_size
    if x >= width:
      x = 0
      y += square_size

  # Resize the image to the desired final size
  final_width = 2160
  final_height = 3240
  resized_image = image.resize((final_width, final_height), Image.ANTIALIAS)  # Use antialiasing for smoother scaling

  return resized_image

# Example usage
binary_data = list("01110010 01101111 01110011 01110101 01100100 01110010 01110011 01110010 01110110 01110010 01010000 00110011".replace(" ", ""))  # Replace with your actual data (length of 96)

binary = create_image_from_binary(binary_data)
binary.show()
