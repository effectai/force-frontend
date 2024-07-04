export const useAuth = () => {
	const { useAccountAssets } = useEffectClient();
	const { data: assets } = useAccountAssets();
	const config = useRuntimeConfig();

	const hasAccessNft: Ref<boolean | null | undefined> = useLocalStorage(
		"hasAccessNft",
		false,
	);

	watch(assets, () => {
		hasAccessNft.value = assets.value?.some(
			(asset) =>
				asset.template_id === config.public.EARLY_ALPHA_ACCESS_TEMPLATE_ID,
		);
	});

	return {
		hasAccessNft,
	};
};
