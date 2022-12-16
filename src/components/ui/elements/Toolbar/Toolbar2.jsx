/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React from 'react'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {DefaultTitle} from '../Header/page-title/DefaultTitle'

const Toolbar2 = () => {
  const {classes, config} = useLayout()
  const today = new Date()
  return (
    <div className='toolbar py-2' id='kt_toolbar'>
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex align-items-center')}
      >
        {config.pageTitle?.display && <DefaultTitle />}
        <div className='flex-grow-1 flex-shrink-0 me-5'></div>
        <div
          className={
            config.pageTitle?.display
              ? 'd-flex align-items-center flex-wrap'
              : 'd-flex flex-stack flex-grow-1 flex-wrap'
          }
        >
          <div className='d-flex align-items-center'>
            <div
              className='btn btn-sm btn-bg-light btn-color-gray-500 btn-active-color-primary me-2'
              title='Current Date'
            >
              <span className='fw-bolder' id='kt_dashboard_daterangepicker_date'>
                Today: {today.toLocaleString('default', {month: 'short'})} {today.getDate()}
                {', '}
                {today.getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Toolbar2}
