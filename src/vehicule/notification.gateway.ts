import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  emitUnavailable(vehicle: any) {
    this.server.emit('vehicleUnavailable', {
      message: `Le véhicule ${vehicle.brand} ${vehicle.model} est maintenant indisponible`,
      vehicle,
    });
  }
}