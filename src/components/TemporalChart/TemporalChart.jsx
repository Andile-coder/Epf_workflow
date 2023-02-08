import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "antd";

const TemporalChart = () => {
  const [expenses, setExpenses] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const fetchExpenses = () => {
    axios
      .get(`http://localhost:3001/expenditures/`, {})
      .then((response) => setExpenses(response.data))
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchSalaries = (id) => {
    axios
      .get(`http://localhost:3001/salaries/${id}`)
      .then((response) => setSalaries(response.data))
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchEmployees = (id) => {
    axios
      .get(`http://localhost:3001/employees/`, {})
      .then((response) => setEmployees(response.data))
      .catch((error) => {
        console.error(error);
      });
  };

  const data1 = salaries.map((sal) => ({
    name: sal.date_paid,
    salary: sal.amount,
    expenditure: expenses?.filter((elem) => elem.salary_id == sal.salary_id)[0]
      ?.amount,
  }));
  // const data = [
  //   { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  //   { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  // ];

  useEffect(() => {
    fetchEmployees();
    fetchExpenses();
  }, []);

  return (
    <div style={{ display: "flex", flexFlow: "row" }}>
      <div>
        employees
        <ul>
          {employees?.map((elem) => (
            <li>
              <Button
                onClick={() => {
                  fetchSalaries(elem.unique_id);
                }}
              >
                {elem.first_name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <LineChart
        width={600}
        height={600}
        data={data1}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="salary" stroke="#8884d8" />
        <Line type="monotone" dataKey="expenditure" stroke="#000" />
      </LineChart>
    </div>
  );
};

export default TemporalChart;
