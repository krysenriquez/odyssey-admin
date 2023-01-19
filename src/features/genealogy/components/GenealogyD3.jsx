import {useState, useMemo, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {
  GenealogyQueryProvider,
  useGenealogyQueryData,
  useGenealogyQueryLoading,
} from '../stores/GenealogyQueryProvider'
import {CustomCardOverlay} from '@/components/elements/Card'
import {OrganizationalChart} from '@/components/elements/OrgChart'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'

const GenealogyPage = () => {
  const navigate = useNavigate()
  const response = useGenealogyQueryData()
  const isLoading = useGenealogyQueryLoading()
  const genealogy = useMemo(() => response, [response])
  const [tree, setTree] = useState([])
  const defaultAvatar = toAbsoluteUrl('/media/avatars/blank.png')
  var jsonTree = []

  const fourthGenJSON = (object) => {
    // Start Condition for Avatar if it exists
    var avatar
    var blankAvatar = defaultAvatar
    if (object.avatar) {
      avatar = object.avatar
    } else {
      avatar = blankAvatar
    }
    // End Condition for Avatar if it exists
    // Start Parent Object
    var parent = {
      tags: [object.packageName],
      id: object.accountId,
      accountNumber: object.accountNumber,
      name: object.accountFullName,
      avatar: avatar,
      packageName: object.packageName,
    }
    jsonTree.push(parent)
    // End Parent Object
    // Start Recursive for Children of Parent
    // fourthGenJSONRecursive(object.children, object)
    var addMember2
    var addMember1
    var childMember
    if (object.children && object.children.length > 0) {
      // Loop through children object
      object.children.forEach((child) => {
        // Condition if Child order is 1st slot, and No Member on 2nd slot
        if (child.parentSide == 'LEFT' && object.children.length == 1) {
          childMember = {
            tags: [child.packageName],
            id: child.accountId,
            accountNumber: child.accountNumber,
            name: child.accountFullName,
            avatar: avatar,
            packageName: child.packageName,
            parentId: object.accountId,
            parentAccountNumber: object.accountNumber,
            parentName: object.accountFullName,
            parentSide: child.parentSide,
            count: object.allLeftChildrenCount ? object.allLeftChildrenCount : '',
          }
          addMember2 = {
            tags: ['blankMember'],
            id: 'blank_right_' + object.accountId,
            name: 'Blank Member',
            avatar: blankAvatar,
            parentId: object.accountId,
            parentAccountNumber: object.accountNumber,
            parentName: object.accountFullName,
            parentSide: 'RIGHT',
            activationCode: '',
            referrer: '',
            firstName: '',
            lastName: '',
            count: object.allRightChildrenCount ? object.allRightChildrenCount : '',
          }
          jsonTree.push(childMember, addMember2)
        }
        // End Condition if Child order is 1st slot, and No Member on 2nd slot
        // Condition if Child order is 2nd slot, and No Member on 1st slot
        else if (child.parentSide == 'RIGHT' && object.children.length == 1) {
          addMember1 = {
            tags: ['blankMember'],
            id: 'blank_left_' + object.accountId,
            name: 'Blank Member',
            avatar: blankAvatar,
            parentId: object.accountId,
            parentAccountNumber: object.accountNumber,
            parentName: object.accountFullName,
            parentSide: 'LEFT',
            activationCode: '',
            referrer: '',
            firstName: '',
            lastName: '',
            count: object.allLeftChildrenCount ? object.allLeftChildrenCount : '',
          }
          childMember = {
            tags: [child.packageName],
            id: child.accountId,
            accountNumber: child.accountNumber,
            name: child.accountFullName,
            packageName: child.packageName,
            avatar: avatar,
            parentId: object.accountId,
            parentAccountNumber: object.accountNumber,
            parentName: object.accountFullName,
            parentSide: child.parentSide,
            count: object.allRightChildrenCount ? object.allRightChildrenCount : '',
          }
          jsonTree.push(addMember1, childMember)
        }
        // End Condition if Child order is 2nd slot, and No Member on 1st slot
        // Condition if there are 2 children
        else {
          childMember = {
            tags: [child.packageName],
            id: child.accountId,
            accountNumber: child.accountNumber,
            name: child.accountFullName,
            packageName: child.packageName,
            avatar: avatar,
            parentId: object.accountId,
            parentAccountNumber: object.accountNumber,
            parentName: object.accountFullName,
            parentSide: child.parentSide,
            path: [child.parentSide],
            count:
              child.parentSide == 'LEFT'
                ? object.allLeftChildrenCount
                : object.allRightChildrenCount,
          }
          jsonTree.push(childMember)
        }
        // End Condition if there are 2 children
        fourthGenJSONRecursiveWithSide(child.children, child)
      })
    } else if (object.children && object.children.length == 0) {
      addMember1 = {
        tags: ['blankMember'],
        id: 'blank_left_' + object.accountId,
        name: 'Blank Member',
        avatar: blankAvatar,
        parentId: object.accountId,
        parentAccountNumber: object.accountNumber,
        parentName: object.accountFullName,
        parentSide: 'LEFT',
        activationCode: '',
        referrer: '',
        firstName: '',
        lastName: '',
        count: object.allLeftChildrenCount ? object.allLeftChildrenCount : '',
      }
      addMember2 = {
        tags: ['blankMember'],
        id: 'blank_right_' + object.accountId,
        name: 'Blank Member',
        avatar: blankAvatar,
        parentId: object.accountId,
        parentAccountNumber: object.accountNumber,
        parentName: object.accountFullName,
        parentSide: 'RIGHT',
        activationCode: '',
        referrer: '',
        firstName: '',
        lastName: '',
        count: object.allRightChildrenCount ? object.allRightChildrenCount : '',
      }
      jsonTree.push(addMember1, addMember2)
    }
    return jsonTree
  }

  const fourthGenJSONRecursiveWithSide = (children, parentObject) => {
    var blankAvatar = defaultAvatar
    var addMember2
    var addMember1
    var childMember
    // Check if object has children or none
    if (children && children.length > 0) {
      // Loop through all the children
      children.forEach((child) => {
        var avatar
        if (child.avatar) {
          avatar = child.avatar
        } else {
          avatar = blankAvatar
        }
        // Condition if only Child and Child Side is Left
        if (child.parentSide == 'LEFT' && children.length == 1) {
          childMember = {
            tags: [child.packageName],
            id: child.accountId,
            accountNumber: child.accountNumber,
            name: child.accountFullName,
            packageName: child.packageName,
            avatar: avatar,
            parentId: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountFullName,
            parentSide: child.parentSide,
            count: parentObject.allLeftChildrenCount ? parentObject.allLeftChildrenCount : '',
          }
          addMember2 = {
            tags: ['blankMember'],
            id: 'blank_right' + parentObject.accountId,
            name: 'Blank Member',
            avatar: blankAvatar,
            parentId: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountFullName,
            parentSide: 'RIGHT',
            activationCode: '',
            referrer: '',
            firstName: '',
            lastName: '',
            count: parentObject.allRightChildrenCount ? parentObject.allRightChildrenCount : '',
          }
          jsonTree.push(childMember, addMember2)
        }
        // End Condition if only Child and Child Side is Left
        // Condition if only Child and Child Side is Right
        else if (child.parentSide == 'RIGHT' && children.length == 1) {
          addMember1 = {
            tags: ['blankMember'],
            id: 'blank_left' + parentObject.accountId,
            name: 'Blank Member',
            avatar: blankAvatar,
            parentId: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountFullName,
            parentSide: 'LEFT',
            activationCode: '',
            referrer: '',
            firstName: '',
            lastName: '',
            count: parentObject.allLeftChildrenCount ? parentObject.allLeftChildrenCount : '',
          }
          childMember = {
            tags: [child.packageName],
            id: child.accountId,
            accountNumber: child.accountNumber,
            name: child.accountFullName,
            packageName: child.packageName,
            avatar: avatar,
            parentId: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountFullName,
            parentSide: child.parentSide,
            count: parentObject.allRightChildrenCount ? parentObject.allRightChildrenCount : '',
          }
          jsonTree.push(addMember1, childMember)
        }
        // End Condition if only Child and Child Side is Right
        // Condition if there are 2 children
        else {
          childMember = {
            tags: [child.packageName],
            id: child.accountId,
            accountNumber: child.accountNumber,
            name: child.accountFullName,
            packageName: child.packageName,
            avatar: avatar,
            parentId: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountFullName,
            parentSide: child.parentSide,
            count:
              child.parentSide == 'LEFT'
                ? parentObject.allLeftChildrenCount
                : parentObject.allRightChildrenCount,
          }
          jsonTree.push(childMember)
        }
        // End Condition if there are 2 children
        fourthGenJSONRecursiveWithSide(child.children, child)
      })
    }
    // If object has no children
    else if (children && children.length == 0) {
      addMember1 = {
        tags: ['blankMember'],
        id: 'blank_left' + parentObject.accountId,
        name: 'Blank Member',
        avatar: blankAvatar,
        parentId: parentObject.accountId,
        parentAccountNumber: parentObject.accountNumber,
        parentName: parentObject.accountFullName,
        parentSide: 'LEFT',
        activationCode: '',
        referrer: '',
        firstName: '',
        lastName: '',
        count: parentObject.allLeftChildrenCount ? parentObject.allLeftChildrenCount : '',
      }
      addMember2 = {
        tags: ['blankMember'],
        id: 'blank_right' + parentObject.accountId,
        name: 'Blank Member',
        avatar: blankAvatar,
        parentId: parentObject.accountId,
        parentAccountNumber: parentObject.accountNumber,
        parentName: parentObject.accountFullName,
        parentSide: 'RIGHT',
        activationCode: '',
        referrer: '',
        firstName: '',
        lastName: '',
        count: parentObject.allRightChildrenCount ? parentObject.allRightChildrenCount : '',
      }

      jsonTree.push(addMember1, addMember2)
    }
  }

  const clickNode = (node) => {
    if (node.tags.includes('blankMember')) {
      return false
    } else {
      navigate(`/members/${node.id}`, {
        state: {accountId: node.id},
      })
    }
  }

  useEffect(() => {
    if (genealogy.length > 0) setTree(fourthGenJSON(genealogy[0]))
  }, [genealogy])

  return (
    <>
      <CustomCardOverlay isLoading={isLoading}>
        <div className='d-flex flex-wrap align-items-center gap-4 mb-4'>
          <span className='d-flex flex-center'>
            <span className='bullet bullet-dot bg-platinum h-20px w-20px me-2'></span>Platinum
          </span>
          <span className='d-flex flex-center'>
            <span className='bullet bullet-dot bg-gold h-20px w-20px me-2'></span>Gold
          </span>
          <span className='d-flex flex-center'>
            <span className='bullet bullet-dot bg-silver h-20px w-20px me-2'></span>Silver
          </span>
          <span className='d-flex flex-center'>
            <span className='bullet bullet-dot bg-starter h-20px w-20px me-2'></span>Starter
          </span>
        </div>
        <OrganizationalChart nodes={tree} handleClick={clickNode} />
      </CustomCardOverlay>
    </>
  )
}

export const GenealogyDeeTree = () => {
  return (
    <>
      <GenealogyQueryProvider>
        <GenealogyPage />
      </GenealogyQueryProvider>
    </>
  )
}
