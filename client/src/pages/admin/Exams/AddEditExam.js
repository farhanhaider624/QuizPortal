import React from 'react'
import PageTitle from '../../../components/PageTitle'
import { Col, Form, message, Row, Select, Table } from "antd";

const AddEditExam = () => {

  const onFinish = async (values) => {
    console.log('Received values of form:', values);
  }

  return (
    <div>
        <PageTitle title="Add Exam"/>
        <Form layout='vertical' onFinish={onFinish}>
          <Row gutter={[10,10]}> 
            {/* in antd gutter is the gap */}
            <Col span={8}>
              <Form.Item label="Exam Name" name="name">
                <input type="text" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Exam Duration" name="duration">
                <input type="number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Category" name="category">
              <select name="" id="">
                <option value="">Select Category</option>
                <option value="javascript">JavaScript</option>
                <option value="react">React</option>
                <option value="node">Node</option>
                <option value="mongodb">MongoDB</option>
              </select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Total Marks" name="totalMarks">
                <input type="number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Passing Marks" name="passingMarks">
                <input type="number" />
              </Form.Item>
            </Col>
          </Row>
          
          <div className="flex justify-end">
            <button className="primary-contained-btn" type="submit">Save</button>
          </div>
        </Form>
    </div>
  )
}

export default AddEditExam