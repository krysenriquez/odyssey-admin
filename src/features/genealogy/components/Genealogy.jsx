import {useState, useMemo, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {
  GenealogyQueryProvider,
  useGenealogyQueryData,
  useGenealogyQueryLoading,
} from '../stores/GenealogyQueryProvider'
import {CustomCardOverlay} from '@/components/elements/Card'
import {GenealogyChart} from '@/components/elements/GenealogyChart'
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
      name: object.accountName,
      avatar: avatar,
    }
    jsonTree.push(parent)
    // End Parent Object
    // Start Recursive for Children of Parent
    fourthGenJSONRecursive(object.children, object)
    return jsonTree
  }

  const fourthGenJSONRecursive = (children, parentObject) => {
    // Check if Children object exists or has length
    var blankAvatar = defaultAvatar
    var addMember2
    var addMember1
    var childMember
    if (children && children.length > 0) {
      // Loop through children object
      children.forEach((child) => {
        // Start Condition for Avatar if it exists
        var avatar
        if (child.avatar) {
          avatar = child.avatar
        } else {
          avatar = blankAvatar
        }
        // End Condition for Avatar if it exists
        // Condition if Child order is 1st slot, and No Member on 2nd slot
        if (child.parentSide == 'LEFT' && children.length == 1) {
          childMember = {
            tags: [child.packageName],
            id: child.accountId,
            accountNumber: child.accountNumber,
            name: child.accountName,
            avatar: avatar,
            pid: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountName,
            parentSide: child.parentSide,
            count: parentObject.allLeftChildrenCount ? parentObject.allLeftChildrenCount : '',
          }
          addMember2 = {
            tags: ['blankMember'],
            id: 'blank_right_' + parentObject.accountId,
            name: 'Blank Member',
            avatar: blankAvatar,
            pid: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountName,
            parentSide: 'RIGHT',
            activationCode: '',
            referrer: '',
            firstName: '',
            lastName: '',
            count: parentObject.allRightChildrenCount ? parentObject.allRightChildrenCount : '',
          }
          jsonTree.push(childMember, addMember2)
        }
        // End Condition if Child order is 1st slot, and No Member on 2nd slot
        // Condition if Child order is 2nd slot, and No Member on 1st slot
        else if (child.parentSide == 'RIGHT' && children.length == 1) {
          addMember1 = {
            tags: ['blankMember'],
            id: 'blank_left_' + parentObject.accountId,
            name: 'Blank Member',
            avatar: blankAvatar,
            pid: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountName,
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
            name: child.accountName,
            avatar: avatar,
            pid: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountName,
            parentSide: child.parentSide,
            count: parentObject.allRightChildrenCount ? parentObject.allRightChildrenCount : '',
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
            name: child.accountName,
            avatar: avatar,
            pid: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountName,
            parentSide: child.parentSide,
            count:
              child.parentSide == 'LEFT'
                ? parentObject.allLeftChildrenCount
                : parentObject.allRightChildrenCount,
          }
          jsonTree.push(childMember)
        }
        // End Condition if there are 2 children
        fourthGenJSONRecursive(child.children, child)
      })
    } else if (children && children.length == 0) {
      addMember1 = {
        tags: ['blankMember'],
        id: 'blank_left_' + parentObject.accountId,
        name: 'Blank Member',
        avatar: blankAvatar,
        pid: parentObject.accountId,
        parentAccountNumber: parentObject.accountNumber,
        parentName: parentObject.accountName,
        parentSide: 'LEFT',
        activationCode: '',
        referrer: '',
        firstName: '',
        lastName: '',
        count: parentObject.allLeftChildrenCount ? parentObject.allLeftChildrenCount : '',
      }
      addMember2 = {
        tags: ['blankMember'],
        id: 'blank_right_' + parentObject.accountId,
        name: 'Blank Member',
        avatar: blankAvatar,
        pid: parentObject.accountId,
        parentAccountNumber: parentObject.accountNumber,
        parentName: parentObject.accountName,
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
    navigate(`/members/${node.id}`, {
      state: {accountId: node.id},
    })
  }

  useEffect(() => {
    if (genealogy.length > 0) setTree(fourthGenJSON(genealogy[0]))
  }, [genealogy])

  return (
    <>
      <CustomCardOverlay isLoading={isLoading}>
        {tree.length > 0 ? <GenealogyChart nodes={tree} handleClick={clickNode} /> : <></>}
      </CustomCardOverlay>
    </>
  )
}

export const Genealogy = () => {
  return (
    <>
      <GenealogyQueryProvider>
        <GenealogyPage />
      </GenealogyQueryProvider>
    </>
  )
}
