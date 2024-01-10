import { FormContainerCreate } from "./components/FormContainerCreate";
import { FormContainerEdit } from "./components/FormContainerEdit";
import { FormFile } from "./components/FormInputs/FormFile";
import { FormInput } from "./components/FormInputs/FormInputs";
import { FormSelect } from "./components/FormInputs/FormSelect";
import { FormTextArea } from "./components/FormInputs/FormTextArea";
import { FormMultipleInput } from "./components/FormMultipleInput";
import { FormStep } from "./components/FormStep";

export const Form = {
    ContainerCreate: FormContainerCreate,
    ContainerEdit: FormContainerEdit,
    Step: FormStep,
    Input: FormInput,
    TextArea: FormTextArea,
    File: FormFile,
    Select: FormSelect,
    Multiple: FormMultipleInput
}