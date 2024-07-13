import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import { updateTaskStatus } from "../service/service";

const TheBody = ({ plans }) => {

  var role = localStorage.getItem('role');

  const [proId, setProId] = useState("");
  const [status, setStatus] = useState('');

  const handleEditClick = (planId) => {
    setProId(planId);
    setStatus(plans.find(plan => plan._id === planId)?.status || '');
  };

  const submit=async()=>{
    try {
      const result=await updateTaskStatus(proId, status);
      console.log(result);

    } catch (error) {
      // Handle error scenario
      console.error('Error updating task status:', error);
    }

  }

  return (
    <>
      <div className="flex-col h-[calc(100vh-4rem)] overflow-y-auto ">
        <div className="m-7">{role=='user'?'All Tasks':'All Projects'}
          <hr className="border-black" />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {plans.map((plan) => {
            return (
              <Card
                key={plan._id}
                className="ml-7 sm:w-72 md:w-80 lg:w-80 xl:w-80 border border-slate-950 p-3 rounded-md"
              >
                <CardBody>
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {plan.projectId && plan.projectId.title || plan.title}
                    </Typography>
                    <div className="flex space-x-2">
                      {plan.status!=='completed' &&<FaEdit
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleEditClick(plan._id)}
                      />}
                    </div>
                  </div>
                  {/* Edit Box */}
                  {proId === plan._id && (
                    <div className="border border-gray-300 rounded p-2 mt-2">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full py-1 px-2 mb-2"
                      >
                        <option value="To-Do">To-Do</option>
                        <option value="progress">Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <div className="text-right">
                        <button
                          className="text-xs font-semibold px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          onClick={submit}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}
                  <Typography className="text-red-500 text-lg">
                    Task : {plan.title}
                  </Typography>
                  <div className="mt-4">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          {plan.status && <span
                            className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${plan.status === "To-Do"
                              ? "text-green-600 bg-green-200"
                              : plan.status === "progress"
                                ? "text-blue-600 bg-blue-200"
                                : "text-gray-600 bg-gray-200" // Default condition for "To-Do"
                              }`}>
                            {plan.status === "completed"
                              ? "Completed"
                              : plan.status === "progress"
                                ? "In Progress"
                                : "To-Do"} {/* Displaying "To-Do" for the third condition */}
                          </span>}

                          {plan.teamLeadId && 
                            <span
                            className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                            Asign To : {plan.teamLeadId.email}
                          </span>
                          }

                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block">
                            {plan.status === "To-Do" ? "0%" :
                              plan.status === "progress" ? "50%" :
                                plan.status === "completed" ? "100%" : ""}
                          </span>
                        </div>

                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                        <div
                          style={{
                            width:
                              plan.status === "To-Do" ? '0%' :
                                plan.status === "progress" ? '50%' :
                                  plan.status === "completed" ? '100%' : '0%'
                          }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>

                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TheBody;
