import { KkmTransport } from "../data/KkmTransport.js";
import { WithState } from "./ServerKkm.State.js";
import { WithConnection } from "./ServerKkm.Connection.js";
import { WithCheckInput } from "./ServerKkm.CheckInput.js";
import { WithInternals } from "./ServerKkm.Internals.js";
import { WithRequests } from "./ServerKkm.Requests.js";
import { WithApi } from "./ServerKkm.Api.js";

/**
 * Базовый класс — самый нижний уровень цепочки миксинов.
 * Хранит HTTP-транспорт и умеет освобождать соединение.
 */
class ServerKkmBase {
    http: KkmTransport = new KkmTransport();

    private disposed = false;

    /**
     * Освобождает HTTP-соединение с сервером ККМ. После этого экземпляр
     * использовать нельзя — создайте новый, если снова нужен доступ к кассе.
     */
    dispose(): void {
        if (this.disposed) return;
        this.disposed = true;
        this.http.dispose();
    }
}

/** Коннектор Сервера ККМ. Один экземпляр — одна сессия.*/
class WithStateApplied extends WithState(ServerKkmBase) {}
class WithConnectionApplied extends WithConnection(WithStateApplied) {}
class WithCheckInputApplied extends WithCheckInput(WithConnectionApplied) {}
class WithInternalsApplied extends WithInternals(WithCheckInputApplied) {}
class WithRequestsApplied extends WithRequests(WithInternalsApplied) {}

export class ServerKkm extends WithApi(WithRequestsApplied) {}