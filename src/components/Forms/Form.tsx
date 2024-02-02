import { FormContainer } from "./components/FormContainer";
import { FormControllerButton } from "./components/FormControllerButton";
import { FormFile } from "./components/FormInputs/FormFile";
import { FormInputHour } from "./components/FormInputs/FormInputHour";
import { FormInput } from "./components/FormInputs/FormInputs";
import { FormSelect } from "./components/FormInputs/FormSelect";
import { FormSlug } from "./components/FormInputs/FormSlug";
import { FormTextArea } from "./components/FormInputs/FormTextArea";
import { FormMultipleInput } from "./components/FormMultipleInputs";
import { FormOptionalInput } from "./components/FormOptionalInput";
import { FormStep } from "./components/FormStep";

export const Form = {
    Container: FormContainer,
    Step: FormStep,
    Input: FormInput,
    InputHour: FormInputHour,
    Slug: FormSlug,
    TextArea: FormTextArea,
    File: FormFile,
    Select: FormSelect,
    Optional: FormOptionalInput,
    Multiple: FormMultipleInput,
    ControllerButton: FormControllerButton

}
