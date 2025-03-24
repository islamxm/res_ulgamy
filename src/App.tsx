import { Routes, Route } from "react-router"
import { ConfigProvider as AntConfigProvider } from "antd"
import { Provider } from "react-redux"

// PAGES
import MainPage from "@/pages/mainPage"
import PageLayout from "./ui/layouts/pageLayout"
import store from "@/store/store"
import DocsPage from "./pages/docsPage"
import StaffPage from "./pages/staffPage"
import DutyPage from "./pages/dutyPage"
import SettingsPage from "./pages/settingsPage"


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
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </PageLayout>
    </AntConfigProvider>
    </Provider>
  )
}

export default App
