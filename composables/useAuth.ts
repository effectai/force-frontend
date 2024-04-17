export const useAuth = () => {
	const { useAccountAssets } = useEffectClient();
	const { data: assets } = useAccountAssets();
	const config = useRuntimeConfig();
	const hasAccessNft = useLocalStorage("hasAccessNft", null);

	watch(assets, () => {
		hasAccessNft.value = assets.value?.some(
			(asset) =>
				asset.template_id === config.public.REQUIRE_ACCESS_NFT_TEMPLATE_ID,
		);
	});

	return {
		hasAccessNft,
	};
};
