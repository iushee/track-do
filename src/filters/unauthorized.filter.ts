import { Catch, ExceptionFilter, ArgumentsHost, UnauthorizedException} from "@nestjs/common";
import { Response } from 'express';

@Catch(UnauthorizedException, Error)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  public catch(exception: UnauthorizedException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(401).json({ message: { statusCode: 401, error: 'Unauthorized', message: exception.message } });
  }
}
