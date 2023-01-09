import OrgChart from '@balkangraph/orgchart.js'
import React, {Component, useEffect} from 'react'
import {useState} from 'react'
import {useRef} from 'react'

export const GenealogyChart = (props) => {
  const {nodes, handleClick} = props
  const divRef = useRef()
  const [chart, setChart] = useState(undefined)

  useEffect(() => {
    setChart(
      new OrgChart(divRef.current, {
        align: OrgChart.ORIENTATION,
        template: 'diva',
        enableSearch: false,
        scaleInitial: OrgChart.match.boundary,
        mouseScrool: OrgChart.action.ctrlZoom,
        nodeMouseClick: OrgChart.action.none,
        nodeBinding: {
          field_0: 'name',
          field_1: 'accountNumber',
          img_0: 'avatar',
        },
        linkBinding: {
          link_field_0: 'count',
        },
        editForm: {
          buttons: {
            edit: null,
            share: null,
            pdf: null,
            remove: null,
          },
          generateElementsFromFields: false,
          elements: [
            {type: 'textbox', label: 'Full Name', binding: 'name'},
            {type: 'textbox', label: 'Account Number', binding: 'accountNumber'},
          ],
        },
      })
    )
  }, [])

  const returnNodeObject = (nodeId) => {
    return chart.get(nodeId)
  }

  useEffect(() => {
    if (chart) {
      chart.load(nodes)
      chart.on('click', function (sender, args) {
        if (!args.node.tags.includes('blankMember')) {
          handleClick(returnNodeObject(args.node.id))
        }
        return false
      })
    }
  }, [nodes, chart])

  return <div id='binary-tree' ref={divRef}></div>
}
