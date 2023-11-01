import { Contract } from '@ethersproject/contracts'

import { ERC20_abi } from './abis/ERC20_abi'
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/mm-multicall'
import { pilotDogAbi } from './abis/claimTokon_abi'
import { useActiveWeb3React} from './index'  
// import { ChainId } from 'mm-hooks/chainId'
import { useMemo } from 'react'
import { getContract } from 'mm-utils'




// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(address:string | undefined, withSignerIfPossible?: boolean): Contract | null{

  return useContract(address, ERC20_abi, withSignerIfPossible)
}

export function usePilotDogContract(address:string | undefined, withSignerIfPossible?: boolean): Contract | null{

  return useContract(address, pilotDogAbi, withSignerIfPossible)
}


export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false)
}
