import { makeFormatToday } from '@utils/functions'

/**
 * <PRE>
 * 1. Name : compareDate
 * 2. Comment   : 날짜 비교 함수
 * 3. Author    : JSH
 * <PRE>
 */
export const compareDate = (date: string) => {
	const now = new Date(makeFormatToday().full)
	const endDate = new Date(date)
	return (
		now < endDate ||
		(now.getFullYear() === endDate.getFullYear() && now.getMonth() === endDate.getMonth() && now.getDate() === endDate.getDate())
	)
}
