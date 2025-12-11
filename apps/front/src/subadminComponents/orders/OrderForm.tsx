import React, { useEffect } from "react";
import { Modal, Form, Select } from "antd";

interface OrderFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any, id?: string) => void;
  initialData?: any | null;
}

const OrderForm: React.FC<OrderFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialData,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) form.setFieldsValue(initialData);
    else form.resetFields();
  }, [initialData, form]);

  return (
    <Modal
      title="Update Order Status"
      open={visible}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => onSubmit(values, initialData?._id))
          .catch(() => {});
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Order Status"
          name="status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select
            options={[
              { value: "pending", label: "Pending" },
              { value: "processing", label: "Processing" },
              { value: "completed", label: "Completed" },
              { value: "cancelled", label: "Cancelled" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OrderForm;
