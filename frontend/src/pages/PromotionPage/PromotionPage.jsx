import PromotionList from '@/features/promotions/components/PromotionList/PromotionList'
export const PromotionsPage = ({ promotions }) => {
	return (
		<div>
			<PromotionList promotions={promotions} />
		</div>
	)
}
