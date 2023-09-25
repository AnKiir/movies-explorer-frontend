import { useState, useCallback } from "react";

const useForm = () => {
    const [enteredValues, setEnteredValues] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [isError, setIsError] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChangeInput = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setEnteredValues({ ...enteredValues, [name]: value });

        setIsError({ ...isError, [name]: e.target.validationMessage });

        setIsFormValid(e.target.closest('form').checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsFormValid = false) => {
            setEnteredValues(newValues);
            setIsError(newErrors);
            setIsFormValid(newIsFormValid);
        },
        [setEnteredValues, setIsError, setIsFormValid]
    );
    return { enteredValues, handleChangeInput, isFormValid, isError, resetForm };
};

export default useForm;
