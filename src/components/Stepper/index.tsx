import { useReducer } from "react";
import './index.css'
const steps = [
    { title: "Step One" },
    { title: "Step Two" },
    { title: "Step Three" },
    { title: "Step Four" }
];

interface State {
    currentStepIndex: number
}

const Stepper = () => {

    const [state, dispatch] = useReducer((state: State, action) => {
        switch (action.type) {
            case "next": {
                if (state.currentStepIndex !== steps.length - 1) return { currentStepIndex: state.currentStepIndex + 1 }
                return state
            }
            case "prev": {
                if (state.currentStepIndex !== 0) return { currentStepIndex: state.currentStepIndex - 1 }
                return state
            }
            default: return state
        }

    }, { currentStepIndex: 0 })



    // const [currentStepIndex, setCurrentStepIndex] = useState(0)
    // function handleNext() {
    //     if (currentStepIndex !== steps.length - 1) setCurrentStepIndex(currentStepIndex + 1)
    //     return
    // }
    // function handlePrevious() {
    //     if (currentStepIndex !== 0) setCurrentStepIndex(currentStepIndex - 1)
    //     return
    // }
    return (
        <>
            <div className="steps">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`step ${index <= state.currentStepIndex ? 'current' : ''}`}
                    >
                        {step.title}
                    </div>))}
            </div>
            <button onClick={() => dispatch({ type: "prev" })}>Previous</button>
            <button onClick={() => dispatch({ type: "next" })}>Next</button>
        </>
    )


}
export default Stepper;