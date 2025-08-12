import { useReducer } from "react"
import './index.css'

interface State {
    currentStepIndex: number
    form: Record<string, string>
}

type Action = { type: 'next' } | { type: "prev" } | { type: string, payload: Record<string, string> }

const Form = () => {
    function formReducer(state: State, action: Action) {
        switch (action.type) {
            case "next": {
                if (state.currentStepIndex !== steps.length - 1) return { ...state, currentStepIndex: state.currentStepIndex + 1 }
                return state
            }
            case "prev": {
                if (state.currentStepIndex !== 0) return { ...state, currentStepIndex: state.currentStepIndex - 1 }
                return state
            }
            case "change": {
                return {
                    ...state,
                    form: {
                        ...state.form,
                        [action.payload.name]: action.payload.value
                    }
                }
            }
            default: return state

        }
    }
    const steps = [
        {
            title: "Personal Information",
            fields: [
                { name: "firstName", type: "text", placeholder: "First Name" },
                { name: "lastName", type: "text", placeholder: "Last Name" },
                { name: "email", type: "email", placeholder: "Email" },
                { name: "phone", type: "tel", placeholder: "Phone Number" }
            ]
        },
        {
            title: "Address Details",
            fields: [
                { name: "street", type: "text", placeholder: "Street Address" },
                { name: "city", type: "text", placeholder: "City" },
                { name: "state", type: "text", placeholder: "State" },
                { name: "zip", type: "text", placeholder: "Zip Code" }
            ]
        },
        {
            title: "Payment Information",
            fields: [
                { name: "cardNumber", type: "text", placeholder: "Credit Card Number" },
                { name: "expiry", type: "text", placeholder: "Expiration Date" },
                { name: "cvv", type: "password", placeholder: "CVV" },
                { name: "billingAddress", type: "text", placeholder: "Billing Address" }
            ]
        },
        {
            title: 'Review and Confirm',
            review: true
        }
    ];

    const [state, dispatch] = useReducer(formReducer, {
        currentStepIndex: 0, form: {}
    })

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let { name, value } = event.target
        dispatch({ type: 'change', payload: { name, value } })

    }
    function handleNext() {
        dispatch({ type: 'next' })
    }
    function handlePrev() {
        dispatch({ type: 'prev' })
    }
    return (
        <div id='container'>
            {steps.map((step, index) => (
                <div key={index} className={` step ${state.currentStepIndex == index ? "current" : 'hidden'}`}>
                    <h1>{step.title}</h1>
                    {step.review && (
                        <div>
                            {
                                Object.entries(state.form || {}).map((
                                    [key, value]) => (<p key={key}><strong>{key}:</strong> {value}</p>
                                ))}
                        </div>
                    )}

                    {step.fields && step?.fields.map(field => <input
                        key={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        value={state.form?.[field.name] || ''}
                    />)}
                </div>
            ))}
            <div className="btn-div">
                {state.currentStepIndex != 0 && (
                    <button onClick={handlePrev}>Previous</button>
                )}
                {state.currentStepIndex < steps.length - 1 ? (
                    <button onClick={handleNext}>Next</button>
                ) : (
                    <button onClick={handleNext}>Submit</button>

                )}
            </div>
        </div>
    )
}
export default Form