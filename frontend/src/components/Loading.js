import React from 'react'; 

function Loading({ element, loading}) {
  return (
    loading ? <h1 className='loading'>Loading...</h1> : element
  )
}

export default Loading;