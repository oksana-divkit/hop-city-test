<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import type { SortType } from "@Types/sortType.type";
	import { SortType as SortTypeEnum } from "@Types/sortType.type";

	const sortTypesList: Array<SortType> = [
		SortTypeEnum.ASC,
		SortTypeEnum.DESC,
	];
	let activeSortType: SortType;

	const dispatch = createEventDispatcher();

	function setActiveType(sortType: SortType) {
		activeSortType = sortType;
		dispatch("sortBy", sortType);
	}
</script>

<div class="sort-bar">
	{#each sortTypesList as sortType}
		<button
			type="button"
			on:click={() => setActiveType(sortType)}
			class="sort-bar__btn"
			class:selected={activeSortType === sortType}
		>
			sort {SortTypeEnum[sortType]}
			
			<img
				class="sort-bar__icon"
				src="/images/icon-sort-{SortTypeEnum[sortType]}.svg"
				role="presentation"
				alt=""
			/>
		</button>
	{/each}
</div>

<style>
	.sort-bar {
		margin: 0 0 15px;
	}
	
	.sort-bar__btn {
		cursor: pointer;
	}

	.sort-bar__btn.selected {
		color: #ff3e00;
	}

	.sort-bar__icon {
		vertical-align: middle;
		max-width: 20px;
		height: auto;
	}
</style>
