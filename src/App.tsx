import { lazy, useEffect } from "react"
import { Routes, Route } from "react-router"
import { ConfigProvider as AntConfigProvider } from "antd"

import PageLayout from "@/ui/layouts/pageLayout"
import SandboxPage from "@/pages/_sanboxPage"
import useGoStartWhenRootChange from "@/hooks/useGoStartWhenRootChange"
import Duty_monthSchedulePage from "@/pages/duty_monthSchedulePage"
import useIdb from "./hooks/useIdb"

import {message} from 'antd'
import { useDispatch } from "./store/hooks"
import { updateMessageApi } from "./store/slices/mainSlice"

// PAGES
const MainPage = lazy(() => import("@/pages/mainPage"))
const DocsPage = lazy(() => import("@/pages/docsPage"))
const StaffPage = lazy(() => import("@/pages/staffPage"))
const DutyPage = lazy(() => import("@/pages/dutyPage"))
const SettingsPage = lazy(() => import("@/pages/settingsPage"))
const Duty_monthDistrPage = lazy(() => import("@/pages/duty_monthDistrPage"))
const Staff_PersonPage = lazy(() => import('@/pages/staff_PersonPage'))
const Staff_ConsumptionPage = lazy(() => import('@/pages/staff_ConsumptionPage'))

const App = () => {
  const [messageApi, messageHolder] = message.useMessage()
  const dispatch = useDispatch()
  useGoStartWhenRootChange()
  useIdb()

  useEffect(() => {
    messageApi && dispatch(updateMessageApi(messageApi))
  }, [messageApi]) 

  return (
    <AntConfigProvider
      theme={{
        token: undefined
      }}
    >
      {messageHolder}
      <PageLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/docs" element={<DocsPage />} />

          <Route path="/staff" element={<StaffPage />} />
          <Route path="/staff/:id" element={<Staff_PersonPage />} />
          <Route path="/staff/consumption" element={<Staff_ConsumptionPage />} />

          <Route path="/duty" element={<DutyPage />} />
          <Route path="/duty/month_distr" element={<Duty_monthDistrPage />} />
          <Route path="/duty/month_distr/:id" element={<Duty_monthDistrPage />} />
          <Route path="/duty/month_schedule" element={<Duty_monthSchedulePage />} />
          <Route path="/duty/month_schedule/:id" element={<Duty_monthSchedulePage />} />

          <Route path="/settings" element={<SettingsPage />} />

          <Route path="/_sb_" element={<SandboxPage />} />
        </Routes>
      </PageLayout>
    </AntConfigProvider>
  )
}

export default App
