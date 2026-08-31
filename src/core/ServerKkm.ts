import { KkmTransport } from "../data/KkmTransport.js";
import { WithState } from "./ServerKkm.State.js";
import { WithConnection } from "./ServerKkm.Connection.js";
import { WithCheckInput } from "./ServerKkm.CheckInput.js";
import { WithInternals } from "./ServerKkm.Internals.js";
import { WithRequests } from "./ServerKkm.Requests.js";
import { WithApi } from "./ServerKkm.Api.js";

/** Хранит HTTP-транспорт и освобождет соединение.*/
class ServerKkmBase {
    http: KkmTransport = new KkmTransport();

    private disposed = false;

    /**
     * Отменяет текущий выполняющийся HTTP-запрос к серверу ККМ, если он есть.
     * Аналог ServerKkm.Cancel() в C#.
     */
    cancel(): void {
        this.http.cancelCurrent();
    }

    /**
     * Освобождает HTTP-соединение с сервером ККМ. После этого экземпляр
     * использовать нельзя — создайте новый, если снова нужен доступ к кассе.
     */
    dispose(): void {
        if (this.disposed) return;
        this.disposed = true;
        this.cancel();
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