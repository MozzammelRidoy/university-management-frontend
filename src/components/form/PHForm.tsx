import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFromConfig = {
  defaultValues?: Record<string, any>;
};
type TFromPops = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFromConfig;

const PHForm = ({ onSubmit, children, defaultValues }: TFromPops) => {
  const formConfig: TFromConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>;
    </FormProvider>
  );
};

export default PHForm;
