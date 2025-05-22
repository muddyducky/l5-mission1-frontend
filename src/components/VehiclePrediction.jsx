import styles from "./VehiclePrediction.module.css";

export default function VehiclePrediction({
  image,
  setImage,
  setDisplayResult,
  selectedFileName,
  setSelectedFileName,
  highestPrediction,
  setHighestPrediction
}) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setSelectedFileName(file.name)
      uploadImage(file);
      setDisplayResult(null);
    }
  };

  const uploadImage = async (file) => {
    if (!file) {
      console.error("No file provided!");
      return;
    }

    const endpoint = import.meta.env.VITE_PREDICTION_ENDPOINT;
    const apiKey = import.meta.env.VITE_API_KEY;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Prediction-Key": apiKey,
          "Content-Type": "application/octet-stream",
        },
        body: file,
      });

      const result = await response.json();
      console.log("Predictions:", result.predictions);

      setDisplayResult(result.predictions);

      const maxPrediction= result.predictions.reduce((prev, current) =>
      prev.probability > current.probability ? prev : current
      )
      setHighestPrediction(maxPrediction);
    } catch(error) {
      console.error("There was an error uploading your image:", error)
    } 
  };

  return (
    <div className={styles.predictionContainer}>
      <div className={styles.content}>
        {image ? (
          <div className={styles.imageContainer}>
            <img
              src={image}
              alt="vehicle image"
              className={styles.uploadedImage}
            />
          </div>
        ) : (
          <p className={styles.placeholderText}>Upload Image</p>
        )}

        {image && highestPrediction && (
          <div className={styles.resultWindow}>
            <h3>Result</h3>
            <h1>
              {highestPrediction.tagName}:{''}
              {Math.round(highestPrediction.probability * 100)}%
            </h1>
          </div>
          
        )}
      </div>

      <div className={styles.inputContainer}>
        <input
          type="file"
          id="fileInput"
          onChange={handleImageChange}
          className={styles.hideInputButton}
        />
        <label htmlFor="fileInput" className={styles.customFileButton}>Choose File</label>
        <span className={styles.fileName}>{selectedFileName}</span>
      </div>
    </div>
  );
}
