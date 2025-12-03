import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Tag, Row, Col } from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export interface AboutSalon {
  _id?: string;
  title: string;
  description: string;
  image: string;
  addedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AboutSalonFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData, id?: string) => void;
  initialData?: AboutSalon | null;
  loading?: boolean;
}

const AboutSalonForm: React.FC<AboutSalonFormProps> = ({
  visible,
  onSubmit,
  initialData,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (initialData && visible) {
      form.setFieldsValue({
        title: initialData.title,
        description: initialData.description,
      });

      setFileList(
        initialData.image
          ? [
              {
                uid: "-1",
                name: "Existing Image",
                status: "done",
                url: initialData.image,
              },
            ]
          : []
      );
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [initialData, form, visible]);

  const handleFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      } else if (!initialData) {
        message.error("Please upload an image");
        return;
      }

      await onSubmit(formData, initialData?._id);
    } catch {
      message.error("Something went wrong while saving salon information");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className="about-salon-form"
    >
      {/* Info Tag */}
      <div style={{ marginBottom: 16, textAlign: "center" }}>
        <Tag
          icon={<InfoCircleOutlined />}
          color="blue"
          style={{ fontSize: "14px", padding: "8px 16px" }}
        >
          About Our Salon
        </Tag>
      </div>

      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input placeholder="Enter title (e.g., Our Story, About Us)" />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea
              rows={6}
              placeholder="Enter detailed description about your salon"
              showCount
              maxLength={2000}
            />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item
            label="Salon Image"
            rules={
              !initialData
                ? [{ required: true, message: "Please upload an image" }]
                : []
            }
            extra="Upload a high-quality image representing your salon"
          >
            <Upload
              listType="picture"
              maxCount={1}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>
                {initialData ? "Change Image" : "Select Image"}
              </Button>
            </Upload>
            {!initialData && (
              <div
                style={{ color: "#999", fontSize: "12px", marginTop: "4px" }}
              >
                Image is required for new salon information
              </div>
            )}
          </Form.Item>
        </Col>
      </Row>

      {/* Hidden submit button for modal */}
      <button
        type="submit"
        style={{ display: "none" }}
        className="about-salon-form-submit-button"
      />
    </Form>
  );
};

export default AboutSalonForm;
