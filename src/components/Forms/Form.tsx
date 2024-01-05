import { FormContainer } from "./components/FormContainer";
import { FormFile } from "./components/FormInputs/FormFile";
import { FormInput } from "./components/FormInputs/FormInputs";
import { FormSelect } from "./components/FormInputs/FormSelect";
import { FormTextArea } from "./components/FormInputs/FormTextArea";
import { FormMultipleInput } from "./components/FormMultipleInput";
import { FormStep } from "./components/FormStep";

export const Form = {
    Container: FormContainer,
    Step: FormStep,
    Input: FormInput,
    TextArea: FormTextArea,
    File: FormFile,
    Select: FormSelect,
    Multiple: FormMultipleInput
}