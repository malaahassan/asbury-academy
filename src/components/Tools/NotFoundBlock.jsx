import React from 'react'

const NotFoundBlock = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 5,
        padding: "5em",
        marginTop: 50,
        marginLeft: "auto",
        marginRight: "auto",
        border: "1px solid rgb(221, 221, 221)",
        borderRadius: 5,
        width: "100%",
        boxSizing: "border-box"
      }}
    >
      <svg
        viewBox="0 0 24 24"
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 50, height: 50, fill: "rgb(59, 59, 59)" }}
      >
        <path d="M16.143 2l5.857 5.858v8.284l-5.857 5.858h-8.286l-5.857-5.858v-8.284l5.857-5.858h8.286zm.828-2h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-6.471 6h3l-1 8h-1l-1-8zm1.5 12.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
      </svg>
      <h1 style={{ fontSize: 18, fontWeight: 500, color: "rgb(59, 59, 59)" }}>
        No results found by this query.
      </h1>
    </div>


  )
}

export default NotFoundBlock