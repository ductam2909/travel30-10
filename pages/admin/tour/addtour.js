import React, { useState } from 'react'
import Layout from '../../../Components/Hotels/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import ReactLoading from 'react-loading'
const host = process.env.NEXT_PUBLIC_APIAUTH

export default function AddTour () {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [tour, setTour] = useState({
    name: '',
    price: '',
    detail: '',
    avatar: '',
    description: '',
    infomation: ''
  })

  const postTour = () => {
    setLoading(true)
    axios.post(`${host}/api/tours`, {
      ...tour
    })
      .then((response) => {
        toast.success(response?.data?.msg || '')
        router.push('/admin/tour')
      })
      .catch((error) => {
        error?.response?.data?.errors.forEach(item => {
          toast.error(item)
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Layout breadcrumb='Thêm Tour'>
      <div className='edithotel'>
        <div className='hotel__title'>Thêm mới Tour</div>
        <p className='hotel__detail'>Tên Tour</p>
        <input
          className='input__name'
          placeholder='Nhập tên tour'
          name='name'
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p className='hotel__detail'>Giá Tour</p>
        <input
          className='input__name'
          placeholder='Nhập giá tour'
          name='price'
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p className='hotel__detail'>Trích dẫn</p>
        <input
          className='input__name'
          name='detail'
          placeholder='Nhập trích dẫn'
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p className='hotel__detail'>Nội dung</p>
        <textarea
          className='input__description'
          name='description'
          placeholder='Nhập nội dung'
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p className='hotel__detail'>Thông tin</p>
        <textarea
          className='input__description'
          name='information'
          placeholder='Nhập thông tin tour'
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <p className='hotel__detail'>Hình ảnh</p>
        <input
          className='input__name'
          placeholder='Nhập link ảnh'
          name='avatar'
          type='text'
          onChange={event => setTour((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
        />
        <button
          type='submit'
          form='nameform'
          value='Submit'
          className='btn__submit'
          disabled={loading}
          onClick={postTour}
        >
          {loading && <ReactLoading type='bars' color='#04AA6D' className='loading' />} Thêm
        </button>
        <button
          type='submit'
          form='nameform'
          value='Submit'
          className='btn__cancel'
          onClick={() => { router.push('/admin/tour') }}
        >
          Thoát
        </button>
      </div>
    </Layout>
  )
}
