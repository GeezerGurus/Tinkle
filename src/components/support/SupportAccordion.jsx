import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";

const accordionData = [
  {
    id: "panel1",
    summary: "My Balance Account Isn't Updating, What Should I Do?",
    details: [
      {
        title: "Verify Transactions",
        description:
          "Double-check the transactions you believe should have affected your balance. Ensure they are reflected in your transaction history.",
      },
      {
        title: "Pending Transactions",
        description:
          "Some transactions may be pending and not yet reflected in your available balance. Check if there are any pending transactions.",
      },
    ],
  },
  {
    id: "panel2",
    summary: "I Forgot My PIN, How Can I Reset It?",
    details: [
      {
        title: "Reset via App",
        description:
          "Open your banking app and follow the instructions to reset your PIN.",
      },
      {
        title: "Contact Support",
        description:
          "If you're unable to reset your PIN via the app, contact customer support for assistance.",
      },
    ],
  },
  {
    id: "panel3",
    summary: "How Do I Report a Lost or Stolen Card?",
    details: [
      {
        title: "Contact Support Immediately",
        description:
          "Call your bank's customer service to report the lost or stolen card.",
      },
      {
        title: "Freeze Your Account",
        description:
          "Use the banking app to freeze your account temporarily until the issue is resolved.",
      },
    ],
  },
];

const SupportAccordion = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordions = [];
  for (let i = 0; i < accordionData.length; i++) {
    const panel = accordionData[i];
    accordions.push(
      <Accordion
        key={panel.id}
        expanded={expanded === panel.id}
        onChange={handleChange(panel.id)}
        square={false}
        sx={{ borderRadius: "16px !important" }}
      >
        <AccordionSummary
          id={`${panel.id}-header`}
          aria-controls={`${panel.id}-content`}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>{panel.summary}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {panel.details.map((detail, index) => (
            <Typography key={index}>
              <b>{detail.title}</b>: {detail.description}
            </Typography>
          ))}
        </AccordionDetails>
      </Accordion>
    );
  }

  return <Stack gap={1}>{accordions}</Stack>;
};

export default SupportAccordion;
