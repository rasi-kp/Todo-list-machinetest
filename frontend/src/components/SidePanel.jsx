import React, { useState } from 'react';
import {
  Card, Typography, List, ListItem, ListItemPrefix, CardBody,
} from "@material-tailwind/react";
import { ClipboardDocumentCheckIcon, PlusCircleIcon, QueueListIcon } from "@heroicons/react/24/solid";
import AddProject from './Addproject';

const SidePanel = () => {
  const [addModal, setAddModal] = useState(false);

  const clickAddPlan = () => {
    setAddModal(true);
  };

  const closeAddPlan = () => {
    setAddModal(false);
  };

  return (
    <>
      <Card className="h-[calc(100vh-4rem)] w-full p-4 shadow-xl shadow-blue-gray-900/5 border-r-2 bg-gray-300 sm:max-w-[14rem] md:max-w-[14rem] lg:max-w-[16rem] xl:max-w-[18rem] flex flex-col">
        <List>
          <ListItem className="mb-2" onClick={clickAddPlan}>
            <ListItemPrefix>
              <PlusCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Add New Project
          </ListItem>
          <hr className="my-2 border-gray-400" />
        </List>
      </Card>
      {addModal && <AddProject closeAddPlan={closeAddPlan} />}
    </>
  );
};

export default SidePanel;
