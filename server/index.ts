import alt from 'alt-server';
import { useRebar } from '@Server/index.js';

const Rebar = useRebar();

// Show up the speedometer when the player enters the vehicle.
alt.on('playerEnteredVehicle', (player: alt.Player, vehicle: alt.Vehicle, seat: number) => {
    if (seat === 1) { // Check if the player is the driver
        Rebar.player.useWebview(player).show('Speedometer', 'page');
        Rebar.player.useWebview(player).emit('updateSpeed');
        Rebar.player.useWebview(player).unfocus();
    }
});

// Hide the speedometer when the player leaves the vehicle.
alt.on('playerLeftVehicle', (player: alt.Player, vehicle: alt.Vehicle, seat: number) => {
    if (seat === 1) { // Check if the player was the driver
        Rebar.player.useWebview(player).hide('Speedometer');
    }
});