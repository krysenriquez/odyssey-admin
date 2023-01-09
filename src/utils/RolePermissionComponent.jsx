import {usePermissions} from '@/providers/PermissionsProviders'
import {useState, useMemo} from 'react'
import {useEffect} from 'react'
import {Navigate} from 'react-router-dom'

export default function RolePermissionComponent(props) {
  const {children, permissionName, permission} = props
  const {permissions} = usePermissions()
  const permissionsArray = useMemo(() => permissions, [permissions])
  const [canView, setCanView] = useState(false)

  useEffect(() => {
    if (permissionsArray) {
      const permissionManagement = permissionsArray.find(
        (permission) => permission.permissionName == permissionName
      )
      setCanView(permissionManagement[`${permission}`])
    }
  }, [permissionsArray, permissionName])

  if (canView) return <>{children}</>

  return <></>
}
