import type { IPresentation } from "../../../common/Interfaces/PresentationInterface"

export const formatPresentationsByProduct = (presentations: IPresentation[]) => {
    return presentations.reduce((acc, p) => {
        acc[p.product] ??= []
        acc[p.product].push(p)
        return acc
    }, {} as { [key: string]: IPresentation[] })
}