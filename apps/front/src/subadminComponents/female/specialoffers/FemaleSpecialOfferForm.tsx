import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Upload, Button, DatePicker, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export interface SpecialOffer {
  _id?: string;
  title: string;
  discount: number;
  date: string;
  description: string;
  gender: string;
  imageUrl?: string;
}

interface FemaleSpecialOfferFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData, id?: string) => void;
  initialData?: SpecialOffer | null;
  loading?: boolean;
}

const FemaleSpecialOfferForm: React.FC<FemaleSpecialOfferFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialData,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (initialData && visible) {
      form.setFieldsValue({
        title: initialData.title,
        discount: Number(initialData.discount),
        date: dayjs(initialData.date),
        description: initialData.description,
      });

      setFileList(
        initialData.imageUrl
          ? [
              {
                uid: "-1",
                name: "Existing Image",
                status: "done",
                url: initialData.imageUrl,
              },
            ]
          : []
      );
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [initialData, form, visible]);

  const handleFinish = (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("discount", values.discount.toString());
    formData.append("date", values.date.format("YYYY-MM-DD"));
    formData.append("description", values.description);
    formData.append("gender", "female"); // Fixed gender

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }

    onSubmit(formData, initialData?._id);
  };

  return (
    <Modal
      title={initialData ? "Edit Female Offer" : "Add Female Offer"}
      open={visible}
      onCancel={() => {
        form.resetFields();
        setFileList([]);
        onCancel();
      }}
      footer={[
        <Button key="cancel" onClick={onCancel}>
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
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input placeholder="Enter offer title" />
        </Form.Item>

        <Form.Item
          label="Discount (%)"
          name="discount"
          rules={[
            { required: true, message: "Please enter discount" },
            { type: "number", min: 0, max: 100, message: "Discount must be between 0 and 100" },
          ]}
        >
          <InputNumber min={0} max={100} style={{ width: "100%" }} placeholder="Enter discount %" />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select date" }]}
        >
          <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" placeholder="Select date" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea rows={3} placeholder="Enter description" />
        </Form.Item>

        <Form.Item
          label="Offer Image"
          rules={!initialData ? [{ required: true, message: "Please upload an image" }] : []}
        >
          <Upload
            listType="picture"
            maxCount={1}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            beforeUpload={() => false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>{initialData ? "Change Image" : "Select Image"}</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FemaleSpecialOfferForm;
