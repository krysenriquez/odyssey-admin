import {useMemo, useEffect, useState} from 'react'

export const Filter = (props) => {
  const {table} = props
  const toFilterColumns = ['status']
  const filters = []
  const [filterObjects, setFilterObjects] = useState([])

  useEffect(() => {
    table.getHeaderGroups().map((headerGroup) => {
      headerGroup.headers.map((header) => {
        if (toFilterColumns.includes(header.id)) {
          filters.push(header.column)
        }
      })
    })
  }, [table])

  useEffect(() => {
    filters.map((filter) => {
      setFilterObjects((prevState) => {
        return [
          ...prevState,
          {
            column: filter.columnDef.header,
            columnFilters: Array.from(filter.getFacetedUniqueValues().keys()).sort(),
          },
        ]
      })
      // filterObjects.push({
      //   column: filter.columnDef.header,
      //   columnFilters: Array.from(filter.getFacetedUniqueValues().keys()).sort(),
      // })
    })
  }, [filters])

  useEffect(() => {
    console.log(filterObjects)
  }, [filterObjects])

  return (
    <>
      <button
        type='button'
        className='btn btn-light-primary me-3'
        data-menu-trigger='click'
        data-menu-placement='bottom-end'
      >
        <span className='svg-icon svg-icon-2'>
          <svg
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z'
              fill='currentColor'
            />
          </svg>
        </span>
        Filter
      </button>
      <div
        className='menu menu-sub menu-sub-dropdown w-300px w-md-325px'
        data-menu='true'
        style={{}}
      >
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bold'>Filter Options</div>
        </div>
        <div className='separator border-gray-200' />
        {filterObjects ? (
          filterObjects.map((filterObject) => {
            console.log(filterObject.column)
            return (
              <div className='px-7 py-5' data-subscription-table-filter='form'>
                <div className='mb-10' data-select2-id='select2-data-143-zv4x'>
                  <label className='form-label fs-6 fw-semibold'>Month:</label>
                  <select className='form-select form-select-solid fw-bold select2-hidden-accessible'>
                    <option data-select2-id='select2-data-9-j6au' />
                    <option value='jan' data-select2-id='select2-data-151-mjuw'>
                      January
                    </option>
                    <option value='feb' data-select2-id='select2-data-152-78tu'>
                      February
                    </option>
                    <option value='mar' data-select2-id='select2-data-153-54hz'>
                      March
                    </option>
                    <option value='apr' data-select2-id='select2-data-154-rss5'>
                      April
                    </option>
                    <option value='may' data-select2-id='select2-data-155-ohj5'>
                      May
                    </option>
                    <option value='jun' data-select2-id='select2-data-156-w0ww'>
                      June
                    </option>
                    <option value='jul' data-select2-id='select2-data-157-wf3z'>
                      July
                    </option>
                    <option value='aug' data-select2-id='select2-data-158-zciw'>
                      August
                    </option>
                    <option value='sep' data-select2-id='select2-data-159-pq2v'>
                      September
                    </option>
                    <option value='oct' data-select2-id='select2-data-160-vvgl'>
                      October
                    </option>
                    <option value='nov' data-select2-id='select2-data-161-junv'>
                      November
                    </option>
                    <option value='dec' data-select2-id='select2-data-162-2reo'>
                      December
                    </option>
                  </select>
                </div>
                <div className='d-flex justify-content-end'>
                  <button
                    type='reset'
                    className='btn btn-light btn-active-light-primary fw-semibold me-2 px-6'
                    data-menu-dismiss='true'
                    data-subscription-table-filter='reset'
                  >
                    Reset
                  </button>
                  <button
                    type='submit'
                    className='btn btn-primary fw-semibold px-6'
                    data-menu-dismiss='true'
                    data-subscription-table-filter='filter'
                  >
                    Apply
                  </button>
                </div>
              </div>
            )
          })
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
