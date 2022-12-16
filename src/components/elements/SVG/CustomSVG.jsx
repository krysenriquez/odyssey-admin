import React from 'react'
import SVG from 'react-inlinesvg'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'

const CustomSVG = ({className = '', path, svgClassName = 'mh-50px'}) => {
  return (
    <span className={`svg-icon ${className}`}>
      <SVG src={toAbsoluteUrl(path)} className={svgClassName} />
    </span>
  )
}

export {CustomSVG}
