import React, { useState, useEffect } from "react";
import { tokens } from "../../theme";
import { Typography, useTheme } from "@mui/material";
import { getIncomes } from "../../api/incomeApi";

const Records = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const data = await getIncomes();
        setIncomes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching incomes", error);
      }
    };

    fetchIncomes();
  }, []);

  return (
    <div>
      {loading ? (
        <Typography color={colors.greenAccent[500]} variant="h1">
          Loading...
        </Typography>
      ) : (
        <div>
          <Typography color={colors.greenAccent[500]} variant="h1">
            Records
          </Typography>
          <ul>
            {incomes.map((income) => (
              <li key={income._id}>
                <div>
                  <strong>Title:</strong> {income.title}
                </div>
                <div>
                  <strong>Amount:</strong> {income.amount}
                </div>
                <div>
                  <strong>Type:</strong> {income.type}
                </div>
                <div>
                  <strong>Date:</strong>{" "}
                  {new Date(income.date).toLocaleDateString()}
                </div>
                <div>
                  <strong>Category:</strong> {income.category}
                </div>
                <div>
                  <strong>Description:</strong> {income.description}
                </div>
                <div>
                  <strong>Created At:</strong>{" "}
                  {new Date(income.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Records;
