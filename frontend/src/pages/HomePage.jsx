import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import PropertyList from '../components/PropertyList'

const HomePage = () => {
  return (
    <>
        <Layout>
          HOME PAGE
          <PropertyList/>
        </Layout>
    </>
  )
}

export default HomePage