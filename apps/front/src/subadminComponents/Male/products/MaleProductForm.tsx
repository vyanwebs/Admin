import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

export interface Product {
  _id?: string;
  name: string;
  price: string;
  offer?: string;
  rating?: string;
  tag?: string;
  description?: string;
  reviews?: string;
  gender?: string;
  image: string;
  icons?: string[];
}

interface MaleProductFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData, id?: string) => void;
  initialData?: Product | null;
  loading?: boolean;
}

const MaleProductForm: React.FC<MaleProductFormProps> = ({
  visible,

  onSubmit,
  initialData,
}) => {
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState<any[]>([]);
  const [iconsFileList, setIconsFileList] = useState<any[]>([]);

  useEffect(() => {
    if (initialData && visible) {
      form.setFieldsValue({
        name: initialData.name,
        price: initialData.price,
        offer: initialData.offer,
        rating: initialData.rating,
        tag: initialData.tag,
        description: initialData.description,
        reviews: initialData.reviews,
      });

      setImageFileList(
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

      setIconsFileList(
        initialData.icons && initialData.icons.length > 0
          ? [
              {
                uid: "-2",
                name: "Existing Icon",
                status: "done",
                url: initialData.icons[0],
              },
            ]
          : []
      );
    } else {
      form.resetFields();
      setImageFileList([]);
      setIconsFileList([]);
    }
  }, [initialData, form, visible]);

  const handleFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price.toString());
      formData.append("offer", values.offer || "");
      formData.append("rating", values.rating || "");
      formData.append("tag", values.tag || "");
      formData.append("description", values.description || "");
      formData.append("reviews", values.reviews || "");
      formData.append("gender", "male");

      if (imageFileList.length > 0 && imageFileList[0].originFileObj) {
        formData.append("image", imageFileList[0].originFileObj);
      }

      if (iconsFileList.length > 0 && iconsFileList[0].originFileObj) {
        formData.append("icons", iconsFileList[0].originFileObj);
      }

      await onSubmit(formData, initialData?._id);
    } catch {
      message.error("Failed to save product");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className="male-product-form"
    >
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Enter product price"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item name="offer" label="Offer">
            <Input placeholder="Enter offer details" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item name="rating" label="Rating">
            <Input placeholder="Enter rating (e.g. 4.5)" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item name="tag" label="Tag">
            <Input placeholder="Product tag (e.g. new, hot)" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item name="reviews" label="Reviews">
            <Input placeholder="Enter review info" />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Enter product description" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            label="Main Image"
            rules={
              !initialData
                ? [{ required: true, message: "Please upload product image" }]
                : []
            }
          >
            <Upload
              listType="picture"
              maxCount={1}
              fileList={imageFileList}
              onChange={({ fileList }) => setImageFileList(fileList)}
              beforeUpload={() => false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>
                {initialData ? "Change Main Image" : "Upload Main Image"}
              </Button>
            </Upload>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item label="Icon">
            <Upload
              listType="picture"
              maxCount={1}
              fileList={iconsFileList}
              onChange={({ fileList }) => setIconsFileList(fileList)}
              beforeUpload={() => false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>
                {initialData ? "Change Icon" : "Upload Icon"}
              </Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      {/* Hidden submit button triggered by parent modal */}
      <button type="submit" style={{ display: "none" }} />
    </Form>
  );
};

export default MaleProductForm;
