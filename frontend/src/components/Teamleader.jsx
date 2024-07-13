import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import SidePanel from "./SidePanel"
import TheBody from "./TheBody"
import { useNavigate } from "react-router-dom"

import { fetchTasks } from "../service/service"


const Main = () => {
  const navigate = useNavigate()
  const [plans, setPlans] = useState([])
  const [refresh, setRefresh] = useState(0)
  const pageRefresh = () => {
    setRefresh(() => refresh + 1)
  }

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await fetchTasks();
        console.log(response);
        setPlans(response)
      } catch (error) {
        console.error(error);
      }
    }
    fetching()

  }, [refresh,plans])
  return (
    <>
      <Navbar />
      <div className="flex-grow bg-white flex">
        <SidePanel fn={comple} />
        <TheBody plans={plans}  pageRefresh={pageRefresh} />
      </div>

    </>
  )
}

export default Main