import React from 'react'
import Home from '@/views/home'
import Data from '@/views/data'
import User from '@/views/user'
import Login from '@/views/login'

export interface IRouter {
  path: string,
  component: React.FC
}

export const routes = [
  {
    path: '/',
    
    component: Home
  },
  {
    path: '/data',
    component: Data
  },
  {
    path: '/uer',
    component: User
  },
  {
    path: "/login",
    component: Login
  }
]