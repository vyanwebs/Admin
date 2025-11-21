// MaleHomeServiceForm.tsx
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export interface HomeService {
  _id?: string;
  name: string;
  price: number;
  description: string;
  gender: string;
  image?: string;
}

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData, id?: string) => void;
  initialData?: HomeService | null;
  loading?: boolean;
}

const MaleHomeServiceForm: React.FC<Props> = ({
  visible,
  
  onSubmit,
  initialData,

}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (initialData && visible) {
      form.setFieldsValue({
        name: initialData.name,
        price: initialData.price,
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
  }, [initialData, visible]);

  const handleFinish = (values: any) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price.toString());
      formData.append("description", values.description);
      formData.append("gender", "male");

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      onSubmit(formData, initialData?._id);
    } catch (err) {
      message.error("Something went wrong while saving the service.");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className="male-home-service-form"
    >
      <Form.Item
        label="Service Name"
        name="name"
        rules={[{ required: true, message: "Please enter service name" }]}
      >
        <Input placeholder="Enter service name" />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please enter price" }]}
      >
        <InputNumber min={0} style={{ width: "100%" }} placeholder="Enter price" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please enter description" }]}
      >
        <Input.TextArea rows={3} placeholder="Enter description" />
      </Form.Item>

      <Form.Item label="Service Image">
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
      </Form.Item>

      {/* Hidden submit button for modal OK */}
      <button
        type="submit"
        style={{ display: "none" }}
        className="male-home-service-form-submit-button"
      />
    </Form>
  );
};

export default MaleHomeServiceForm;
