import { useMemo } from 'react'
import { useTheme } from '@emotion/react'

/**
 * <PRE>
 * 1. Name : useClasses
 * 2. Comment   : 사용자정의 클래스 스타일생성
 * 3. Author    : JSH
 * <PRE>
 */
export const useClasses = (stylesElement: any) => {
	const theme = useTheme()

	return useMemo(() => {
		const rawClasses = typeof stylesElement === 'function' ? stylesElement(theme) : stylesElement
		let prepared: any = {}

		for (let [key, value] of Object.entries(rawClasses)) {
			prepared[key] = value
		}

		return prepared
	}, [stylesElement, theme])
}

export default useClasses
