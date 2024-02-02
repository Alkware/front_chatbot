import { FormInput } from "./components/Fields/FormInput";
import { FormContainer } from "./components/Containers/FormContainer";
import { FormStep } from "./components/Containers/FormStep";
import { FormTextArea } from "./components/Fields/FormTextArea";
import { FormOptional } from "./components/Containers/FormOptional";
import { FormFlex } from "./components/Containers/FormFlex";
import { FormCheckBox } from "./components/Fields/FormCheckBox";
import { FormSelect } from "./components/Fields/FormSelect";
import { FormFile } from "./components/Fields/FormFile";

export const Root = {
    Form: FormContainer,
    Optional: FormOptional,
    Step: FormStep,
    Flex: FormFlex,
    Input: FormInput,
    TextArea: FormTextArea,
    Checkbox: FormCheckBox,
    Select: FormSelect,
    File: FormFile,
}