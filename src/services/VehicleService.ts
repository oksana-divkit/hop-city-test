import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import { ProxyWebSocket } from "@Utils/ProxyWebSocket";
import { WebSocketStatus as WebSocketStatusEnum } from '@Types/webSocketStatus.type';

import type { WebSocketStatus } from '@Types/webSocketStatus.type';
import type { ConnectionInitMsg } from '@Types/connectionInitMsg.type';
import type { Vehicle } from "@Types/vehicle.type";

const CONNECTION_URL: string = process.env.CONNECTION_URL;

const INIT_MSG: ConnectionInitMsg = {
    name: process.env.INIT_MSG_NAME
};

let websocket: ProxyWebSocket;

const vehicles: Map<string, Vehicle> = new Map();
const vehiclesStore: Writable<Map<string, Vehicle>> = writable(vehicles);

const offHoursStore: Writable<boolean> = writable(false);
const statusStore: Writable<WebSocketStatus> = writable(WebSocketStatusEnum.CLOSED);

const connectWebSocket = (): void => {
    websocket = new ProxyWebSocket(CONNECTION_URL);

    websocket.state.subscribe(data => {
        statusStore.set(data);
    });

    websocket.onopen = function () {
        websocket.send(JSON.stringify(INIT_MSG));
    };

    websocket.onmessage = function ({ data }) {
        if (data === "off hours") {
            offHoursStore.set(true);
            return;
        }

        const { no, data: vehiclesData, error } = JSON.parse(data);

        if (error) {
            console.error(error);
            throw new Error(error);
        }

        vehiclesData?.forEach((vehicle: Vehicle) => {
            if (vehicle._change === "remove") {
                vehicles.delete(vehicle.id);
            } else {
                vehicles.set(vehicle.id, vehicle);
            }
        });

        vehiclesStore.set(vehicles);
    };

    websocket.onclose = function (e: any) {
        console.log(
            "Socket is closed. Reconnect will be attempted in 1 second.",
            e.reason
        );

        setTimeout(function () {
            connectWebSocket();
        }, 1000);
    };

    websocket.onerror = function (err: any) {
        console.error(
            "Socket encountered error: ",
            err.message,
            "Closing socket"
        );
        closeWebSocket();
    };

}

const closeWebSocket = (): void => {
    websocket.close();
}

const reconnect = (): void => {
    closeWebSocket();
    connectWebSocket();
}

export default {
    subscribe: vehiclesStore.subscribe,
    statusSubscribe: statusStore.subscribe,
    offHoursSubscribe: offHoursStore.subscribe,
    connectWebSocket,
    closeWebSocket,
    reconnect,
}
