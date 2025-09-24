import { useReducer } from "react"

interface State {
    currentStepIndex: number
    form: Record<string, string>
}

interface Field {
    name: string
    type: string
    placeholder: string
    options?: string[],
}
interface Step{
    title:string,
    fields?:Field[]
    review?:boolean
}
type Action = { type: 'next' } | { type: "prev" } | { type: string, payload: Record<string, string> }

const Form = () => {
    function formReducer(state: State, action: Action) {
        switch (action.type) {
            case "next": {
                if (state.currentStepIndex !== steps.length - 1)
                    return { ...state, currentStepIndex: state.currentStepIndex + 1 }
                return state
            }
            case "prev": {
                if (state.currentStepIndex !== 0)
                    return { ...state, currentStepIndex: state.currentStepIndex - 1 }
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

    const steps:Step[] = [
        {
            title: "Personal Information",
            fields: [
                { name: "firstName", type: "text", placeholder: "First Name" },
                { name: "lastName", type: "text", placeholder: "Last Name" },
                { name: "email", type: "email", placeholder: "Email" },
                { name: "phone", type: "tel", placeholder: "Phone Number" },
                {
                    name: "gender",
                    type: "select",
                    placeholder: "Gender",
                    options: ["Male", "Female", "Other"]
                }, {
                    name: "subscribe",
                    type: "checkbox",
                    placeholder: "Subscribe to newsletter"
                }
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

    let step = steps[state.currentStepIndex]
    const renderField = (field: Field) => {
        switch (field.type) {
            case "select": {
                return (
                    <select
                        key={field.name}
                        name={field.name}
                        value={state.form?.[field.name] || ''}
                        onChange={(e) =>
                            dispatch({ type: 'change', payload: { name: field.name, value: e.target.value } })
                        }
                        className="text-gray-900 bg-white rounded-md border border-gray-300 px-4 py-2 w-full my-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>{field.placeholder}</option>
                        {field.options?.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                )
            }
            case "checkbox": {
                return (
                    <label key={field.name} className="flex items-center space-x-2 my-2">
                        <input
                            type="checkbox"
                            name={field.name}
                            checked={state.form?.[field.name] === 'true'}
                            onChange={(e) =>
                                dispatch({
                                    type: 'change',
                                    payload: { name: field.name, value: e.target.checked.toString() }
                                })
                            }
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-white">{field.placeholder}</span>
                    </label>
                )
            }
            default: {
                return (
                    <input
                        key={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        value={state.form?.[field.name] || ''}
                        className="text-gray-900 bg-white rounded-md border border-gray-300 px-4 py-2 w-full my-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )
            }
        }

    }
    return (
        <div className="w-[600px] min-h-[400px] mx-auto p-6">
            <div className="rounded-lg p-6 bg-teal-900 text-white">
                <h1 className="text-2xl font-bold mb-4">{step.title}</h1>

                {step.review && (
                    <div className="space-y-2">
                        {Object.entries(state.form || {}).map(([key, value]) => (
                            <p key={key}><strong>{key}:</strong> {value}</p>
                        ))}
                    </div>
                )}

                {step.fields && step.fields.map(field => renderField(field))}
            </div>

            <div className="w-full mt-4 flex justify-between">
                {state.currentStepIndex !== 0 && (
                    <button
                        onClick={handlePrev}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Previous
                    </button>
                )}
                {state.currentStepIndex < steps.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-auto"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-auto"
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    )
}

export default Form
