import React from 'react'
import SignUp from './components/SignUp'

const Home = () => {
  return (
    <main className="page">
      <section className="page-intro">
        <h1 className="intro-text">Schedule & keep track of your meetings in minutes.</h1>
      </section>
      <section className="page-login">
        <SignUp />
      </section>
    </main>
  )
}

export default Home
