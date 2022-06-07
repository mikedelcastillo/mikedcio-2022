import React, {
    Dispatch,
    FC,
    FormEventHandler,
    SetStateAction,
    useEffect,
    useState,
} from "react"
import { AnySchema, ValidationError } from "yup"

type Props = {
    id?: string,
    type?: string,
    className?: string,
    set?: Dispatch<SetStateAction<string>>,
    get: string,
    error?: null|string,
}

export const useStateWithValidation = (
    initialValue: string, 
    schema?: AnySchema
): [
    string, 
    Dispatch<SetStateAction<string>>, 
    null|string
] => {
    const [value, setValue] = useState<string>(initialValue)
    const valueValidation = useInputTextValidation(value, schema)
    return [value, setValue, valueValidation]
}

export const useInputTextValidation = (value: string, schema?: AnySchema) => {
    const [error, setError] = useState<null|string>(null)

    useEffect(() => {
        schema && schema.validate(value).then(() => {
            setError(null)
        }).catch(e => {
            const yupError = e as ValidationError
            if(yupError.message){
                setError(yupError.message)
            }
        })
    }, [value])

    return error
}

const InputText: FC<Props> = (props) => {

    const setValue = (value: string) => {
        if(typeof props.set === "function"){
            props.set(value)
        }
    }

    const inputHandler: FormEventHandler = (e) => {
        const target = e.target as HTMLInputElement
        setValue(target.value)
    }
    return (
        <>
            <input type={props.type ?? "text"} value={props.get} onInput={inputHandler} />
            { typeof props.error === "string" ? (
                <>
                    <b>{props.error}</b>
                </>
            ) : (
                <></>
            ) }
        </>
    )
}

export default InputText
