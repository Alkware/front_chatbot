import { FormInput } from "./components/Fields/FormInput";
import { FormContainerForm } from "./components/Containers/FormContainerForm";
import { FormStep } from "./components/Containers/FormStep";
import { FormTextArea } from "./components/Fields/FormTextArea";
import { FormOptional } from "./components/Containers/FormOptional";
import { FormContainer } from "./components/Containers/FormContainer";
import { FormCheckBox } from "./components/Fields/FormCheckBox";
import { FormSelect } from "./components/Fields/FormSelect/FormSelect";
import { FormFile } from "./components/Fields/FormFile";
import { FormEditContainer } from "./components/Containers/FormEditContainer";
import { FormEditStep } from "./components/Containers/FormEditStep";
import { FormInputColor } from "./components/Fields/FormInputColor";
import { FormMultipleInputs } from "./components/Fields/FormMultipleInputs";

export const Root = {
    Form: FormContainerForm,
    EditForm: FormEditContainer,
    EditStep: FormEditStep,
    Step: FormStep,
    Optional: FormOptional,
    Container: FormContainer,
    Input: FormInput,
    TextArea: FormTextArea,
    Checkbox: FormCheckBox,
    Color: FormInputColor,
    Select: FormSelect,
    File: FormFile,
    MultipleInput: FormMultipleInputs,
}