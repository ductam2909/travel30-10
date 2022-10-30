import React, { useState, useEffect } from 'react'
import Layout from '../Hotels/Layout'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Icon } from '@iconify/react'
import ReactPaginate from 'react-paginate'
import { confirmAlert } from 'react-confirm-alert'
import { toast } from 'react-toastify'
const host = process.env.NEXT_PUBLIC_APIAUTH
const limit = 10

export default function ListTour () {
  const router = useRouter()
  const [tour, setTour] = useState({})
  const [page, setPage] = useState(0)

  const getTour = () => {
    const params = {
      skip: page,
      limit
    }
    axios.get(
      `${host}/api/tours/`,
      { params }
    ).then((response) => {
      setTour({
        data: response?.data?.tours || [],
        count: response?.data?.count || 0
      })
    })
      .catch(() => {
        setTour({
          data: [],
          count: 0
        })
      })
  }

  useEffect(() => {
    getTour()
  }, [page])

  const editTour = (id) => {
    router.push(`/admin/tour/${id}`)
  }

  const handlePageClick = (event) => {
    setPage(event.selected)
  }

  const renderTour = () => {
    return (
      (tour?.data || []).map((tour, index) => {
        return (
          <tr key={tour._id}>
            <td className='tour__table--col'>
              {index + 1}
            </td>
            <td className='tour__table--col'>
              <p className='table__col--text'>{tour?.name || ''}</p>
            </td>
            <td className='tour__table--col'>
              <p className='table__col--text'>{tour?.detail || ''}</p>
            </td>
            <td className='tour__table--col'>
              <p className='table__col--text'>{tour?.description || ''}</p>
            </td>
            <td className='tour__table--col'>
              <img src={tour?.avatar || ''} className='tour__avatar' alt='image tour' />
            </td>
            <td className='tour__table--col'>
              <p className='table__col--text'>{tour?.information || ''}</p>
            </td>
            <td className='tour__table--col'>
              <p className='table__col--text'>{tour?.price || ''}</p>
            </td>
            <td className='btn--action'>
              <Icon
                icon='akar-icons:edit'
                color='#3c0' className='btn--edit'
                onClick={() => { editTour(tour?._id) }}
              />
              <Icon
                icon='ant-design:delete-filled'
                color='red' className='btn--edit'
                onClick={() => deleteTour(tour._id)}
              />
            </td>
          </tr>
        )
      })
    )
  }

  const deleteTour = (id) => {
    confirmAlert({
      title: 'Xóa tour',
      message: 'Bạn có chắc chắn muốn xóa tour này không?',
      buttons: [
        {
          label: 'Có',
          onClick: () => {
            axios.delete(`${host}/api/tours/${id}`)
              .then((response) => {
                toast.success(response?.data?.msg)
                getTour()
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

  return (
    <Layout breadcrumb='Tour'>
      <div className='hotel__container'>
        <Icon
          className='hotel__btn--add'
          icon='carbon:add-filled'
          onClick={() => { router.push('/admin/tour/addtour') }}
          inline
        />
        <table className='hotel__table'>
          <tbody>
            <tr>
              <th>Stt</th>
              <th>Tên</th>
              <th>Trích dẫn</th>
              <th>Nội dung</th>
              <th>Ảnh</th>
              <th>Thông tin</th>
              <th>Giá</th>
              <th />
            </tr>
            {renderTour()}
          </tbody>
        </table>
        {tour.count > limit && (
          <ReactPaginate
            className='paginate--custom'
            breakLabel='...'
            nextLabel='>>'
            onPageChange={handlePageClick}
            pageRangeDisplayed={limit}
            pageCount={Math.ceil(tour.count / limit)}
            previousLabel='<<'
            renderOnZeroPageCount={null}
          />
        )}
      </div>
    </Layout>
  )
}
