import {JwtService} from "@nestjs/jwt";
import {ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly jwtService: JwtService) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const accessToken = request.cookies['Authentication'];

        if (!accessToken) {
            throw new UnauthorizedException();
        }

        try {
            const decoded = this.jwtService.verify(accessToken);
            request.user = decoded;
            return true;
        } catch (err) {
            throw new UnauthorizedException();
        }
    }
}
