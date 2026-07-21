import { FormikForm } from "../features/Forms/formikForm/FormikForm";
import { ReactHookForm } from "../features/Forms/reactHookForm/ReactHookForm";

export const Forms = () => {
  return (
    <div className="forms">
      <FormikForm />
      <ReactHookForm />
    </div>
  );
};
