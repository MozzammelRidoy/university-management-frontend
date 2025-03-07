import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

const PHInput = ({ type, name, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input type={type} id={name} {...field} />
          </Form.Item>
        )}
      />
    </div>
  );
  //   return (
  //     <>
  //       {label ? label : null}
  //       <input type={type} id={name} {...register(name)} />
  //     </>
  //   );
};

export default PHInput;
