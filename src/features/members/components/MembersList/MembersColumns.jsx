import clsx from 'clsx'
import {Link, useNavigate} from 'react-router-dom'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {toCurrency} from '@/utils/toCurrency'
import {ActionCell} from '@/components/elements/Table/Cell/ActionCell'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useMembersListQueryContext} from '@/features/members/stores/MembersListQueryProvider'
import {updateMemberStatus} from '../../api'

export const membersColumns = [
  {
    header: 'Account Number',
    accessorFn: (row) => row.accountNumber,
    id: 'accountNumber',
    cell: (info) => <span className='ps-4'>{info.getValue()}</span>,
  },
  {
    header: 'Account',
    accessorFn: (row) => row.accountName,
    id: 'accountName',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Package',
    accessorFn: (row) => row.accountPackage + ' - ' + toCurrency(row.accountPackageAmount),
    id: 'accountPackage',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Parent Account',
    accessorFn: (row) =>
      row.parentAccountNumber ? row.parentAccountNumber + '-' + row.parentAccountName : 'None',
    id: 'parentAccount',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Sponsor Account',
    accessorFn: (row) =>
      row.referrerAccountName ? row.referrerAccountNumber + '-' + row.referrerAccountName : 'None',
    id: 'referrer_account',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Active',
    accessorFn: (row) => row.accountStatus,
    id: 'accountStatus',
    cell: (info) => (
      <div
        className={clsx('badge fw-bolder', {
          'badge-light-success': info.getValue() == 'ACTIVE',
          'badge-light-warning': info.getValue() == 'DRAFT',
          'badge-light-danger': info.getValue() == 'DEACTIVATED',
        })}
      >
        {info.getValue()}
      </div>
    ),
  },
  {
    header: 'Has Access',
    accessorFn: (row) => row.userStatus,
    id: 'userStatus',
    cell: (info) => {
      return (
        <>
          {info.getValue() == 'True' ? (
            <CustomSVG
              path='/media/icons/actions/success.svg'
              className='svg-icon svg-icon-2 svg-icon-success'
            />
          ) : (
            <CustomSVG
              path='/media/icons/actions/error.svg'
              className='svg-icon svg-icon-2 svg-icon-danger'
            />
          )}
        </>
      )
    },
  },
  {
    header: 'Actions',
    accessorFn: (row) => row.accountId,
    id: 'memberAction',
    cell: (info) => {
      const navigate = useNavigate()
      const swal = withReactContent(Swal)
      const {refetch} = useMembersListQueryContext()

      const handleView = () => {
        navigate(`${info.row.original.accountId}`, {
          state: {accountId: info.row.original.accountId},
        })
      }
      const handleDisable = () => {
        swal
          .fire({
            title:
              info.row.original.userStatus == 'True'
                ? 'Disable Account Access?'
                : 'Enable User Access?',
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: 'btn btn-primary',
            cancelButtonColor: 'btn btn-danger',
            confirmButtonText: info.row.original.userStatus == 'True' ? 'Disable' : 'Enable',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              try {
                const response = await updateMemberStatus({
                  accountId: info.row.original.accountId,
                })
                swal.fire('Account Access Updated!', response.message, 'success')
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
          <ActionCell
            handleClick={handleView}
            className='btn btn-icon btn-icon-primary btn-light btn-sm border-0 me-2'
          >
            <CustomSVG path='/media/icons/general/magnifying-glass.svg' className='svg-icon-2' />
          </ActionCell>
          <ActionCell
            handleClick={handleDisable}
            className={clsx('btn btn-icon  btn-light  btn-sm border-0 mx-2', {
              'btn-icon-danger btn-text-danger': info.row.original.userStatus == 'True',
              'btn-icon-success btn-text-success': info.row.original.userStatus == 'False',
            })}
          >
            <CustomSVG
              path={
                info.row.original.userStatus == 'True'
                  ? '/media/icons/arrows/cross.svg'
                  : '/media/icons/arrows/check.svg'
              }
              className='svg-icon-1'
            />
          </ActionCell>
        </>
      )
    },
  },
]
