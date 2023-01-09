import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {ActionCell} from '@/components/elements/Table/Cell/ActionCell'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useCodesListQueryContext} from '../../stores/CodesListQueryProvider'
import {updateCodeStatus} from '../../api'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import RolePermissionComponent from '@/utils/RolePermissionComponent'
export const codesColumn = [
  {
    header: 'Code',
    accessorFn: (row) => row.code,
    id: 'code',
    cell: (info) => <span className='ms-4'>{info.getValue()}</span>,
  },
  {
    header: 'Owner',
    accessorFn: (row) => (row.ownerName ? row.ownerAccountNumber + '-' + row.ownerName : 'None'),
    id: 'ownerName',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Package',
    accessorFn: (row) => row.packageName,
    id: 'packageName',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Type',
    accessorFn: (row) => row.codeType,
    id: 'codeType',
    cell: (info) => {
      const intl = useIntl()
      return intl.formatMessage({id: info.getValue()})
    },
  },
  {
    header: 'Owned',
    accessorFn: (row) => row.isOwned,
    id: 'isOwned',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Status',
    accessorFn: (row) => row.status,
    id: 'status',
    cell: (info) => {
      const intl = useIntl()
      return intl.formatMessage({id: info.getValue()})
    },
  },
  {
    header: 'Expiration',
    accessorFn: (row) => row.expiration,
    id: 'expiration',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Actions',
    accessorFn: (row) => row.accountId,
    id: 'codesAction',
    cell: (info) => {
      const swal = withReactContent(Swal)
      const {refetch} = useCodesListQueryContext()

      const handleDisable = () => {
        swal
          .fire({
            title: info.row.original.status == 'ACTIVE' ? 'Deactivate Code?' : 'Activate Code?',
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: 'btn btn-primary',
            cancelButtonColor: 'btn btn-danger',
            confirmButtonText: info.row.original.status == 'ACTIVE' ? 'Deactivate' : 'Activate',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              try {
                const response = await updateCodeStatus({
                  code: info.row.original.code,
                })
                swal.fire('Code Status Updated!', response.message, 'success')
                toast.success(response.message)
              } catch (ex) {
                toast.error(ex.message)
              } finally {
                refetch()
              }
            }
          })
      }

      return (
        <>
          {info.row.original.status == 'ACTIVE' || info.row.original.status == 'DEACTIVATED' ? (
            <RolePermissionComponent permissionName='Code Management' permission='canUpdate'>
              <ActionCell
                handleClick={handleDisable}
                className={clsx('btn btn-icon  btn-light  btn-sm border-0 mx-2', {
                  'btn-icon-danger btn-text-danger': info.row.original.status == 'ACTIVE',
                  'btn-icon-success btn-text-success': info.row.original.status == 'DEACTIVATED',
                })}
              >
                <CustomSVG
                  path={
                    info.row.original.status == 'ACTIVE'
                      ? '/media/icons/arrows/cross.svg'
                      : '/media/icons/arrows/check.svg'
                  }
                  className='svg-icon-1'
                />
              </ActionCell>
            </RolePermissionComponent>
          ) : (
            <></>
          )}
        </>
      )
    },
  },
]
