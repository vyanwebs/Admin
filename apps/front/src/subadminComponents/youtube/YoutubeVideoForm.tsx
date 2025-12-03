import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Radio, Space } from "antd";
import { UploadOutlined, PlayCircleOutlined } from "@ant-design/icons";

export interface YoutubeVideo {
  _id?: string;
  title: string;
  videoUrl?: string;
  videoPath?: string;
  uploadedAt?: string;
  addedBy?: string;
}

interface YoutubeVideoFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData, id?: string) => void;
  initialData?: YoutubeVideo | null;
  loading?: boolean;
}

//const { useBreakpoint } = Grid;

const YoutubeVideoForm: React.FC<YoutubeVideoFormProps> = ({
  visible,
  onSubmit,
  initialData,
}) => {
  // const screens = useBreakpoint();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [inputType, setInputType] = useState<"youtube" | "upload">("youtube");

  useEffect(() => {
    if (visible) {
      if (initialData) {
        // Determine input type based on existing data
        const type = initialData.videoUrl ? "youtube" : "upload";
        setInputType(type);

        form.setFieldsValue({
          title: initialData.title,
          videoUrl: initialData.videoUrl || "",
        });

        // Set existing video file for edit mode
        if (initialData.videoPath) {
          setFileList([
            {
              uid: "-1",
              name: "Existing Video",
              status: "done",
              url: initialData.videoPath,
            },
          ]);
        } else {
          setFileList([]);
        }
      } else {
        // Reset form for new video
        form.resetFields();
        setFileList([]);
        setInputType("youtube");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, visible]);

  const handleFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);

      const isEditing = !!initialData;

      if (inputType === "youtube") {
        if (values.videoUrl && values.videoUrl.trim() !== "") {
          formData.append("videoUrl", values.videoUrl.trim());
        } else if (isEditing && values.videoUrl === "") {
          // If editing and URL is cleared, send empty string to clear it
          formData.append("videoUrl", "");
        }
        // clear any uploaded files
        if (fileList.length > 0) {
          setFileList([]);
        }
      } else if (inputType === "upload") {
        if (fileList.length > 0 && fileList[0].originFileObj) {
          formData.append("video", fileList[0].originFileObj);
        }
      }

      // Validation for new videos
      if (!isEditing) {
        const hasYouTubeUrl = values.videoUrl && values.videoUrl.trim() !== "";
        const hasVideoFile = fileList.length > 0 && !!fileList[0].originFileObj;

        if (!hasYouTubeUrl && !hasVideoFile) {
          message.error(
            "Please provide either a YouTube link or upload a video file"
          );
          return;
        }
      }

      await onSubmit(formData, initialData?._id);
    } catch (error) {
      console.error("Form submission error:", error);
      message.error("Something went wrong while saving the video");
    }
  };

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const handleInputTypeChange = (e: any) => {
    const newType = e.target.value;
    setInputType(newType);

    // Clear the other field when switching types
    if (newType === "youtube") {
      setFileList([]);
    } else {
      form.setFieldsValue({ videoUrl: "" });
    }
  };

  const isEditing = !!initialData;

  // Small helper styles to make form look good on mobile
  //const compactLabelCol = screens.xs ? undefined : { span: 24 };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className="youtube-video-form"
    >
      <Form.Item
        label="Video Title"
        name="title"
        rules={[{ required: true, message: "Please enter video title" }]}
      >
        <Input placeholder="Enter video title" />
      </Form.Item>

      <Form.Item label="Video Source">
        <Radio.Group
          value={inputType}
          onChange={handleInputTypeChange}
          style={{ marginBottom: 12 }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Radio value="youtube">
              <Space>
                <PlayCircleOutlined />
                YouTube Link
              </Space>
            </Radio>
            <Radio value="upload">
              <Space>
                <UploadOutlined />
                Upload Video File
              </Space>
            </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      {inputType === "youtube" && (
        <Form.Item
          label="YouTube URL"
          name="videoUrl"
          help={
            isEditing
              ? "Leave empty to remove existing YouTube URL"
              : "Enter YouTube video URL"
          }
        >
          <Input
            placeholder="Paste YouTube video URL (e.g., https://youtube.com/watch?v=...)"
            allowClear
          />
        </Form.Item>
      )}

      {inputType === "upload" && (
        <Form.Item
          label="Upload Video File"
          help={
            isEditing
              ? "Upload a new file to replace existing video"
              : "Upload a video file"
          }
        >
          <Upload
            listType="text"
            maxCount={1}
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false}
            accept="video/*"
            onRemove={() => {
              setFileList([]);
              return true;
            }}
          >
            <Button icon={<UploadOutlined />}>
              {isEditing ? "Replace Video File" : "Select Video File"}
            </Button>
          </Upload>
          <div style={{ color: "#999", fontSize: 12, marginTop: 6 }}>
            Supported formats: MP4, MOV, AVI, MKV
          </div>
        </Form.Item>
      )}

      {/* Hidden submit button that modal triggers */}
      <button
        type="submit"
        style={{ display: "none" }}
        className="youtube-video-form-submit-button"
      />
    </Form>
  );
};

export default YoutubeVideoForm;
