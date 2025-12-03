import React, { useEffect } from "react";
import { Form, Input, message, Tag } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export interface TermsCondition {
  _id?: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TermsConditionFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData) => void;
  initialData?: TermsCondition | null;
  loading?: boolean;
}

const TermsConditionForm: React.FC<TermsConditionFormProps> = ({
  visible,
  onSubmit,
  initialData,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData && visible) {
      form.setFieldsValue({
        title: initialData.title,
        content: initialData.content,
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form, visible]);

  const handleFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      await onSubmit(formData);
    } catch {
      message.error("Something went wrong while saving terms and conditions");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className="terms-condition-form"
    >
      <div style={{ marginBottom: 16, textAlign: "center" }}>
        <Tag
          icon={<FileTextOutlined />}
          color="orange"
          style={{ fontSize: "14px", padding: "8px 16px" }}
        >
          Terms & Conditions Information
        </Tag>
      </div>

      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter title" }]}
      >
        <Input placeholder="Enter title (e.g., Terms & Conditions, Terms of Service, User Agreement)" />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please enter content" }]}
      >
        <TextArea
          rows={12}
          placeholder="Enter detailed terms and conditions content including user responsibilities, prohibited activities, liability limitations, intellectual property, termination clauses, governing law, etc."
          showCount
          maxLength={10000}
        />
      </Form.Item>

      {/* Hidden submit button for modal */}
      <button
        type="submit"
        style={{ display: "none" }}
        className="terms-condition-form-submit-button"
      />
    </Form>
  );
};

export default TermsConditionForm;
