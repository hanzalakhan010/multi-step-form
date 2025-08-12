import { useState } from "react";
import './index.css'
const steps = [
    { title: "Step One" },
    { title: "Step Two" },
    { title: "Step Three" },
    { title: "Step Four" }
];

const Stepper = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    function handleNext() {
        if (currentStepIndex !== steps.length - 1) setCurrentStepIndex(currentStepIndex + 1)
        return
    }
    function handlePrevious() {
        if (currentStepIndex !== 0) setCurrentStepIndex(currentStepIndex - 1)
        return
    }
    return (
        <>
            <div className="steps">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`step ${index <= currentStepIndex ? 'current' : ''}`}
                    >
                        {step.title}
                    </div>))}
            </div>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
        </>
    )


}
export default Stepper;