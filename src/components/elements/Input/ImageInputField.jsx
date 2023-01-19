import {useField, useFormikContext} from 'formik'
import clsx from 'clsx'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {useState, useEffect, useRef} from 'react'

export default function ImageInputField(props) {
  const {setFieldValue} = useFormikContext()
  const {label, required, errorText, name, ...rest} = props
  const [field, meta] = useField(props)
  const inputRef = useRef()

  const {touched, error, value} = meta
  const isError = touched && error && true
  const isValid = touched && !!!error && value

  const [thumbnail, setThumbnail] = useState({})
  const [hasNoThumbnail, setHasNoThumbnail] = useState(true)
  const [defaultAvatar, setDefaultAvatar] = useState(undefined)

  const blankAvatar = toAbsoluteUrl('/media/avatars/blank.png')

  useEffect(() => {
    if (field.value) {
      setHasNoThumbnail(false)
      setThumbnail(field.value)
    }
  }, [field.value])

  const updateImage = (e) => {
    if (e.currentTarget.files[0]) {
      setThumbnail(URL.createObjectURL(e.currentTarget.files[0]))
      setHasNoThumbnail(false)
      setFieldValue(name, e.currentTarget.files[0])
    }
  }

  const removeImage = (inputRef) => {
    inputRef.current.value = null
    setFieldValue(name, '')
    setThumbnail('')
    setHasNoThumbnail(true)
  }

  function renderErrorMessage() {
    if (isError) {
      return error
    }
  }

  return (
    <>
      <div
        className={clsx('image-input image-input-outline', {
          'image-input-empty': hasNoThumbnail == true,
        })}
        data-image-input='true'
        style={{backgroundImage: `url(${blankAvatar})`}}
      >
        <div
          className='image-input-wrapper w-125px h-125px'
          style={{backgroundImage: `url(${thumbnail})`}}
        />
        <label
          className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
          data-image-input-action='change'
          data-bs-toggle='tooltip'
          data-bs-dismiss='click'
          title='Change avatar'
        >
          <i className='bi bi-pencil-fill fs-7' />
          <input
            type='file'
            name='avatar'
            accept='.png, .jpg, .jpeg'
            ref={inputRef}
            onChange={(e) => updateImage(e)}
          />
          <input type='hidden' {...field} />
        </label>
        <span
          className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
          data-image-input-action='cancel'
          data-bs-toggle='tooltip'
          data-bs-dismiss='click'
          title='Cancel avatar'
          onClick={() => removeImage()}
        >
          <i className='bi bi-x fs-2' />
        </span>
        <span
          className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
          data-image-input-action='remove'
          data-bs-toggle='tooltip'
          data-bs-dismiss='click'
          title='Remove avatar'
          onClick={() => removeImage(inputRef)}
        >
          <i className='bi bi-x fs-2' />
        </span>
      </div>
    </>
  )
}
