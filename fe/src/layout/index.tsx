import React, { useEffect, useState } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { routes, IRouter } from '@/router'
import NavBar from '@/components/NavBar';
import './index.less'

const Layout = () => {
  const location = useLocation()
  const { pathname } = location
  const needNav = ['/', '/data', '/user']
  const [showNav, setShowNav] = useState<boolean>(false)
  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname])
  return (
   <>
      <Switch>
        {
          routes.map((i: IRouter) => <Route exact path={i.path} key={i.path} ><i.component /></Route>)
        }
      </Switch>
     <NavBar showNav={showNav} />
   </>
  )
}

export default Layout