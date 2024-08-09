import { FormContainerForm } from "./components/Containers/FormContainerForm";
import { FormStep } from "./components/Containers/FormStep";
import { FormContainer } from "./components/Containers/FormContainer";
import { FormEditContainer } from "./components/Containers/FormEditContainer";
import { FormEditStep } from "./components/Containers/FormEditStep";
import { FormMultipleInputs } from "./components/Fields/FormMultipleInputs";

export const Root = {
    Form: FormContainerForm,
    EditForm: FormEditContainer,
    EditStep: FormEditStep,
    Step: FormStep,
    Container: FormContainer,
    MultipleInput: FormMultipleInputs,
}