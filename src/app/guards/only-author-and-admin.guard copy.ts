import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export class OnlyAuthorAndAdminGuard implements CanActivate{
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        const role = sessionStorage.getItem('role');
        if(role === 'AUTHOR' || role === 'EDITOR'){
            return true;
        }
        return false;

    }

}