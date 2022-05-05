<script lang="ts">
    import { onMount } from "svelte";

    import onlineService from "@Services/OnlineService";
    import vehicleService from "@Services/VehicleService";

    import type { WebSocketStatus } from "@Types/webSocketStatus.type";
    import { WebSocketStatus as WebSocketStatusEnum } from "@Types/webSocketStatus.type";

    onMount(() => {
        onlineService.subscribe((data) => {
            isOnline = data;
        });

        vehicleService.statusSubscribe((data) => {
            connectionStatus = data;
        });
    });

    let isOnline: boolean;
    let connectionStatus: WebSocketStatus;

    let isConnecting: boolean;
    $: isConnecting = connectionStatus === WebSocketStatusEnum.CONNECTING;

    let isSuccess: boolean;
    $: isSuccess = connectionStatus === WebSocketStatusEnum.OPEN && isOnline;
</script>

<div
    class="connect-status"
    class:--error={!isOnline || (!isConnecting && !isSuccess)}
    class:--success={isSuccess}
>
    <p class="connect-status__msg">
        {#if !isOnline}
            No internet connection. Please connect to the internet and refresh
            the page.
        {:else if isConnecting}
            Connecting to HopCity
        {:else if isSuccess}
            Connected to HopCity
        {:else}
            Lost connection to HopCity
        {/if}
    </p>
</div>

<style>
    .connect-status {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 20px;
        top: 20px;
        height: 40px;
        min-width: 36px;
        padding: 0 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: clip;
        transition: width 0.25s ease-in, background 0.25s ease-out;
        border-radius: 22px;
        background: #525252;
        color: #fff;
    }

    .connect-status::before {
        content: "";
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 14px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 0 5px #fff;
    }

    .connect-status.--error {
        background: #86434a;
        color: #fff;
    }

    .connect-status.--error:before {
        background: #fa4359;
        box-shadow: 0 0 5px #fa4359;
    }

    .connect-status.--success {
        background: #277e77;
        color: #fff;
    }

    .connect-status.--success:before {
        background: #37c3be;
        box-shadow: 0 0 5px #37c3be;
    }

    .connect-status__msg {
        -webkit-user-select: none;
        user-select: none;
        cursor: default;
        margin: 0 16px 0 5px;
    }
</style>
