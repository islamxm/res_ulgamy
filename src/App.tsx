import { lazy } from "react"
import { Routes, Route } from "react-router"
import { ConfigProvider as AntConfigProvider } from "antd"
import { Provider } from "react-redux"

import PageLayout from "@/ui/layouts/pageLayout"
import store from "@/store/store"
import SandboxPage from "./pages/_sanboxPage"



import dutyBuilder from "./utils/dutyBuilder"
// import { DStoDJS } from "./data/schedule"


// PAGES
// import MainPage from "@/pages/mainPage"
const MainPage = lazy(() => import("@/pages/mainPage"))
const DocsPage = lazy(() => import("@/pages/docsPage"))
const StaffPage = lazy(() => import("@/pages/staffPage")) 
const DutyPage = lazy(() => import("@/pages/dutyPage"))
const SettingsPage = lazy(() => import("@/pages/settingsPage"))
const Duty_monthDistrPage = lazy(() => import("@/pages/duty_monthDistrPage"))


// console.log(dutyBuilder.filterSchedule(DStoDJS('01.03.2025')))

const App = () => {



  return (
    <Provider store={store}>
      <AntConfigProvider
        theme={{
          token: undefined
        }}
      >
        <PageLayout>
          <Routes>
            <Route path="/" element={<MainPage />} />

            <Route path="/docs" element={<DocsPage />} />

            <Route path="/staff" element={<StaffPage />} />

            <Route path="/duty" element={<DutyPage />} />
            <Route path="/duty/month_distr_page" element=
              {<Duty_monthDistrPage />} />

            <Route path="/settings" element={<SettingsPage />} />


            <Route path="/_sb_" element={<SandboxPage />} />
          </Routes>
        </PageLayout>
      </AntConfigProvider>
    </Provider>
  )
}

export default App
