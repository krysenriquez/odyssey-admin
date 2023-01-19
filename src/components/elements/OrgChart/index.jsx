import React, {useState, useRef, useLayoutEffect} from 'react'
import {OrgChart} from 'd3-org-chart'
import {useEffect} from 'react'

export const OrganizationalChart = (props) => {
  const {nodes, handleClick} = props
  const divRef = useRef()
  let chart = null

  useLayoutEffect(() => {
    if (nodes && divRef.current) {
      if (!chart) {
        chart = new OrgChart()
      }
      chart
        .container(divRef.current)
        .data(nodes)
        .setActiveNodeCentered(true)
        .rootMargin(100)
        .expandLevel(5)
        .nodeWidth((d) => 200)
        .nodeHeight((d) => 120)
        .siblingsMargin((d) => 15)
        .onNodeClick((d, i, arr) => handleClick(nodes.find((node) => node.id == d)))
        .nodeContent(function (d, i, arr, state) {
          const imageDim = 80
          const lightCircleDim = 95
          const outsideCircleDim = 110
          return `
              <div class='org-component'>
                 <div class='node ${
                   d.data.tags
                 }' style="margin-left:${d.width / 2 - outsideCircleDim / 2}px;"></div>
                 <div class='light-circle' style="margin-left:${
                   d.width / 2 - lightCircleDim / 2
                 }px"></div>
                 <img src=" ${
                   d.data.avatar
                 }" class='node-image' style="margin-left:${d.width / 2 - imageDim / 2}px" />
                 <div class="node-card card" style="width:${d.width}px;">
                    <div class='node-title'>
                        ${d.data.name} 
                    </div>
                    <div class='node-subtitle'>
                    ${d.data.accountNumber ? d.data.accountNumber : ''} 
                    </div>
                 </div>
             </div>`
        })
        .render()
    }
  }, [nodes])

  return <div id='binary-tree' ref={divRef}></div>
}
