import React, { useEffect } from "react";
import { Form, Input, message, Tag, Row, Col } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export interface AboutUs {
  _id?: string;
  title: string;
  content: string;
  updatedAt?: string;
}

interface AboutUsFormProps {
  visible: boolean;
  onSubmit: (formData: FormData) => void;
  initialData?: AboutUs | null;
  loading?: boolean;
}

const AboutUsForm: React.FC<AboutUsFormProps> = ({
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
      formData.append("content", values.content || "");
      await onSubmit(formData);
    } catch {
      message.error("Something went wrong while saving About Us");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className="about-us-form"
    >
      <div style={{ marginBottom: 16, textAlign: "center" }}>
        <Tag
          icon={<InfoCircleOutlined />}
          color="blue"
          style={{ fontSize: "14px", padding: "8px 16px" }}
        >
          About Us Information
        </Tag>
      </div>

      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please enter content" }]}
          >
            <TextArea
              rows={10}
              placeholder="Enter content"
              showCount
              maxLength={5000}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Hidden submit button for modal */}
      <button
        type="submit"
        style={{ display: "none" }}
        className="about-us-form-submit-button"
      />
    </Form>
  );
};

export default AboutUsForm;
