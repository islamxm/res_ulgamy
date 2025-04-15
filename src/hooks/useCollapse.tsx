import { CSSProperties, useEffect, useRef, useState } from "react"

const useCollapse = (initValue?: boolean) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(initValue)
  const [bodyStyle, setBodyStyle] = useState<CSSProperties>({height: 0})
  const [arrowStyle, setArrowStyle] = useState<CSSProperties>({transform: 'rotate(0)'})


  useEffect(() => {
    if(ref.current) {
      if(isOpen) {
        setBodyStyle({height: ref.current.scrollHeight})
        setArrowStyle({transform: 'rotate(180deg)'})
      } else {
        setBodyStyle({height: 0})
        setArrowStyle({transform: 'rotate(0)'})
      }
    }
  }, [ref, isOpen])


  const toggle = () => setIsOpen(s => !s)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return {
    ref,
    isOpen,
    bodyStyle,
    arrowStyle,
    toggle,
    open,
    close
  }

}

export default useCollapse