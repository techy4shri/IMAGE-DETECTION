import React, { useState } from "react";

const ImageUploadForm = () => {
  const [selectImage, setSelectedImage] = useState(null);
  const [SelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    //s
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Read as data URL (optional)
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Store data URL
      };
    }
  };

  return (
    <form>
      <label htmlFor="image-upload">Select an Image:</label>
      <input
        type="file"
        id="image-upload"
        name="image"
        onChange={handleImageChange}
      />
      <p class="support">We support .png, .bmp, .jpg and .jpeg file formats!</p>
      {SelectedImage && (
        <div>
          <img src={selectedImage} alt="upload preview" />
        </div>
      )}
      <button class="click" onClick={() => triggerProcessing()}>
        Upload
      </button>
    </form>
  );
  function triggerProcessing() {
    // Send the image data to backend (using fetch)
    fetch("/process-image", {
      method: "POST",
      body: JSON.stringify({ imageData: SelectedImage }), // Send data URL
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error sending image data:", error);
      });
  }
};

export default ImageUploadForm;
