import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Select,
  message,
  Grid,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const categories = ["haircut", "haircoloring", "facial", "beard", "nail"];

interface Service {
  _id?: string;
  title: string;
  price: number | string;
  category: string;
  extra?: string;
  gender?: string;
  imageUrl?: string;
  estimatedTime?: number;
}

interface Props {
  visible: boolean;
  onSubmit: (formData: FormData, id?: string) => void;
  initialData?: Service | null;
  loading?: boolean;
}

const FemaleOurServiceForm: React.FC<Props> = ({
  visible,
  onSubmit,
  initialData,
  loading = false,
}) => {
  const screens = Grid.useBreakpoint();
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState<any[]>([]);

  useEffect(() => {
    if (initialData && visible) {
      form.setFieldsValue({
        title: initialData.title,
        price: initialData.price,
        category: initialData.category,
        extra: initialData.extra,
        estimatedTime: initialData.estimatedTime,
      });

      setImageFileList(
        initialData?.imageUrl
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
    } else if (!visible) {
      form.resetFields();
      setImageFileList([]);
    }
  }, [initialData, visible, form]);

  const handleFinish = async (values: any) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("serviceName", values.title);
      formData.append("price", values.price?.toString());
      formData.append("category", values.category);
      formData.append("extra", values.extra || "");
      formData.append("gender", "female");
      formData.append("estimatedTime", values.estimatedTime?.toString());

      if (imageFileList.length > 0 && imageFileList[0].originFileObj) {
        formData.append("imageUrl", imageFileList[0].originFileObj);
      }

      await onSubmit(formData, initialData?._id);
    } catch (err) {
      console.error(err);
      message.error("Something went wrong while saving the service");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        name="title"
        label="Service Title"
        rules={[{ required: true, message: "Please enter service title" }]}
      >
        <Input placeholder="Enter service title" />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please enter price" }]}
      >
        <InputNumber
          min={0}
          style={{ width: "100%" }}
          placeholder="Enter price"
        />
      </Form.Item>

      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: "Please select category" }]}
      >
        <Select placeholder="Select category">
          {categories.map((c) => (
            <Option value={c} key={c}>
              {c}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="extra" label="About">
        <TextArea rows={3} placeholder="Short description about the service" />
      </Form.Item>

      <Form.Item
        name="estimatedTime"
        label="Estimated Time (minutes)"
        rules={[{ required: true, message: "Please enter estimated time" }]}
      >
        <InputNumber min={1} style={{ width: "100%" }} placeholder="e.g., 30" />
      </Form.Item>

      <Form.Item label="Service Image">
        <Upload
          listType="picture"
          maxCount={1}
          fileList={imageFileList}
          onChange={({ fileList }) => setImageFileList(fileList)}
          beforeUpload={() => false}
          accept="image/*"
        >
          {/* Make upload button block on xs for better mobile touch target */}
          <Button icon={<UploadOutlined />} block={!!screens.xs}>
            {initialData ? "Change Image" : "Upload Image"}
          </Button>
        </Upload>
      </Form.Item>

      {/* Hidden submit button — parent Modal triggers it */}
      <button
        type="submit"
        style={{ display: "none" }}
        className="female-service-form-submit-button"
        aria-hidden
        disabled={loading}
      />
    </Form>
  );
};

export default FemaleOurServiceForm;
