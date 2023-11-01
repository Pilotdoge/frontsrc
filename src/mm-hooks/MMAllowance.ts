import { useMemo } from 'react'

import { useTokenContract } from '../mm-hooks/useContract'
import { useSingleCallResult } from '../state/multicall/hooks'

export function useMMTokenAllowance(token?: string, owner?: string, spender?: string): [string | undefined, string | undefined] {
  const contract = useTokenContract(token, false)

  const inputs = useMemo(() => [owner, spender], [owner, spender])
  const allowance = useSingleCallResult(contract, 'allowance', inputs).result
  const symbol = useSingleCallResult(contract, 'symbol', []).result
  return useMemo(() => ([token && allowance ? allowance.toString() : undefined, token && symbol ? symbol.toString() : undefined]), [
    token,
    allowance,
    symbol
  ])
}