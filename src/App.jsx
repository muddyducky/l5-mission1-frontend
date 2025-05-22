import { useState } from 'react'
import styles from './App.module.css'
import VehiclePrediction from './components/VehiclePrediction'
import logo from '../public/images/turnersLogo.png'


function App() {
  const [image, setImage] = useState(null);
  const [displayResult, setDisplayResult] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("No file selected");
  const [highestPrediction, setHighestPrediction]=useState(null)

 
  return (
    <div className={styles.appContainer}>
      <img src={logo} alt="turners-logo" className={styles.logo} />
      <h1>Turners Insurance Vehicle Prediction</h1>
      <VehiclePrediction
        image={image}
        setImage={setImage}
        setDisplayResult={setDisplayResult}
        selectedFileName={selectedFileName}
        setSelectedFileName={setSelectedFileName}
        highestPrediction={highestPrediction}
        setHighestPrediction={setHighestPrediction}
      />
   

      

    </div>
  )
}

export default App
