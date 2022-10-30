import React, { useState, useEffect } from 'react'
import Layout from '../Hotels/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import ReactLoading from 'react-loading'
const host = process.env.NEXT_PUBLIC_APIAUTH

export default function EditTour () {
  const [tour, setTour] = useState({
    name: '',
    price: '',
    detail: '',
    avatar: '',
    description: '',
    information: ''
  })
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (router?.query?.id) {
      axios.get(`${host}/api/tours/${router?.query?.id}`)
        .then((response) => {
          setTour(response?.data?.tours)
          if (response?.data?.tours) {
            throw response
          }
        })
        .catch((error) => {
          toast.error(error)
        })
    }
  }, [router?.query?.id])

  const editTour = () => {
    setLoading(true)
    axios.put(`${host}/api/tours/${router?.query?.id}`, {
      ...tour
    })
      .then((response) => {
        toast.success(response?.data?.msg || '')
        router.push('/admin/tour')
      })
      .catch((error) => {
        toast.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const cancelPost = () => {
    router.push('/admin/tour')
  }

  return (
    <Layout breadcrumb='Chỉnh sửa Tour'>
      <div className='edithotel'>
        <p className='hotel__title'>Chỉnh sửa Tour</p>
        <p className='hotel__detail'>Tên Tour</p>
        <input
          className='input__name'
          value={tour?.name}
          placeholder='Nhập tên Tour'
          name='name'
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p className='hotel__detail'>Giá Tour</p>
        <input
          className='input__name'
          value={tour?.price}
          placeholder='Nhập giá tour'
          name='price'
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p className='hotel__detail'>Trích dẫn</p>
        <input
          className='input__name'
          value={tour?.detail}
          name='detail'
          placeholder='Nhập trích dẫn'
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p className='hotel__detail'>Nội dung</p>
        <textarea
          className='input__description'
          value={tour?.description}
          name='description'
          placeholder='Nhập nội dung'
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p className='hotel__detail'>Thông tin</p>
        <textarea
          className='input__description'
          value={tour?.information}
          name='information'
          placeholder='Nhập thông tin'
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p className='hotel__detail'>Hình ảnh</p>
        <input
          className='input__name'
          placeholder='Nhập link ảnh'
          name='avatar'
          value={tour.avatar}
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <button
          type='submit'
          form='nameform'
          value='Submit'
          className='btn__submit'
          disabled={loading}
          onClick={editTour}
        >
          {loading && <ReactLoading type='bars' color='#04AA6D' className='loading' />} Cập nhật
        </button>
        <button
          type='submit'
          form='nameform'
          value='Submit'
          className='btn--cancel'
          disabled={loading}
          onClick={cancelPost}
        >
          Thoát
        </button>
      </div>
    </Layout>
  )
}
