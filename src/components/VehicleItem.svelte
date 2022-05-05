<script lang="ts">
	import Battery from "@Components/Battery.svelte";

	import type { Vehicle } from "@Types/vehicle.type";

	export let vehicle: Vehicle;
</script>

<div class="vehicle-item">
	<div class="vehicle-item__header">
		<h4 class="vehicle-item__title">{vehicle.id}</h4>
		<p class="vehicle-item__group">({vehicle.group.toUpperCase()})</p>

		<p class="vehicle-item__location">
			<a
				href="https://www.google.com/maps/@{vehicle.position
					.lat},{vehicle.position.lon},14z"
				target="_blank"
			>
				{vehicle.position.lat}:{vehicle.position.lon}
			</a>
		</p>
	</div>

	<Battery value={vehicle.battery_status.percentage_level} />
</div>

<style>
	.vehicle-item {
		padding: 10px 15px;
		border: 1px solid #ccc;
		border-radius: 3px;
	}

	.vehicle-item__header {
		display: flex;
		margin: 0 0 10px;
	}

	.vehicle-item__title {
		margin: 0 5px 0 0;
	}

	.vehicle-item__group {
		margin: 0 15px 0 0;
		color: #878787;
	}

	.vehicle-item__location {
		margin: 0 0 0 auto;
	}

	.vehicle-item__location a {
		color: inherit;
		text-decoration: underline;
	}
</style>
