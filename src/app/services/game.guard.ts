import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlayerService } from './player.service';

export const gameGuard: CanActivateFn = (route) => {
  const gameType: number = route.params["gameType"];
  if (gameType && inject(PlayerService).getSelectedPlayersCount() >= 2) return true;
  
  inject(Router).navigate(["players"]);
  return false;
};
