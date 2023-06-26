import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlayerService } from './player.service';

export const gameGuard: CanActivateFn = (route) => {
  if (!route.paramMap.get("gameType")) return inject(Router).createUrlTree(["players"]);
  
  const gameType: number = +<string>route.paramMap.get("gameType");
  if (gameType && inject(PlayerService).getSelectedPlayersCount() >= 2) return true;
  
  return inject(Router).createUrlTree(["players"]);
};
