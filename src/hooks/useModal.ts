import { useState } from "react"

const useSwitcher = (initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(s => !s)

  return {
    isOpen,
    open,
    close,
    toggle
  }
}

export default useSwitcher