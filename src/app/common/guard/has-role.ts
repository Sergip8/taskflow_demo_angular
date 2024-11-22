
import { inject } from "@angular/core";

import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../components/public/auth/auth.service";
import { Role } from "../../app.routes";




export const hasRoleGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const user = inject(AuthService)
    const userRole = user.getRole()
    const expectedRoles: Role[] = route.data['roles'];
    console.log(userRole)
    console.log(expectedRoles)
    const hasRole: boolean = expectedRoles.some((role) => userRole.includes(role));
  
    return hasRole || router.navigate(['signin']);
  };