<script lang="ts">
    import { onMount } from "svelte";
    import vehicleService from "@Services/VehicleService";
    import type { Vehicle } from "@Types/vehicle.type";

    export let activeGroup: string = "";

    let groups: Set<string> = new Set();

    onMount(() => {
        vehicleService.subscribe((vehicles) => {
            vehicles.forEach((vehicle: Vehicle) => {
                groups.add(vehicle.group);
            });

            groups = groups;
        });
    });

    function toggleGroup(group: string): any {
        activeGroup = activeGroup === group ? null : group;
    }

    function showAllGroups(): void {
        activeGroup = null;
    }
</script>

<div class="filter-bar">
    <span
        on:click={showAllGroups}
        class:--selected={!activeGroup}
        class="filter-bar__btn"
    >
        all groups
    </span>

    {#each [...groups] as group}
        |
        <span
            on:click={toggleGroup(group)}
            class:--selected={group === activeGroup}
            class="filter-bar__btn"
        >
            {group}
        </span>
    {/each}
</div>

<style>
    .filter-bar {
        margin: 0 0 15px;
    }
    
    .filter-bar__btn {
        font-weight: bold;
        cursor: pointer;
        text-transform: uppercase;
    }

    .filter-bar__btn.--selected {
        color: #ff3e00;
    }
</style>
