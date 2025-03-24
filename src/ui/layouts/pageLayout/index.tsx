import { FC, PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import classes from './classes.module.scss'
import useHeaderSize from '@/hooks/useHeaderSize';
import Header from '@/ui/widgets/header';
import Sidebar from '@/ui/widgets/sidebar';
import { useSelector } from '@/store/hooks';
import { SIDEBAR_WIDTH } from '@/data/constants';

type Props = PropsWithChildren<{

}>

const PageLayout: FC<Props> = ({ children }) => {
  const headerRef = useRef<HTMLDivElement>(null)
  const { rect } = useHeaderSize(headerRef)
  const { isSidebarOpen } = useSelector(s => s.main)

  
  return (
    <div className={classes.wrapper}>
      {/* <Sidebar /> */}
      <div className={classes.header}><Header ref={headerRef} /></div>
      {
        rect && (
          <div className={classes.main}>
            <div style={{ width: isSidebarOpen ? SIDEBAR_WIDTH : 0 }} className={classes.sidebar}><Sidebar style={{ paddingTop: Number(rect?.height) + 15 }} /></div>
            <div className={classes.content} style={{ paddingTop: Number(rect?.height) + 15 }}>
              {children}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default PageLayout;