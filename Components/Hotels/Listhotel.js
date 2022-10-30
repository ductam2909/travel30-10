import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from './Layout'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate'
import { Icon } from '@iconify/react'
import { confirmAlert } from 'react-confirm-alert'
const host = process.env.NEXT_PUBLIC_APIAUTH

export default function ListHotel () {
  const limit = 10
  const router = useRouter()
  const [hotel, setHotel] = useState({})
  const [page, setPage] = useState(0)
  const getHotel = () => {
    axios.get(
      `${host}/api/hotels/`,
      {
        params: {
          skip: page,
          limit
        }
      }
    ).then((response) => {
      setHotel({
        data: response.data.hotels,
        count: response.data.count
      })
    })
      .catch(() => {
        setHotel({
          data: [],
          count: 0
        })
      })
  }

  useEffect(() => {
    getHotel()
  }, [page])

  const deleteHotel = (id) => {
    confirmAlert({
      title: 'Xóa khách sạn',
      message: 'bạn muốn có muốn xóa một khách sạn ?',
      buttons: [
        {
          label: 'Có',
          onClick: () => {
            axios.delete(`${host}/api/hotels/${id}`)
              .then((response) => {
                toast.success(response?.data?.msg)
                getHotel()
              })
              .catch((error) => {
                toast.error(error)
              })
          }
        },
        {
          label: 'Không'
        }
      ]
    })
  }

  const editHotel = (id) => {
    router.push(`/admin/hotel/${id}`)
  }

  const handlePageClick = (event) => {
    setPage(event.selected)
  }

  const renderHotel = () => {
    return (
      (hotel?.data || []).map((hotel, index) => {
        return (
          <tr key={hotel._id}>
            <td className='hotel__table--col'>
              {index + 1}
            </td>
            <td className='hotel__table--col'>
              {hotel?.name || ''}
            </td>
            <td className='hotel__table--col'>
              {hotel?.detail || ''}
            </td>
            <td className='hotel__table--col'>
              <img src={hotel?.avatar || ''} className='hotel__avatar' alt='image hotel' />
            </td>
            <td className='hotel__table--col'>
              {hotel?.description || ''}
            </td>
            <td className='btn--action'>
              <Icon
                icon='akar-icons:edit'
                color='#3c0' className='btn--edit'
                onClick={() => editHotel(hotel?._id)}
              />
              <Icon
                icon='ant-design:delete-filled'
                color='red' className='btn--edit'
                onClick={() => deleteHotel(hotel._id)}
              />
            </td>
          </tr>
        )
      })
    )
  }

  return (
    <Layout breadcrumb='Khách sạn'>
      <div className='hotel__container'>
        <Icon
          className='hotel__btn--add'
          onClick={() => { router.push('/admin/hotel/addhotel') }}
          icon='carbon:add-filled'
          inline
        />
        <table className='hotel__table'>
          <tbody>
            <tr>
              <th>Stt</th>
              <th>Tên</th>
              <th>Trích dẫn</th>
              <th>Ảnh</th>
              <th>Nội dung</th>
              <th />
            </tr>
            {renderHotel()}
          </tbody>
        </table>
        {hotel.count > limit && (
          <ReactPaginate
            className='paginate--custom'
            breakLabel='...'
            nextLabel='>>'
            onPageChange={handlePageClick}
            pageRangeDisplayed={limit}
            pageCount={Math.ceil(hotel.count / limit)}
            previousLabel='<<'
            renderOnZeroPageCount={null}
          />
        )}
      </div>
    </Layout>
  )
}
