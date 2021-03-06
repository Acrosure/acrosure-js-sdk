require('dotenv').config()
const express = require('express')
const AcrosureClient = require('@acrosure/js-sdk')
const { APP_DATA } = require('./data')
const app = express()
const port = 8000

const acrosureClient = new AcrosureClient({
  token: process.env.TEST_SECRET_TOKEN,
  apiURL: process.env.TEST_API_URL
})

app.get('/', (req, res) =>
  res.send('<a href="/test-sdk"><button>Test</button></a>')
)

app.get('/test-sdk', async (req, res) => {
  let applicationId = ''
  console.log('start')
  console.log('-------------------------------')
  let resp = await acrosureClient.application.create({
    product_id: APP_DATA.product_id,
    basic_data: APP_DATA.basic_data
  })
  console.log('create:', resp)
  console.log('-------------------------------')
  applicationId = resp.data.id
  resp = await acrosureClient.application.getPackages(applicationId)
  console.log('get-packages:', resp)
  console.log('-------------------------------')
  const packageCode = resp.data[0].package_code
  resp = await acrosureClient.application.selectPackage({
    application_id: applicationId,
    package_code: packageCode
  })
  console.log('select-package:', resp)
  console.log('-------------------------------')
  resp = await acrosureClient.application.update({
    application_id: applicationId,
    basic_data: APP_DATA.basic_data,
    package_options: APP_DATA.package_options,
    additional_data: APP_DATA.additional_data
  })
  console.log('update:', resp)
  console.log('-------------------------------')
  resp = await acrosureClient.application.confirm(applicationId)
  console.log('confirm:', resp)
  console.log('===============================')
  res.send(resp)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
