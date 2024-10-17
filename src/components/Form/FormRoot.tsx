import { FormContainerForm } from "./components/Containers/FormContainerForm";
import { FormStep } from "./components/Containers/FormStep";
import { FormContainer } from "./components/Containers/FormContainer";
import { FormEditContainer } from "./components/Containers/FormEditContainer";
import { FormEditStep } from "./components/Containers/FormEditStep";
import { FormOptional } from "./components/Containers/FormOptional";

export const Root = {
    Form: FormContainerForm,
    EditForm: FormEditContainer,
    EditStep: FormEditStep,
    Step: FormStep,
    Optional: FormOptional,
    Container: FormContainer,
}