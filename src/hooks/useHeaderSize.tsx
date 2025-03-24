import { createContext, FC, PropsWithChildren, Ref, useContext, useEffect, useLayoutEffect, useState } from "react"

type HeaderContextType = {rect: Pick<DOMRect, 'x' | 'y' | 'height' | 'width'>} | undefined
const HeaderContext = createContext<HeaderContextType>({rect: {x:0, y:0, width:0, height:0}})

export const HeaderProvider:FC<PropsWithChildren> = ({children}) => {
  const [value, setValue] = useState<HeaderContextType>()
  // const size = useHeaderSize()

  return (
    <HeaderContext.Provider value={value}>
      {children}
    </HeaderContext.Provider>
  )
}

const useHeaderSize = (ref:Ref<HTMLDivElement>) => {
  const [rect, setRect] = useState<DOMRect>()

  const getSize = (e?: UIEvent) => {
    if(ref && 'current' in ref) {
      setRect(ref.current?.getBoundingClientRect())
    }
  }

  useLayoutEffect(() => {
    getSize()
    window.addEventListener('resize', getSize)
    return () => {
      window.removeEventListener('resize', getSize)
    }
  }, [ref])

  return {
    rect
  }
}

// const useHeader = () => {

// }

export default useHeaderSize