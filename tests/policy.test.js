import AcrosureClient from '../src'
import PolicyManager from '../src/PolicyManager'

import { TEST_PUBLIC_TOKEN } from './const'

const TEST_POLICY_ID = process.env.TEST_POLICY_ID

describe('policy endpoints', () => {
  let policy

  it('create an instance of AcrosureClient', () => {
    const client = new AcrosureClient({
      token: TEST_PUBLIC_TOKEN
    })
    policy = client.policy
    expect(client).toBeInstanceOf(AcrosureClient)
    expect(policy).toBeInstanceOf(PolicyManager)
  })

  it('get policy detail', async () => {
    const policyDetail = await policy.get(TEST_POLICY_ID)
    expect(policyDetail).toBeInstanceOf(Object)
    expect(policyDetail.id).toBe(TEST_POLICY_ID)
  })

  it('list policies', async () => {
    const policies = await policy.list()
    expect(policies).toBeInstanceOf(Array)
  })
})
