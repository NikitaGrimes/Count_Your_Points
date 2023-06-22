import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlayerService } from './player.service';

export const gameGuard: CanActivateFn = (route, state) => {
  const playersId: number[] = route.params["players"];
  const gameType: number = route.params["game"];
  const ids = inject(PlayerService).getPlayers().map(player => player.id);
  if (playersId?.filter(id => ids.indexOf(id) !== -1).length >= 2 && gameType) return true;
  inject(Router).navigate(["players"]);
  return false;
};
