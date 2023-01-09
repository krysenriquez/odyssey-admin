import {usePermissions} from '@/providers/PermissionsProviders'
import {useState, useMemo} from 'react'
import {useEffect} from 'react'
import {Navigate} from 'react-router-dom'

export default function RolePermissionRoute(props) {
  const {children, permissionName, permission} = props
  const {permissions} = usePermissions()
  const permissionsArray = useMemo(() => permissions, [permissions])
  const [canAccess, setCanAccess] = useState(true)

  useEffect(() => {
    if (permissionsArray) {
      const permissionManagement = permissionsArray.find(
        (permission) => permission.permissionName == permissionName
      )
      setCanAccess(permissionManagement[`${permission}`])
    }
  }, [permissionsArray, permissionName])

  if (canAccess) return <>{children}</>

  return <Navigate to='/dashboard' replace />
}
