import React from 'react'

function PageTitle({title}) {    // title as props
  return (
    <div>
      <h1 className ="text-xl uppercase">{title}</h1>
    </div>
  )
}

export default PageTitle
