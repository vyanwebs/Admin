import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData, id?: string) => void;
  initialData?: {
    _id?: string;
    name: string;
    price: number;
    description: string;
    image?: string;
  } | null;
  loading?: boolean;
}

const MaleHomeServiceForm: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        name: initialData.name,
        price: initialData.price,
        description: initialData.description,
      });

      if (initialData.image) {
        setFileList([
          {
            uid: "-1",
            name: "Current Image",
            status: "done",
            url: initialData.image,
          },
        ]);
      } else {
        setFileList([]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [initialData, open]);

  const handleFinish = (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price.toString());
    formData.append("description", values.description);
    formData.append("gender", "male"); // FIXED gender = male 🔥

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }

    onSubmit(formData, initialData?._id);
  };

  return (
    <Modal
      title={initialData ? "Edit Male Home Service" : "Add Male Home Service"}
      open={open}
      onCancel={() => {
        form.resetFields();
        setFileList([]);
        onClose();
      }}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
        >
          {initialData ? "Update" : "Add"}
        </Button>,
      ]}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Service Name"
          rules={[{ required: true, message: "Please enter service name" }]}
        >
          <Input size="large" placeholder="Enter service name" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber
            size="large"
            min={0}
            style={{ width: "100%" }}
            placeholder="Enter price"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea rows={3} size="large" placeholder="Enter description" />
        </Form.Item>

        <Form.Item label="Upload Image">
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={(info) => setFileList(info.fileList)}
            accept="image/*"
          >
            {fileList.length === 0 && (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 5 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MaleHomeServiceForm;
