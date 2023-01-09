export default function getRolePermission(props) {
  const {permissions, permissionName, permission} = props

  const permissionObject = permissions.find(
    (permission) => permission.permissionName == permissionName
  )

  return permissionObject[`${permission}`]
}
