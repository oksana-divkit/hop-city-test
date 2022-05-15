<script lang="ts">
    // import './styles.css';

    export let value: Number;
</script>

<div class="battery">
    <div class="battery__icon">
        <div
            class="battery__level"
            class:--alert={value < 30}
            class:--warn={value < 50}
            style="height:{value > 100 ? 100 : value}%;"
        />
    </div>
    <b class="battery__value">{value}%</b>
</div>

<style>
    :root {
        --lightning-size: 9px;
    }

    .battery {

    }

    .battery__icon {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        width: 9px;
        height: 14px;
        padding: 2px;
        border: 3px solid #333;
        border-radius: 4px;
    }

    .battery__icon:before {
        content: "";
        display: block;
        position: absolute;
        top: -6px;
        height: 2px;
        width: 9px;
        background: #333;
        border-radius: 4px 4px 0 0;
    }

    .battery__icon:after {
        content: "";
        display: block;
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        border: 1px solid #fff;
        border-radius: 2px;
    }

    .battery__level {
        background: #30b455;
        position: absolute;
        bottom: 0px;
        left: 0;
        right: 0;
    }

    .battery__level.--warn {
        background-color: #efaf13;
    }

    .battery__level.--alert {
        background-color: #e81309;
    }

    .battery__level.--alert:before {
        content: '';
        position: absolute;
        bottom: 7px;
        height: var(--lightning-size);
        width: var(--lightning-size);
        margin: -14px 0 0 2px;
        background-image: url("../images/warn.svg");
        background-repeat: no-repeat;
        background-size: var(--lightning-size);
    }

    .battery__value {
    }
</style>
