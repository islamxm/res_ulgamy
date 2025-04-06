import { useEffect } from "react"
import { useLocation } from "react-router"
const useGoStartWhenRootChange = () => {
  const loc = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [loc])
}

export default useGoStartWhenRootChange