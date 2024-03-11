import React, { useState } from 'react';

function AssistantsSlider({ setMinImportance, assistants, setAssistantsInSlider }) {
  const stepNames = ['deactivated', '1', '2', '3'];
  const [assistantsBeforeDeactivation, setAssistantsBeforeDeactivation] = useState([])
  const [value, setValue] = useState(3)
  
  const handleChange = (sliderValue) => {
    const sliderValueImportanceTable = { 0: 11, 1: 3, 2: 6, 3: 8 }
    setValue(sliderValue)

    setMinImportance(previousMinImportance => {

      console.log(previousMinImportance)

      // Deactivate all assistants
      if (previousMinImportance <= 10 && sliderValue === 0) {
        setAssistantsBeforeDeactivation(assistants)
        assistants.forEach(assistant => setAssistantsInSlider(assistant))
        return sliderValueImportanceTable[sliderValue]

      // Reactivate all assistants
      } else if (previousMinImportance >= 10 && assistantsBeforeDeactivation.length > 0 && sliderValue > 0) {
        assistantsBeforeDeactivation.forEach(assistant => setAssistantsInSlider(assistant))
        return sliderValueImportanceTable[sliderValue]
        
      // Change importance
      } else {
        return sliderValueImportanceTable[sliderValue]
      }


    });

  //   // Deactivate all assistants
  //   if (minImportance <= 10 && sliderValue === 0) {
  //     setMinImportance(sliderValueImportanceTable[sliderValue]);
  //     setAssistants(previousAssistants => {
  //       setAssistantsBeforeDeactivation(previousAssistants)
  //       return []
  //     });
  //     return

  //     // Reactivate assistants
  //   } else if (minImportance >= 10 && assistantsBeforeDeactivation.length > 0 && sliderValue > 0) {
  //     setMinImportance(sliderValueImportanceTable[sliderValue]);
  //     setAssistants(assistantsBeforeDeactivation);
  //     return
      
  //     // Change importance
  //   } else {
  //     setMinImportance(sliderValueImportanceTable[sliderValue]);
  //     return
  //   }
  };

  return (
    <div>
      <input
        type="range"
        min="0"
        max="3"
        value={value}
        onChange={(e) => handleChange(parseInt(e.target.value, 10))}
        step="1"
      />
      <div>Value: {stepNames[value]}</div> 
    </div>
  );
}

export default AssistantsSlider;
