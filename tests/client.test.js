import AcrosureClient from '../src'

import { TEST_SECRET_KEY } from './const'

describe('AcrosureClient functions', () => {
  it('verify webhook signature', () => {
    const client = new AcrosureClient({
      token: TEST_SECRET_KEY
    })
    const isValid = client.verifySignature(
      '1b0a6f0c0986671819cd19c38e201719b0531e72dfba312ca121190ea662a97b',
      '{"data":"อโครชัว!"}'
    )
    expect(isValid).toBeTruthy()
  })
})
