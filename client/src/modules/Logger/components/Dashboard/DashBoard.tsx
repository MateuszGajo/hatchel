import React, { useState } from "react";
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container, Tab, Tabs } from "@mui/material";

import { LoggerTabs } from "../../types";
import LoggerForm from "../Form/LoggerFormWrapper";
import LoggerList from "../List/LoggerListWrapper";

const DashBoard = () => {
  const [value, setValue] = useState(LoggerTabs.LOG);

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: LoggerTabs
  ) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabContext value={value}>
          <Tabs aria-label="logger tabs" onChange={handleChange} value={value}>
            <Tab label="Relevent logs" value={LoggerTabs.LOG} />
            <Tab label="Form" value={LoggerTabs.FORM} />
          </Tabs>
          <TabPanel value={LoggerTabs.FORM}>
            <LoggerForm />
          </TabPanel>
          <TabPanel value={LoggerTabs.LOG}>
            <LoggerList />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default DashBoard;
