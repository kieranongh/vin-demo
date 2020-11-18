import { Component } from './component.interface'

export interface Lot {
  lotCode: string
	volume: number
	description: string
	tankCode: string
	productState: string
	ownerName: string
  components: Component[]
}
