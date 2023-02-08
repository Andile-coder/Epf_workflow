import React, { useState } from "react";
import { Button, Form, Input, message, Upload } from "antd";
import * as XLSX from "xlsx";
import axios from "axios";
import { DatePicker, Space } from "antd";
import { useNavigate } from "react-router-dom";
const CreateEmployee = () => {
  const [data, setData] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();
  const onChange = (date, dateString) => {
    console.log(dateString);
  };
  const onFinish = (values) => {
    axios
      .post("http://localhost:3001/", {
        title: "file",
        body: {
          employee: values,
          data: data,
        },
      })
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(setTimeout(navigate("/charts"), 9000));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      setData(XLSX.utils.sheet_to_json(worksheet));
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="First name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          name="dob"
          rules={[
            {
              required: true,
              message: "Please input your Date of Birth!",
            },
          ]}
        >
          <DatePicker onChange={onChange} />
        </Form.Item>

        <Form.Item
          name="file"
          label="Upload Spreadsheet"
          rules={[
            {
              required: true,
              message: "Please Upload Spreadsheet!",
            },
          ]}
        >
          <Input type="file" onChange={handleFileUpload} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateEmployee;
