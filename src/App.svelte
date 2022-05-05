<script lang="ts">
	import { onMount, afterUpdate } from "svelte";

	import vehicleService from "@Services/VehicleService";

	import Loading from "@Components/Loading.svelte";
	import FilterBar from "@Components/FilterBar.svelte";
	import SortBar from "@Components/SortBar.svelte";
	import ConnectStatus from "@Components/ConnectStatus.svelte";
	import OffHours from "@Components/OffHours.svelte";
	import VehicleItem from "@Components/VehicleItem.svelte";

	import type { Vehicle } from "@Types/vehicle.type";
	import type { SortType } from "@Types/sortType.type";
	import { SortType as SortTypeEnum } from "@Types/sortType.type";

	let vehicles: Map<string, Vehicle> = new Map();
	let offHours: boolean = false;
	let loading: boolean = true;
	let activeGroup: string = "";
	let sortByType: SortType;

	onMount(() => {
		vehicleService.connectWebSocket();

		vehicleService.subscribe((data) => {
			vehicles = data;
			sortVehiclesBy(sortByType);
		});

		vehicleService.offHoursSubscribe((data) => {
			offHours = data;
		});
	});

	afterUpdate(() => {
		if (vehicles.size || offHours) {
			loading = false;
		}
	});

	$: {
		sortVehiclesBy(sortByType);
	}

	function sortVehiclesBy(sortByType: SortType): void {
		switch (sortByType) {
			case SortTypeEnum.ASC:
				sortVehiclesAsc();
				break;
			case SortTypeEnum.DESC:
				sortVehiclesDesc();
				break;
		}
	}

	function sortVehiclesAsc(): void {
		vehicles = new Map([...vehicles].sort());
	}

	function sortVehiclesDesc(): void {
		vehicles = new Map(
			[...vehicles].sort((a, b) => String(b[0]).localeCompare(a[0]))
		);
	}
</script>

<main class="app-content">
	<ConnectStatus />

	<div class="header">
		<h1 class="header__title">Number of all vehicles : {vehicles.size}</h1>

		<button on:click={vehicleService.reconnect} class="btn-reconnect">
			test reconnect
		</button>
	</div>

	<div class="vehicles-panel">
		<FilterBar bind:activeGroup />
		<SortBar on:sortBy={(e) => (sortByType = e.detail)} />
	</div>

	{#if loading}
		<Loading />
	{/if}

	{#if offHours}
		<OffHours />
	{/if}

	<div class="vehicles">
		{#each [...vehicles.values()] as vehicle (vehicle.id)}
			{#if !activeGroup || vehicle.group === activeGroup}
				<div class="vehicles__col">
					<VehicleItem {vehicle} />
				</div>
			{/if}
		{/each}
	</div>
</main>

<style>
	* {
		box-sizing: border-box;
	}

	.app-content {
		padding: 1em;
		margin: 0 auto;
		max-width: 1400px;
	}

	.header {
		margin: 0 0 40px;
	}

	.header__title {
		margin: 0 0 15px;
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 3.5em;
		font-weight: 100;
	}

	.btn-reconnect {
		display: inline-block;
		padding: 7px 20px;
		text-align: center;
		text-decoration: none;
		font-size: 16px;
		color: green;
		border: 0;
		border-radius: 100px;
		background-color: #c2fbd7;
		box-shadow: rgba(44, 187, 99, 0.2) 0 -25px 18px -14px inset,
			rgba(44, 187, 99, 0.15) 0 1px 2px, rgba(44, 187, 99, 0.15) 0 2px 4px,
			rgba(44, 187, 99, 0.15) 0 4px 8px,
			rgba(44, 187, 99, 0.15) 0 8px 16px,
			rgba(44, 187, 99, 0.15) 0 16px 32px;
		cursor: pointer;
		transition: all 250ms;
		-webkit-user-select: none;
		user-select: none;
		touch-action: manipulation;
	}

	.btn-reconnect:hover {
		box-shadow: rgba(44, 187, 99, 0.35) 0 -25px 18px -14px inset,
			rgba(44, 187, 99, 0.25) 0 1px 2px, rgba(44, 187, 99, 0.25) 0 2px 4px,
			rgba(44, 187, 99, 0.25) 0 4px 8px,
			rgba(44, 187, 99, 0.25) 0 8px 16px,
			rgba(44, 187, 99, 0.25) 0 16px 32px;
	}

	.vehicles {
		margin: 0 -15px 50px;
	}

	.vehicles__col {
		padding: 0 15px;
		margin: 0 0 10px;
	}

	@media (min-width: 768px) {
		.vehicles-panel {
			display: flex;
			justify-content: space-between;
		}

		.vehicles {
			display: flex;
			flex-wrap: wrap;
		}

		.vehicles__col {
			flex: 0 0 50%;
		}
	}
</style>
