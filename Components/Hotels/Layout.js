import React, { useEffect } from 'react'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'

export default function Layout (props) {
  const cookies = new Cookies()
  const router = useRouter()
  const tokenAdmin = cookies.get('tokenAdmin')
  const logout = () => {
    cookies.remove('tokenAdmin')
    router.push('/login')
  }

  useEffect(() => {
    if (!tokenAdmin) {
      // router.push('/login')
    }
  }, [tokenAdmin])

  return (
    <div className='dashboard__container'>
      <div className='admin__sidebar'>
        <div className='sidebar__brand'>
          <p className='sidebar__brand--text'>Admin</p>
        </div>
        {/* <ul>
          <li className='admin__sidebar--item'>
            <Icon
              className='nav__item--icon'
              icon='ant-design:dashboard-twotone'
              inline
            />
            Trang chủ
          </li>
          <li className='admin__sidebar--item'>
            <Icon
              className='nav__item--icon'
              icon='tabler:brand-booking'
              inline
            />
            <Link href='/admin/tour'><a className='sidebar__link'>Tour</a></Link>
          </li>
          <li className='admin__sidebar--item nav__item--bottom'>
            <Icon
              className='nav__item--icon'
              icon='la:hotel'
              inline
            />
            <Link href='/admin/hotel'><a className='sidebar__link'>Khách sạn</a></Link>
          </li>
        </ul> */}
      </div>
      <div className='doashboard__main--container'>
        {/* <div className='dashboard__header'>
          <button className='dashboard__menu--btn' />
          <Link href='/dashboard'><a className='nav__link'>Trang chủ</a></Link>
          <Link href='/setting'><a className='nav__link'>cài đặt</a></Link>
          <span className='nav__link' onClick={logout}>Đăng xuất</span>
        </div> */}
        <div className='header__path'>Trang chủ / {props.breadcrumb} </div>
        {props.children}
      </div>
    </div>
  )
}
