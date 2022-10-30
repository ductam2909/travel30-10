import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import ReactLoading from 'react-loading'
const host = process.env.NEXT_PUBLIC_APIAUTH

export default function EditHotel () {
  const [hotel, setHotel] = useState({
    name: '',
    detail: '',
    avatar: '',
    description: ''
  })
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (router?.query?.id) {
      axios.get(`${host}/api/hotels/${router?.query?.id}`)
        .then((response) => {
          setHotel(response?.data?.hotel)
          if (response?.data?.holel) {
            throw response
          }
        })
        .catch((error) => {
          toast.error(error)
        })
    }
  }, [router?.query?.id])

  const editHotel = () => {
    setLoading(true)
    axios.put(`${host}/api/hotels/${router?.query?.id}`, {
      ...hotel
    })
      .then((response) => {
        toast.success(response?.data?.msg || '')
        router.push('/admin/hotel')
      })
      .catch((error) => {
        toast.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const cancelPost = () => {
    router.push('/admin/hotel')
  }

  return (
    <Layout breadcrumb='Chỉnh sửa khách sạn'>
      <div className='edithotel'>
        <p className='hotel__title'>Chỉnh sửa khách sạn</p>
        <p className='hotel__detail'>Tên khách sạn</p>
        <input
          className='input__name'
          value={hotel.name}
          placeholder='Nhập tên khách sạn'
          name='name'
          type='text'
          onChange={event => setHotel((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p className='hotel__detail'>Trích dẫn</p>
        <input
          className='input__name'
          value={hotel.detail}
          name='detail'
          placeholder='Nhập trích dẫn'
          type='text'
          onChange={event => setHotel((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p className='hotel__detail'>Nội dung</p>
        <textarea
          className='input__description'
          value={hotel.description}
          name='description'
          placeholder='Nhập nội dung'
          type='text'
          onChange={event => setHotel((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p className='hotel__detail'>Hình ảnh</p>
        <input
          className='input__name'
          placeholder='Nhập link ảnh'
          name='avatar'
          value={hotel.avatar}
          type='text'
          onChange={event => setHotel((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <button
          type='submit'
          form='nameform'
          value='Submit'
          className='btn__submit'
          disabled={loading}
          onClick={editHotel}
        >
          {loading && <ReactLoading type='bars' color='#04AA6D' className='loading' />} Cập nhật
        </button>
        <button
          type='submit'
          form='nameform'
          value='Submit'
          className='btn__cancel'
          disabled={loading}
          onClick={cancelPost}
        >
          Thoát
        </button>
      </div>
    </Layout>
  )
}
